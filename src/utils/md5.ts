import crypto from "node:crypto";

import type { BinaryLike } from "node:crypto";

export function md5(text: BinaryLike): string {
	const hash = crypto.createHash("md5").update(text);
	return hash.digest("hex");
}
