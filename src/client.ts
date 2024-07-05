import path from "node:path";
import { createClient } from "@icqqjs/icqq";
import { paths, store } from "./store";

const logFilePath = path.join(
	paths.chateeLogDir,
	`chatee-${new Date().toLocaleString()}.log`,
);

const { platform = 3 } = store.mutate.config || {};

export const client = createClient({
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

	await refreshList();

	store.mutate.groupList = [...(client.getGroupList().values() ?? [])];
	store.mutate.friendList = [...(client.getFriendList().values() ?? [])];
});

client.on("system.offline", () => {
	store.mutate.isOnline = false;
});

client.on("message.private.friend", (event) => {
	store.mutate.history.friends[event.sender.user_id] = [
		...(store.mutate.history.friends[event.sender.user_id] ?? []),
		{
			name: event.sender.nickname,
			id: event.message_id,
			content: event.toString(),
			timestamp: Date.now().toString(),
		},
	];
});

client.on("message.group.normal", (event) => {
	store.mutate.history.groups[event.group_id] = [
		...(store.mutate.history.groups[event.group_id] ?? []),
		{
			id: event.message_id,
			name: event.sender.card || event.sender.nickname,
			groupName: event.group_name,
			content: event.toString(),
			timestamp: Date.now().toString(),
		},
	];
});

export async function login() {
	store.mutate.page = "loading";
	await client.login(store.mutate.config.account);
}

export async function refreshList() {
	await client.reloadFriendList();
	await client.reloadGroupList();
}
