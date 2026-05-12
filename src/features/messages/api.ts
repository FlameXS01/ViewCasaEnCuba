import { api } from "@/lib/api";
import type { MessageDTO, SendMessageRequest } from "@/types/api";

export const messagesApi = {
  async getConversations(): Promise<MessageDTO[]> {
    const { data } = await api.get<MessageDTO[]>("/messages/conversations");
    return data;
  },

  async getConversation(userId: string): Promise<MessageDTO[]> {
    const { data } = await api.get<MessageDTO[]>(`/messages/conversations/${userId}`);
    return data;
  },

  async send(payload: SendMessageRequest): Promise<MessageDTO> {
    const { data } = await api.post<MessageDTO>("/messages", payload);
    return data;
  },

  async markAsRead(messageId: string): Promise<MessageDTO> {
    const { data } = await api.patch<MessageDTO>(`/messages/${messageId}/read`);
    return data;
  },
};