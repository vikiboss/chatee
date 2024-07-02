import { Box, Text, useApp } from "ink";
import SelectInput from "ink-select-input";
import { usePage } from "../hooks/use-page";
import { client, login } from "../client";

import type { App } from "../store";
import { useIsOnline } from "../hooks/use-is-online";

type SelectValue = App.Page | "exit" | "login" | "list";

export function Home() {
	const app = useApp();
	const isOnline = useIsOnline();
	const [_, setPage] = usePage();

	const handleSelect = (item: { value: SelectValue }) => {
		if (item.value === "exit") {
			app.exit();
		} else if (item.value === "login") {
			login();
		} else {
			setPage(item.value);
		}
	};

	const pages = (
		isOnline ? ["chat", "list", "exit"] : ["login", "settings", "exit"]
	).map((e) => ({
		label: e,
		value: e,
	})) as { label: SelectValue; value: SelectValue }[];

	return (
		<Box flexGrow={1} display="flex" flexDirection="column">
			<Text color="cyan">Chatee! </Text>
			{isOnline && (
				<Box>
					<Text color="green">Welcome, {client?.nickname ?? "unknown"}!</Text>
				</Box>
			)}
			<SelectInput items={pages} onSelect={handleSelect} />
		</Box>
	);
}
