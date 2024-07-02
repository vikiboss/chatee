import fs from "node:fs";
import { useMount, useUnmount } from "@shined/react-use";
import { useAppConfig } from "./use-app-config.js";
import { chateeDataDir } from "../store.js";

export function useLifecycle(reset = false) {
	const [_, mutate] = useAppConfig();

	useMount(() => {
		if (reset) {
			mutate.config = {};
			fs.rmdirSync(chateeDataDir, { recursive: true });
		}
	});

	useUnmount(() => {
		console.log(`\nBye, see you later! (${new Date().toLocaleString()})`);
	});
}
