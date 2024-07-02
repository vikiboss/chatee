import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { create } from "@shined/reactive";
import { subscribe } from "@shined/reactive/vanilla";

export namespace App {
	export type Page =
		| "list"
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
}

export const chateeDir = path.join(os.homedir(), ".config/chatee");
export const chateeDataDir = path.join(chateeDir, "data");
export const chateeConfig = path.join(chateeDir, "chatee.json");

export const store = create({
	config: readInitialConfig() as AppConfig,
	page: "home" as App.Page,
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

	fs.writeFileSync(chateeConfig, "{}", "utf-8");

	return {};
}
