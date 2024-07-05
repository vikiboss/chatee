import { useUnmount } from "@shined/react-use";

export function useLifecycle() {
	useUnmount(() => {
		console.log(`\nBye, see you later! (${new Date().toLocaleString()})`);
		process.exit();
	});
}
