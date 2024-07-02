import { store } from "../store.js";

export function useAppConfig() {
	return [store.useSnapshot((s) => s.config), store.mutate.config] as const;
}
