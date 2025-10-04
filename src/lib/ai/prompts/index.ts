import { corePrompt } from './core';
import { artifactsPrompt } from './artifacts';
import { RequestHints } from '../../types';

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
<context>
	About the origin of the request:

	<latitude>${requestHints.latitude}</latitude>
	<longitude>${requestHints.longitude}</longitude>
	<city>${requestHints.city}</city>
	<country>${requestHints.country}</country>
    <timestamp>${requestHints.timestamp} (UTC)</timestamp>
</context>`;

export const systemPrompt = ({
	selectedChatModel,
	requestHints,
}: {
	selectedChatModel: string;
	requestHints: RequestHints;
}) => {
	const requestPrompt = getRequestPromptFromHints(requestHints);

	if (
		selectedChatModel === 'chat-model'
	) {
		return [
			corePrompt(),
			requestPrompt,
			'You follow all the user instructions and provide a detailed response.',
		]
			.filter(Boolean)
			.join('\n')
			.trim();
	}

	if (selectedChatModel === 'artifact-model') {
		return [
			corePrompt(),
			artifactsPrompt,
			requestPrompt,
		]
			.filter(Boolean)
			.join('\n\n')
			.trim();
	}
};