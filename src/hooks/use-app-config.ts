import { configStore } from "../app-config.js";

export function useAppConfig() {
	return [configStore.useSnapshot(), configStore.mutate] as const;
}
