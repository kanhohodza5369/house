import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  read: boolean;
}

interface Conversation {
  id: string;
  property_id: string;
  tenant_id: string;
  landlord_id: string;
  property?: any;
  tenant?: any;
  landlord?: any;
}

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    if (conversationId) {
      fetchConversation();
      fetchMessages();
    }
  }, [conversationId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchConversation = async () => {
    if (!conversationId) return;

    try {
      const { data: convData, error: convError } = await (supabase as any)
        .from("conversations")
        .select("*")
        .eq("id", conversationId)
        .single();

      if (convError) throw convError;

      // Fetch property details
      const { data: propertyData } = await (supabase as any)
        .from("properties")
        .select("*")
        .eq("id", convData.property_id)
        .single();

      // Fetch tenant and landlord profiles
      const { data: tenantData } = await (supabase as any)
        .from("profiles")
        .select("*")
        .eq("id", convData.tenant_id)
        .single();

      const { data: landlordData } = await (supabase as any)
        .from("profiles")
        .select("*")
        .eq("id", convData.landlord_id)
        .single();

      setConversation({
        ...convData,
        property: propertyData,
        tenant: tenantData,
        landlord: landlordData,
      });
    } catch (error: any) {
      toast({
        title: "Error loading conversation",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const { data: messagesData, error } = await (supabase as any)
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(messagesData || []);
    } catch (error: any) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId || !user) return;

    try {
      const { error } = await (supabase as any)
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: newMessage.trim(),
        });

      if (error) throw error;

      setNewMessage("");
      fetchMessages(); // Refresh messages
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">Conversation not found</p>
        </div>
      </div>
    );
  }

  const otherUser = user?.id === conversation.tenant_id ? conversation.landlord : conversation.tenant;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={() => navigate("/properties")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {otherUser?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg">{otherUser?.full_name || "User"}</p>
                <p className="text-sm text-muted-foreground">
                  {conversation.property?.title}
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="space-y-4 max-h-96 overflow-y-auto p-4 border rounded-lg">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
