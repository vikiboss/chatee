import { Box, Spacer, Text } from "ink";
import { client } from "../../client";
import { useIsOnline } from "../../hooks/use-is-online";
import { store } from "../../store";

export function StatusHeader() {
	const isOnline = useIsOnline();
	const active = store.useSnapshot((s) => s.active);

	return (
		<Box width="100%">
			<Box width={48} display="flex" justifyContent="flex-start">
				{client.uin ? (
					<Text dimColor color="green">
						User: {client.nickname} ({client.uin})
					</Text>
				) : (
					<Text dimColor color="yellow">
						No Account
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
