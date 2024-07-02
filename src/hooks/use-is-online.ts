import { store } from "../store";

export function useIsOnline() {
	return store.useSnapshot((s) => s.isOnline);
}
