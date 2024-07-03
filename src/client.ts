import path from "node:path";
import { createClient } from "@icqqjs/icqq";
import { chateeLogDir, store } from "./store";

import type { Client } from "@icqqjs/icqq";

export let client: Client | undefined;

export function login() {
	const { platform } = store.mutate.config || {};

	store.mutate.page = "loading";

	const logFilePath = path.join(
		chateeLogDir,
		`chatee-${new Date().toLocaleString()}.log`,
	);

	client = createClient({
		platform,
		sign_api_addr: "https://qsign.viki.moe/sign",
		log_config: {
			appenders: {
				log_file: {
					type: "file",
					filename: logFilePath,
					maxLogSize: 1024 * 1024 * 10,
					compress: false,
					backups: 3,
					encoding: "utf-8",
				},
			},
			categories: {
				default: {
					appenders: ["log_file"],
					level: "all",
				},
			},
		},
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
		store.mutate.page = "home";

		await client?.reloadFriendList();
		await client?.reloadGroupList();

		store.mutate.groupList = [...(client?.getGroupList().values() ?? [])];
		store.mutate.friendList = [...(client?.getFriendList().values() ?? [])];
	});

	client.on("system.offline", () => {
		store.mutate.isOnline = false;
	});

	client.on("message.private.friend", (event) => {
		store.mutate.history.friends[event.sender.user_id] = [
			...(store.mutate.history.friends[event.sender.user_id] ?? []),
			{
				name: event.sender.nickname,
				content: event.toString(),
				timestamp: Date.now().toString(),
			},
		];
	});

	client.on("message.group.normal", (event) => {
		store.mutate.history.groups[event.group_id] = [
			...(store.mutate.history.groups[event.group_id] ?? []),
			{
				name: event.sender.nickname,
				groupName: event.group_name,
				content: event.toString(),
				timestamp: Date.now().toString(),
			},
		];
	});

	client.login(store.mutate.config.account);
}
