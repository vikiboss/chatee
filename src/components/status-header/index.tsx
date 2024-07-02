import { Box, Text, Spacer } from "ink";
import { useAppConfig } from "../../hooks/use-app-config";
import { useIsOnline } from "../../hooks/use-is-online";
import { store } from "../../store";

export function StatusHeader() {
	const isOnline = useIsOnline();
	const [config] = useAppConfig();
	const active = store.useSnapshot((s) => s.active);

	return (
		<Box width="100%">
			<Text dimColor color="cyan">
				UID: {config.account ?? "No Account"}
			</Text>
			<Spacer />
			{active.id && (
				<Text dimColor color="cyan">
					{active.name} ({active.id} - {active.type})
				</Text>
			)}
			<Spacer />
			<Text dimColor color={isOnline ? "green" : "red"}>
				{isOnline ? "Online" : "Offline"}
			</Text>
		</Box>
	);
}
