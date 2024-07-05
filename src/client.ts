import path from "node:path";
import { createClient, Platform, type Client } from "@icqqjs/icqq";
import { paths, store } from "./store";

const logFilename = `chatee-${new Date().toLocaleString()}.log`;
const logFilePath = path.join(paths.chateeLogDir, logFilename);

export let client: Client;

const { CHATEE_UIN, CHATEE_SIGN_API, CHATEE_PLATFORM } = process.env;

export const envAccount = CHATEE_UIN ? +CHATEE_UIN : undefined;
export const envSignAPI = CHATEE_SIGN_API;
export const envPlatform = CHATEE_PLATFORM ? +CHATEE_PLATFORM : undefined;

export const defaultSignAPI = "https://qsign.viki.moe/sign";

export function setupClient() {
	const { signApi, platform = Platform.iPad } = store.mutate.config || {};

	client = createClient({
		platform: envPlatform || platform,
		data_dir: paths.chateeDataDir,
		sign_api_addr: envSignAPI || signApi || defaultSignAPI,
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
		console.log("event: system.login.error");
	});

	client.on("system.login.device", () => {
		console.log("event: system.login.device");
	});

	client.on("system.login.slider", ({ url }) => {
		console.log("event: system.login.slider");
		console.log(`Slider URL: ${url}`);
	});

	client.on("system.offline.network", () => {
		console.log("event: system.offline.network");
		store.mutate.isOnline = false;
	});

	client.on("system.offline.kickoff", () => {
		console.log("event: system.offline.kickoff");
		store.mutate.isOnline = false;
	});

	client.on("system.online", async () => {
		store.mutate.config.account = client.uin;
		store.mutate.isOnline = true;
		store.mutate.page = "home";

		await refreshList();
	});

	client.on("message.private.friend", (event) => {
		const friends = store.mutate.history.friends;
		// biome-ignore lint/suspicious/noAssignInExpressions: no warning
		const item = (friends[event.sender.user_id] ??= []);

		item.push({
			name: event.sender.nickname,
			id: event.message_id,
			content: event.toString(),
			timestamp: Date.now().toString(),
		});
	});

	client.on("message.group.normal", (event) => {
		const groups = store.mutate.history.groups;
		// biome-ignore lint/suspicious/noAssignInExpressions: no warning
		const item = (groups[event.group_id] ??= []);

		item.push({
			id: event.message_id,
			name: event.sender.card || event.sender.nickname,
			groupName: event.group_name,
			content: event.toString(),
			timestamp: Date.now().toString(),
		});
	});
}

export async function login() {
	store.mutate.isLoggingIn = true;
	await client.login(envAccount || store.mutate.config.account);
	store.mutate.isLoggingIn = false;
}

export async function refreshList() {
	await client.reloadFriendList();
	await client.reloadGroupList();

	store.mutate.groupList = Array.from(client.getGroupList().values());
	store.mutate.friendList = Array.from(client.getFriendList().values());
}
