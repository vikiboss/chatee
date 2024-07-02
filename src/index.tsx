#!/usr/bin/env node

import { render } from "ink";
import meow from "meow";

import { Chatee } from "./chatee.js";

const cli = meow(
	`
	Usage
		$ chatee

	Options
		--reset  Reset all data
`,
	{
		importMeta: import.meta,
		flags: {
			reset: {
				type: "boolean",
			},
		},
	},
);

render(<Chatee reset={cli.flags.reset} />);
