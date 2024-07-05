import { Box } from "ink";
import { StatusHeader } from "./components/status-header/index.js";
import { useLifecycle } from "./hooks/use-lifecycle.js";
import { usePage } from "./hooks/use-page.js";
import { useShortcuts } from "./hooks/use-shortcuts.js";

export function Chatee() {
	useLifecycle();
	useShortcuts();

	const [page] = usePage();

	return (
		<Box height="100%" width="100%" display="flex" flexDirection="column">
			<StatusHeader />
			<Box flexGrow={1} minHeight={6}>
				{page}
			</Box>
		</Box>
	);
}
