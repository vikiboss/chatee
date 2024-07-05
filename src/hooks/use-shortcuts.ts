import { useInput } from "ink";
import { usePage } from "./use-page.js";

export function useShortcuts() {
	const [_, setPage] = usePage();

	useInput((_input, key) => {
		if (key.tab) {
			setPage("home");
		}
	});
}
