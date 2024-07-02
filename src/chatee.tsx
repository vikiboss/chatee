import { Box } from "ink";
import { usePage } from "./hooks/use-page.js";
import { useShortcuts } from "./hooks/use-shortcuts.js";
import { useLifecycle } from "./hooks/use-lifecycle.js";
import { StatusHeader } from "./components/status-header/index.js";

interface ChateeProps {
	reset?: boolean;
}

export function Chatee(props: ChateeProps) {
	const [page] = usePage();

	useLifecycle(props.reset);
	useShortcuts();

	return (
		<Box height="100%" width="100%" display="flex" flexDirection="column">
			<StatusHeader />
			<Box width="100%" height="100%" minHeight={8}>
				{page}
			</Box>
		</Box>
	);
}
