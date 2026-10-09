import apiClient from "@/lib/apiClient";

export interface AiPromptData {
  id?: number;
  key: string;
  title: string;
  systemPrompt: string;
  tone?: string;
  maxDays?: string;
  apiKey?: string;
}

export async function getAiPrompts(): Promise<Record<string, AiPromptData>> {
  const res = await apiClient.get("/ai-prompts");
  return res.data?.data || {};
}

export async function getAiPromptByKey(key: string): Promise<AiPromptData | null> {
  const res = await apiClient.get(`/ai-prompts/${key}`);
  return res.data?.data || null;
}

export async function updateAiPrompt(key: string, payload: Partial<AiPromptData>): Promise<AiPromptData> {
  const res = await apiClient.put(`/ai-prompts/${key}`, payload);
  return res.data?.data;
}

export async function resetAiPrompt(key: string): Promise<AiPromptData> {
  const res = await apiClient.post(`/ai-prompts/reset/${key}`);
  return res.data?.data;
}
