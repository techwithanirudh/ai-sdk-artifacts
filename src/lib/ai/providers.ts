import { createOpenAI } from '@ai-sdk/openai';
import { customProvider } from 'ai';

const openai = createOpenAI({
	apiKey: process.env.AI_API_KEY as string,
});

export const provider = customProvider({
	languageModels: {
		'chat-model': openai.responses('gpt-5-nano'),
		'chat-model-reasoning': openai.responses('gpt-5-mini'),
		'title-model': openai.responses('gpt-4o-mini'),
		'artifact-model': openai.responses('gpt-5-nano'),
	},
	imageModels: {
		// 'small-model': openai.imageModel('dall-e-2'),
	},
});