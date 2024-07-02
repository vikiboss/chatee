import { store } from "../app-config.js";

export function useAppConfig() {
	return [store.useSnapshot(), store.mutate] as const;
}
