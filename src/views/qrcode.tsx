import { Text, useInput } from "ink";
import { client } from "../client";

export function QRcode() {
	useInput((input, key) => {
		if (key.return) {
			client?.login();
		}
	});

	return <Text>Scan QRcode, then press enter to continue...</Text>;
}
