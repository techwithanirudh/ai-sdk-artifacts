import { getChatById, getMessagesByChatId } from '@/server/db/queries';
import { convertToUIMessages } from '@/utils/ai';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Chat from '../../../components/chat';
import { ChatSkeleton } from '../../../components/chat-skeleton';
import { redirect } from 'next/navigation';
import { getSession } from '@/server/auth';

export default async function ChatPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const { id: chatId } = params;
	const chat = await getChatById({ id: chatId });

	if (!chat) {
		notFound();
	}

	const session = await getSession()
	const user = session?.user

	if (!user) {
		return redirect('/auth/sign-in?redirectTo=/')
	}

	if (user.id !== chat.userId) {
		notFound();
	}

	const messagesFromDb = await getMessagesByChatId({
		id: chatId,
	});

	const uiMessages = convertToUIMessages(messagesFromDb);

	const cookieStore = await cookies();
	const chatModelFromCookie = cookieStore.get('chat-model');

	if (!chatModelFromCookie) {
		return (
			<Suspense fallback={<ChatSkeleton />}>
				<Chat
					id={chatId}
					initialChatModel={DEFAULT_CHAT_MODEL}
					initialMessages={uiMessages}
				/>
			</Suspense>
		);
	}

	return (
		<Suspense fallback={<ChatSkeleton />}>
			<Chat
				id={chatId}
				initialChatModel={chatModelFromCookie.value}
				initialMessages={uiMessages}
			/>
		</Suspense>
	);
}
