#!/usr/bin/env node

import { render } from "ink";
import meow from "meow";
import { Chatee } from "./chatee.js";
import { setupAppConfig } from "./store.js";
import { setupClient } from "./client.js";

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

const cli = meow(
	`
	Usage
		$ chatee

	Options
		--reset  Reset all data
`,
	{
		importMeta: import.meta,
		flags: { reset: { type: "boolean" } },
	},
);

setupAppConfig(cli.flags.reset);
setupClient();

render(<Chatee />);
