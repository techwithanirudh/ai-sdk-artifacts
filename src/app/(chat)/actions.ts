'use server';

import 'server-only';

import {
	deleteMessagesByChatIdAfterTimestamp,
	getMessageById,
} from '@/server/db/queries';
import { cookies } from 'next/headers';

export async function saveChatModelAsCookie(model: string) {
	const cookieStore = await cookies();
	cookieStore.set('chat-model', model);
}

export async function deleteTrailingMessages({ id }: { id: string }) {
	const [message] = await getMessageById({ id });
	
	if (!message) return;

	await deleteMessagesByChatIdAfterTimestamp({
		chatId: message.chatId,
		timestamp: message.createdAt,
	});
}
