import { useArtifacts } from '@ai-sdk-tools/artifacts/client';
import { SheetCanvas } from './sheet-canvas';

export function Canvas() {
	const { current } = useArtifacts();

	switch (current?.type) {
		case 'sheet':
			return <SheetCanvas />;
		default:
			return null;
	}
}
