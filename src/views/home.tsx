import { Box, useApp } from "ink";
import SelectInput from "ink-select-input";
import { login } from "../client";
import { usePage } from "../hooks/use-page";
import { useIsOnline } from "../hooks/use-is-online";
import { store } from "../store";

import type { App } from "../store";

type SelectValue = App.Page | "exit" | "login" | "logging";

export function Home() {
	const app = useApp();
	const isOnline = useIsOnline();
	const [_, setPage] = usePage();
	const isLoggingIn = store.useSnapshot((s) => s.isLoggingIn);

	const handleSelect = (item: { value: SelectValue }) => {
		if (item.value === "logging") return;
		if (item.value === "exit") return app.exit();
		if (item.value === "login") return login();

		setPage(item.value);
	};

	const pages = (
		isLoggingIn
			? [{ label: "Login...", value: "logging" }]
			: [
					...(isOnline
						? [
								{ label: "Recent Sessions", value: "recent" },
								{ label: "Start Chat", value: "chat" },
								{ label: "Friends and Groups", value: "list" },
								{ label: "Settings", value: "settings" },
							]
						: [
								{ label: "Login", value: "login" },
								{ label: "Settings", value: "settings" },
								{ label: "Exit Chatee", value: "exit" },
							]),
				]
	) as { label: string; value: SelectValue }[];

	return (
		<Box flexGrow={1} display="flex" flexDirection="column">
			<SelectInput<SelectValue> items={pages} onSelect={handleSelect} />
		</Box>
	);
}
