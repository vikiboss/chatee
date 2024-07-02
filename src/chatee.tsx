import { Newline, Text } from "ink";
import { useMount } from "@shined/react-use";

import "./app-config.js";

import { useShortcuts } from "./hooks/use-shortcuts.js";
import { useAppConfig } from "./hooks/use-app-config.js";

import { usePage } from "./hooks/use-page.js";

interface ChateeProps {
	reset?: boolean;
}

export function Chatee(props: ChateeProps) {
	const { reset } = props;
	const [_, mutate] = useAppConfig();
	const page = usePage();

	useMount(() => {
		if (reset) mutate.config = {};
	});

	useShortcuts();

	return (
		<Text>
			Hello, <Text color="green">{new Date().toLocaleString()}</Text>
			<Newline />
			{page}
		</Text>
	);
}
