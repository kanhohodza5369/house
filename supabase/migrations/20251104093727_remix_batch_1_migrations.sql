
-- Migration: 20251104091044

-- Migration: 20251104085246

-- Migration: 20251104083803

-- Migration: 20251104081331

-- Migration: 20251104075139
-- Create profiles table for user information
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  avatar_url text,
  user_type text check (user_type in ('landlord', 'tenant')) not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create properties table
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  property_type text check (property_type in ('apartment', 'house', 'room', 'shared')) not null,
  price numeric not null,
  bedrooms integer,
  bathrooms integer,
  square_feet integer,
  address text not null,
  city text not null,
  state text,
  zip_code text,
  images text[] default array[]::text[],
  amenities text[] default array[]::text[],
  available boolean default true,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.properties enable row level security;

create policy "Anyone can view available properties"
  on public.properties for select
  using (true);

create policy "Landlords can create properties"
  on public.properties for insert
  with check (
    auth.uid() = landlord_id and
    exists (select 1 from public.profiles where id = auth.uid() and user_type = 'landlord')
  );

create policy "Landlords can update own properties"
  on public.properties for update
  using (auth.uid() = landlord_id);

create policy "Landlords can delete own properties"
  on public.properties for delete
  using (auth.uid() = landlord_id);

-- Create conversations table
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete cascade not null,
  landlord_id uuid references public.profiles(id) on delete cascade not null,
  tenant_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  unique (property_id, landlord_id, tenant_id)
);

alter table public.conversations enable row level security;

create policy "Users can view own conversations"
  on public.conversations for select
  using (auth.uid() = landlord_id or auth.uid() = tenant_id);

create policy "Tenants can create conversations"
  on public.conversations for insert
  with check (auth.uid() = tenant_id);

-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default now() not null
);

alter table public.messages enable row level security;

create policy "Users can view messages in own conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations 
      where id = conversation_id 
      and (landlord_id = auth.uid() or tenant_id = auth.uid())
    )
  );

create policy "Users can send messages in own conversations"
  on public.messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.conversations 
      where id = conversation_id 
      and (landlord_id = auth.uid() or tenant_id = auth.uid())
    )
  );

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create triggers for updated_at
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.handle_updated_at();

create trigger conversations_updated_at
  before update on public.conversations
  for each row execute function public.handle_updated_at();

-- Enable realtime for messages
alter publication supabase_realtime add table public.messages;
alter table public.messages replica identity full;




-- Migration: 20251104090036
-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, user_type)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'user_type', 'tenant')
  );
  RETURN new;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

