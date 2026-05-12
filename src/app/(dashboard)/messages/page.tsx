"use client";

import { useEffect, useState } from "react";
import { useMessages } from "@/features/messages/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store";
import { formatDateTime } from "@/lib/utils";
import { Send } from "lucide-react";

export default function MessagesPage() {
  const { user } = useAuthStore();
  const {
    messages,
    conversations,
    isLoading,
    error,
    fetchConversations,
    fetchConversation,
    sendMessage,
  } = useMessages();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleSelectConversation = (userId: string) => {
    setSelectedUser(userId);
    fetchConversation(userId);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await sendMessage({
        receiver_id: selectedUser,
        content: newMessage,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Mensajes</h1>
        <p className="text-muted-foreground mt-2">
          Comunícate con otros usuarios
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Conversaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Cargando...
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No hay conversaciones
                </div>
              ) : (
                <div className="divide-y">
                  {conversations.map((msg) => (
                    <button
                      key={msg.id}
                      className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                        selectedUser === msg.sender_id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleSelectConversation(msg.sender_id)}
                    >
                      <div className="font-medium">
                        {msg.sender_id === user?.id ? "Tú" : "Usuario"}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {msg.content}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle>Mensajes</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {!selectedUser ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Selecciona una conversación
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No hay mensajes
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.sender_id === user?.id
                        ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                        : "bg-muted max-w-[80%]"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender_id === user?.id
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}>
                      {formatDateTime(msg.created_at)}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
            {selectedUser && (
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}