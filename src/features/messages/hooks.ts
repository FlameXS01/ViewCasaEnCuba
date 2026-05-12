import { useState, useCallback } from "react";
import { messagesApi } from "./api";
import type { MessageDTO, SendMessageRequest } from "@/types/api";

export function useMessages() {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [conversations, setConversations] = useState<MessageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await messagesApi.getConversations();
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar conversaciones");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchConversation = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await messagesApi.getConversation(userId);
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar mensajes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (payload: SendMessageRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const message = await messagesApi.send(payload);
      setMessages((prev) => [...prev, message]);
      return message;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar mensaje");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (messageId: string) => {
    try {
      const message = await messagesApi.markAsRead(messageId);
      setMessages((prev) => prev.map((m) => (m.id === messageId ? message : m)));
      setConversations((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, is_read: true } : m))
      );
    } catch (err) {
      console.error("Error al marcar como leído:", err);
    }
  }, []);

  return {
    messages,
    conversations,
    isLoading,
    error,
    fetchConversations,
    fetchConversation,
    sendMessage,
    markAsRead,
  };
}