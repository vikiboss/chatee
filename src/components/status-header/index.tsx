import { Box, Text, Spacer } from "ink";
import { useAppConfig } from "../../hooks/use-app-config";
import { useNow } from "@shined/react-use";

export function StatusHeader() {
	const [config] = useAppConfig();
	const now = useNow({ interval: 300 });

	return (
		<Box width="100%">
			<Text dimColor color="cyan">
				UID: {config.account ?? "Not Login"}
			</Text>
			<Spacer />
			<Text dimColor color="yellow">
				{now.toLocaleString()}
			</Text>
		</Box>
	);
}
