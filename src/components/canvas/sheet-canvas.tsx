'use client';

import { useArtifact } from '@ai-sdk-tools/artifacts/client';
import { sheetArtifact } from '@/lib/ai/artifacts';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { unparse } from 'papaparse';
import { SpreadsheetEditor } from '@/components/sheet-editor';
import {
	BaseCanvas,
	CanvasHeader,
} from './base';
import { CanvasContent } from './base/canvas-content';

export function DataAnalysisCanvas(_props: { websiteId: string }) {
	// Pulls the latest artifact snapshot for this tool
	const { data, status } = useArtifact(sheetArtifact);

	const isLoading = status === 'loading';

	// Derive rows from artifact payload (supporting multiple shapes)
	const rawRows = (data as any)?.data ?? (data as any)?.tablePreview ?? [];

	// Build CSV content from rows
	const derivedCsv = useMemo(() => {
		if (!rawRows || rawRows.length === 0) return '';
		const first = rawRows[0];
		if (Array.isArray(first)) {
			return unparse(rawRows);
		}
		if (first && typeof first === 'object') {
			const fields: string[] = Array.from(
				new Set<string>(
					rawRows.flatMap((r: Record<string, unknown>) => Object.keys(r))
				)
			);
			return unparse({ fields, data: rawRows });
		}
		return '';
	}, [rawRows]);

	// Keep editable CSV state local to the canvas for now
	const [csvContent, setCsvContent] = useState<string>(derivedCsv);

	useEffect(() => {
		setCsvContent(derivedCsv);
	}, [derivedCsv]);

	const handleCopyCsv = async () => {
		try {
			await navigator.clipboard.writeText(csvContent || '');
			toast.success('Copied csv to clipboard!');
		} catch (_err) {
			toast.error('Failed to copy csv');
		}
	};

	return (
		<BaseCanvas>
			<CanvasHeader
				isLoading={isLoading}
				title="Sheet"
				actions={
					<button
						type="button"
						className="rounded border border-border px-3 py-2 text-sm"
						onClick={handleCopyCsv}
					>
						Copy CSV
					</button>
				}
			/>

			<CanvasContent>
				<div className="h-[calc(100vh-14rem)] min-h-[400px]">
					<SpreadsheetEditor
						content={csvContent}
						currentVersionIndex={0}
						isCurrentVersion
						saveContent={(content: string) => {
							setCsvContent(content);
						}}
						status={status}
					/>
				</div>
			</CanvasContent>
		</BaseCanvas>
	);
}
