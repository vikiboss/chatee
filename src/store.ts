import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { create } from "@shined/reactive";

import type { FriendInfo, GroupInfo } from "@icqqjs/icqq";
import { subscribe } from "@shined/reactive/vanilla";

export namespace App {
	export type Page =
		| "list"
		| "qrcode"
		| "recent"
		| "home"
		| "about"
		| "chat"
		| "settings"
		| "loading";
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

export const store = create({
	config: {
		recent: [],
	} as AppConfig,

	page: "home" as App.Page,
	isOnline: false,

	active: {} as Active,

	friendList: [] as FriendInfo[],
	groupList: [] as GroupInfo[],

	history: {
		friends: {} as Record<
			number,
			{
				id: string;
				name: string;
				timestamp: string;
				content: string;
			}[]
		>,
		groups: {} as Record<
			number,
			{
				id: string;
				name: string;
				groupName: string;
				timestamp: string;
				content: string;
			}[]
		>,
	},
});

export function readInitialConfig() {
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
}

export function subscribeConfigChange() {
	return subscribe(store.mutate, (changes) => {
		if (changes.props[0] === "config") {
			fs.writeFileSync(
				paths.chateeConfig,
				JSON.stringify(store.mutate.config, null, 2),
			);
		}
	});
}
