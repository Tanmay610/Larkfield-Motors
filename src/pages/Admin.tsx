import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  /* ── Auth guard ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/auth");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  /* ── Fetch messages ── */
  useEffect(() => {
    if (!user) return;

    async function fetchMessages() {
      setMessagesLoading(true);
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id, name, email, phone, message, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMessages(data);
      }
      setMessagesLoading(false);
    }

    fetchMessages();
  }, [user]);

  /* ── Sign out ── */
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-h4">Admin Inbox</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="rounded-md border border-border px-4 py-1.5 text-sm transition-colors hover:bg-secondary"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="mx-auto max-w-page px-6 py-8">
        {messagesLoading ? (
          <p className="text-muted-foreground">Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="text-muted-foreground">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-lg border border-border bg-card p-5 space-y-2"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-heading text-foreground">{msg.name}</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {msg.email}
                  </a>
                  {msg.phone && (
                    <a
                      href={`tel:${msg.phone}`}
                      className="text-sm text-muted-foreground"
                    >
                      {msg.phone}
                    </a>
                  )}
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                  {msg.message}
                </p>
                <time className="block text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleString()}
                </time>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
