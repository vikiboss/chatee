import { Box, Text, useApp } from "ink";
import SelectInput from "ink-select-input";
import { usePage } from "../hooks/use-page";

import type { App } from "../store";

type SelectValue = App.Page | "exit" | "login" | "list";

export function Home() {
	const app = useApp();
	const [_, setPage] = usePage();

	const handleSelect = (item: { value: SelectValue }) => {
		if (item.value === "exit") {
			app.exit();
		} else if (item.value === "login") {
			// login oicq
		} else {
			setPage(item.value);
		}
	};

	const pages = ["list", "login", "settings", "exit"].map((e) => ({
		label: e,
		value: e,
	})) as { label: SelectValue; value: SelectValue }[];

	return (
		<Box>
			<Text>Chatee! </Text>
			<SelectInput items={pages} onSelect={handleSelect} />
		</Box>
	);
}
