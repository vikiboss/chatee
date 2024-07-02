import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { create } from "@shined/reactive";
import { subscribe } from "@shined/reactive/vanilla";

import type { Store } from "@shined/reactive";

export interface AppConfig {
	account?: number;
	password?: string;
	platform?: string;
}

export const configFile = `${os.homedir()}/config/chatee.json`;

function readInitialConfig() {
	if (fs.existsSync(configFile)) {
		return JSON.parse(fs.readFileSync(configFile, "utf-8"));
	}

	const dir = path.dirname(configFile);
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(configFile, "{}", "utf-8");

	return {};
}

export const configStore: Store<{ config: AppConfig }> = create({
	config: readInitialConfig(),
});

subscribe(configStore.mutate, (changes) => {
	if (changes.propsPath.includes("config")) {
		fs.writeFileSync(
			configFile,
			JSON.stringify(configStore.mutate.config, null, 2),
		);
	}
});
