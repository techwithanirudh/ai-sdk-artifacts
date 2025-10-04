import type { UIMessage, UIMessagePart } from 'ai';
import { z } from 'zod';
import type { UITools } from './ai/tool-types';
import { AppUsage } from './ai/usage';
import type { Geo } from '@vercel/functions/headers';

export type DataPart = { type: 'append-message'; message: string };

export const messageMetadataSchema = z.object({
	toolCall: z.object({
		toolName: z.string(),
		toolParameters: z.record(z.string(), z.any()),
	}),
	createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type CustomUIDataTypes = {
  appendMessage: string;
  usage: AppUsage;
};

export type ChatMessage = UIMessage<MessageMetadata, CustomUIDataTypes, UITools>;
export type ChatMessagePart = UIMessagePart<CustomUIDataTypes, UITools>;

export interface Attachment {
	name: string;
	url: string;
	contentType: string;
}

export type RequestHints = {
  latitude: Geo["latitude"];
  longitude: Geo["longitude"];
  city: Geo["city"];
  country: Geo["country"];
  timestamp: string;
};