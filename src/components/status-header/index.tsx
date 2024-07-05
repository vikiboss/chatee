import { Box, Spacer, Text } from "ink";
import { client } from "../../client";
import { useIsOnline } from "../../hooks/use-is-online";
import { store } from "../../store";

export function StatusHeader() {
	const isOnline = useIsOnline();
	const active = store.useSnapshot((s) => s.active);
	const isLoggingIn = store.useSnapshot((s) => s.isLoggingIn);

	return (
		<Box width="100%">
			<Box width={48} display="flex" justifyContent="flex-start">
				{isLoggingIn ? (
					<Text dimColor color="gray">
						logging in...
					</Text>
				) : client.uin ? (
					<Text dimColor color="green">
						{client.nickname} ({client.uin})
					</Text>
				) : (
					<Text dimColor color="yellow">
						Please Login.
					</Text>
				)}
			</Box>
			<Spacer />
			<Box width={32} display="flex" justifyContent="center">
				{active.id && (
					<Text dimColor color="yellow" wrap="truncate-middle">
						[{active.type === "group" ? "G" : "F"}] {active.name} ({active.id})
					</Text>
				)}
			</Box>
			<Spacer />
			<Box width={10} display="flex" justifyContent="flex-end">
				<Text dimColor color={isOnline ? "green" : "red"}>
					{isOnline ? "Online" : "Offline"}
				</Text>
			</Box>
		</Box>
	);
}
