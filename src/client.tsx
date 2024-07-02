import { createClient } from "@icqqjs/icqq";
import { store } from "./store";

import type { Client } from "@icqqjs/icqq";

export let client: Client | undefined;

export function login() {
	const { platform } = store.mutate.config || {};

	store.mutate.page = "loading";

	client = createClient({
		platform,
		sign_api_addr: "https://qsign.viki.moe/sign",
	});

	client.on("system.login.qrcode", () => {
		store.mutate.page = "qrcode";
	});

	client.on("system.login.error", () => {
		console.log("login error");
	});

	client.on("system.login.device", () => {
		console.log("login device");
	});

	client.on("system.login.slider", () => {
		console.log("login slider");
	});

	client.on("system.online", async () => {
		store.mutate.isOnline = true;
		store.mutate.groupList = [...(client?.getGroupList().values() ?? [])];
		store.mutate.friendList = [...(client?.getFriendList().values() ?? [])];
	});

	client.on("system.offline", () => {
		store.mutate.isOnline = false;
	});

	client.login(store.mutate.config.account);
}
