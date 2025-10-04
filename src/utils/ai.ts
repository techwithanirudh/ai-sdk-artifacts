import type { DBMessage } from '@/server/db/schema';
import { formatISO } from 'date-fns';
import type { ChatMessage, ChatMessagePart } from '@/lib/types';

export function generateUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function convertToUIMessages(messages: DBMessage[]): ChatMessage[] {
	return messages.map((message) => ({
		id: message.id,
		role: message.role as 'user' | 'assistant' | 'system',
		parts: message.parts as ChatMessagePart[],
		metadata: {
			toolCall: {
				toolName: (message.parts as ChatMessagePart[])[0].toolName,
				toolParameters: (message.parts as ChatMessagePart[])[0].toolParameters,
			},
			createdAt: formatISO(message.createdAt),
		},
	}));
}

export function getTextFromMessage(message: ChatMessage): string {
	return message.parts
		.filter((part) => part.type === 'text')
		.map((part) => part.text)
		.join('');
}
