import { useApp, useInput } from "ink";
import { store } from "../store.js";

export function useShortcuts() {
	const app = useApp();

	useInput((key) => {
		switch (key) {
			case "q":
				app.exit();
				break;
			case "a":
				store.mutate.page = "about";
				break;
			case "c":
				store.mutate.page = "chat";
				break;
			case "h":
				store.mutate.page = "home";
				break;
			case "l":
				store.mutate.page = "login";
				break;
			case "s":
				store.mutate.page = "settings";
				break;
		}
	});
}
