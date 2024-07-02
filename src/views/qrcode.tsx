import { Text, useInput } from "ink";
import { client } from "../client";
import { useIsOnline } from "../hooks/use-is-online";

export function QRcode() {
	const isOnline = useIsOnline();

	useInput((input, key) => {
		if (key.return) {
			client?.login();
		}
	});

	return (
		<>
			{isOnline ? (
				<Text dimColor color="green">
					You‘re login! Press `Tab` to view list.
				</Text>
			) : (
				<Text dimColor color="cyan">
					Scan QRcode, then press enter to continue...
				</Text>
			)}
		</>
	);
}
