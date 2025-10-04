import { directivesPrompt } from './directives';
import { personaPrompt } from './persona';

export const corePrompt = () =>
	[personaPrompt(), directivesPrompt()]
		.filter(Boolean)
		.join('\n\n')
		.trim();