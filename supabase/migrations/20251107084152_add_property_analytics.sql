-- Create property_views table to track views
CREATE TABLE IF NOT EXISTS property_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT,
  ip_address INET,
  user_agent TEXT
);

-- Create property_interest table to track interest expressions
CREATE TABLE IF NOT EXISTS property_interest (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  interested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contact_method TEXT CHECK (contact_method IN ('whatsapp', 'call', 'email')),
  notes TEXT,
  UNIQUE(property_id, user_id) -- Prevent duplicate interest expressions
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_views_property_id ON property_views(property_id);
CREATE INDEX IF NOT EXISTS idx_property_views_user_id ON property_views(user_id);
CREATE INDEX IF NOT EXISTS idx_property_views_viewed_at ON property_views(viewed_at);

CREATE INDEX IF NOT EXISTS idx_property_interest_property_id ON property_interest(property_id);
CREATE INDEX IF NOT EXISTS idx_property_interest_user_id ON property_interest(user_id);
CREATE INDEX IF NOT EXISTS idx_property_interest_interested_at ON property_interest(interested_at);

-- Enable Row Level Security
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_interest ENABLE ROW LEVEL SECURITY;

-- RLS Policies for property_views
-- Allow anyone to insert views (for tracking)
CREATE POLICY "Anyone can insert property views" ON property_views
  FOR INSERT WITH CHECK (true);

-- Allow landlords to view views of their own properties
CREATE POLICY "Landlords can view their property views" ON property_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_views.property_id
      AND properties.landlord_id = auth.uid()
    )
  );

-- RLS Policies for property_interest
-- Allow authenticated users to express interest
CREATE POLICY "Authenticated users can express interest" ON property_interest
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow landlords to view interest in their own properties
CREATE POLICY "Landlords can view interest in their properties" ON property_interest
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_interest.property_id
      AND properties.landlord_id = auth.uid()
    )
  );

-- Allow users to view their own interest expressions
CREATE POLICY "Users can view their own interest" ON property_interest
  FOR SELECT USING (auth.uid() = user_id);