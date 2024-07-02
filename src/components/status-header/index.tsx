import { Box, Text, Spacer } from "ink";
import { useAppConfig } from "../../hooks/use-app-config";
import { useNow } from "@shined/react-use";
import { useIsOnline } from "../../hooks/use-is-online";

export function StatusHeader() {
	const isOnline = useIsOnline();
	const [config] = useAppConfig();
	const now = useNow({ interval: 300 });

	return (
		<Box width="100%">
			<Text dimColor color="cyan">
				UID: {config.account ?? "No Account"}
			</Text>
			<Spacer />
			<Text dimColor color={isOnline ? "green" : "red"}>
				{isOnline ? "online" : "offline"}
			</Text>
			<Spacer />
			<Text dimColor color="yellow">
				{now.toLocaleString()}
			</Text>
		</Box>
	);
}
