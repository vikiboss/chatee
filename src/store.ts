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
export const chateeDataDir = path.join(chateeDir, "data");
export const chateeLogDir = path.join(chateeDir, "logs");
export const chateeConfig = path.join(chateeDir, "chatee.json");

interface Active {
	name?: string;
	id?: number;
	type?: "friend" | "group";
}

export const store = create({
	config: readInitialConfig() as AppConfig,
	page: "home" as App.Page,
	isOnline: false,

	active: {} as Active,

	friendList: [] as FriendInfo[],
	groupList: [] as GroupInfo[],

	history: {
		friends: {} as Record<
			number,
			{
				name: string;
				timestamp: string;
				content: string;
			}[]
		>,
		groups: {} as Record<
			number,
			{
				name: string;
				groupName: string;
				timestamp: string;
				content: string;
			}[]
		>,
	},
});

subscribe(store.mutate, (changes) => {
	if (changes.props[0] === "config") {
		fs.writeFileSync(
			chateeConfig,
			JSON.stringify(store.mutate.config, null, 2),
		);
	}
});

function readInitialConfig() {
	if (!fs.existsSync(chateeDir)) fs.mkdirSync(chateeDir, { recursive: true });

	if (fs.existsSync(chateeConfig)) {
		return JSON.parse(fs.readFileSync(chateeConfig, "utf-8"));
	}

	fs.writeFileSync(chateeConfig, JSON.stringify({ recent: [] }), "utf-8");

	return {
		recent: [],
	};
}
