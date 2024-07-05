import { Box, Text } from "ink";
import { client } from "../../client";
import { useIsOnline } from "../../hooks/use-is-online";
import { store } from "../../store";
import { useCircularList, useIntervalFn } from "@shined/react-use";

export function StatusHeader() {
	const isOnline = useIsOnline();
	const active = store.useSnapshot((s) => s.active);

	const [msg, actions] = useCircularList([
		"`Tab` to go home",
		"`Tab` to go home",
		"`Tab` to go home",
		"`Tab` to go home",
		"`Ctrl C` to exit",
	]);

	useIntervalFn(actions.next, 3000);

	const isGroup = active.type === "group";

	return (
		<Box width="100%" gap={1}>
			<Box gap={1}>
				{client.nickname ? (
					<Text dimColor color="cyan">
						{`${client.nickname} (${client.uin})`}
					</Text>
				) : (
					<Text dimColor color="yellow">
						Please Login.
					</Text>
				)}
			</Box>
			<Text dimColor color="gray">
				|
			</Text>
			{active.id && (
				<>
					<Box>
						<Text dimColor color="yellow" wrap="truncate-middle">
							[{isGroup ? "G" : "F"}] {active.name} ({active.id})
						</Text>
					</Box>
					<Text dimColor color="gray">
						|
					</Text>
				</>
			)}
			<Box>
				<Text dimColor color={isOnline ? "green" : "red"}>
					{isOnline ? "Online" : "Offline"}
				</Text>
			</Box>
			<Text dimColor color="gray">
				|
			</Text>
			<Box>
				<Text dimColor>{msg}</Text>
			</Box>
		</Box>
	);
}
