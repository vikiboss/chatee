import { useInput } from "ink";
import { usePage } from "./use-page.js";

export function useShortcuts() {
	const [_, setPage, pageName] = usePage();

	useInput((input, key) => {
		if (key.tab) {
			setPage("home");
		}
	});
}
