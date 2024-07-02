import { create } from "@shined/reactive";

import type { Store } from "@shined/reactive";

export namespace App {
	export type Page = "home" | "about" | "chat" | "settings";

	export interface AppState {
		page: App.Page;
	}
}

export const store: Store<App.AppState> = create({
	page: "home" as App.Page,
});
