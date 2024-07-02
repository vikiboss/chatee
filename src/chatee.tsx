import { Box, Newline, Text } from "ink";
import { usePage } from "./hooks/use-page.js";
import { useShortcuts } from "./hooks/use-shortcuts.js";
import { useLifecycle } from "./hooks/use-lifecycle.js";

interface ChateeProps {
	reset?: boolean;
}

export function Chatee(props: ChateeProps) {
	const [page] = usePage();

	useLifecycle(props.reset);
	useShortcuts();

	return (
		<Box
			width="full"
			borderStyle={{
				topLeft: "↘",
				top: "↓",
				topRight: "↙",
				left: "→",
				bottomLeft: "↗",
				bottom: "↑",
				bottomRight: "↖",
				right: "←",
			}}
			borderColor="greenBright"
		>
			<Text>
				<Newline />
				{page}
			</Text>
		</Box>
	);
}
