import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { create } from "@shined/reactive";
import { subscribe } from "@shined/reactive/vanilla";

import type { FriendInfo, GroupInfo } from "@icqqjs/icqq";

export namespace App {
	export type Page =
		| "list"
		| "qrcode"
		| "recent"
		| "home"
		| "about"
		| "chat"
		| "settings";
}

export interface AppConfig {
	account?: number;
	password?: string;
	platform?: number;
	recent: Active[];
}

export const chateeDir = path.join(os.homedir(), ".config/chatee");

export const paths = {
	chateeDataDir: path.join(chateeDir, "data"),
	chateeLogDir: path.join(chateeDir, "logs"),
	chateeConfig: path.join(chateeDir, "chatee.json"),
};

interface Active {
	name?: string;
	id?: number;
	type?: "friend" | "group";
}

interface HistoryItem {
	id: string;
	name: string;
	timestamp: string;
	content: string;
}

export const store = create({
	config: {
		recent: [],
	} as AppConfig,

	page: "home" as App.Page,
	isOnline: false,

	active: {} as Active,

	friendList: [] as FriendInfo[],
	groupList: [] as GroupInfo[],

	isLoggingIn: false,

	history: {
		friends: {} as Record<number, HistoryItem[]>,
		groups: {} as Record<number, (HistoryItem & { groupName: string })[]>,
	},
});

export function setupAppConfig(reset = false) {
	if (reset) {
		Object.assign(store.mutate.config, {
			account: undefined,
			password: undefined,
			platform: undefined,
		});

		fs.rmdirSync(paths.chateeDataDir, { recursive: true });
	}

	if (!fs.existsSync(chateeDir)) {
		fs.mkdirSync(chateeDir, { recursive: true });
	}

	if (fs.existsSync(paths.chateeConfig)) {
		store.mutate.config = JSON.parse(
			fs.readFileSync(paths.chateeConfig, "utf-8"),
		);
	} else {
		fs.writeFileSync(
			paths.chateeConfig,
			JSON.stringify({ recent: [] }),
			"utf-8",
		);
	}

	const unsubscribe = subscribe(store.mutate, (changes) => {
		if (changes.props[0] === "config") {
			fs.writeFileSync(
				paths.chateeConfig,
				JSON.stringify(store.mutate.config, null, 2),
			);
		}
	});

	return unsubscribe;
}
