import { useUnmount } from "@shined/react-use";
import { useApp, useInput } from "ink";
import { store } from "../store.js";

export function useShortcuts() {
	const app = useApp();

	useUnmount(() => {
		console.log(`Bye, see you later! (${new Date().toLocaleString()})`);
	});

	useInput((key) => {
		if (key === "q") {
			app.exit();
		}

		if (key === "a") {
			store.mutate.page = "about";
		}
	});
}
