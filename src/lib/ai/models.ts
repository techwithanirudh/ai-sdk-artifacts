export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "GPT-5 Nano",
    description: "Advanced multimodal model with text capabilities",
  },
  {
    id: "chat-model-reasoning",
    name: "GPT-5 Mini",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
];