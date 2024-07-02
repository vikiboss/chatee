import crypto from "node:crypto";

import type { BinaryLike, BinaryToTextEncoding } from "node:crypto";

export function md5(
	text: BinaryLike,
	encoding: BinaryToTextEncoding = "hex",
): string | Buffer {
	const hash = crypto.createHash("md5").update(text);

	if (encoding) {
		return hash.digest(encoding);
	}

	return hash.digest();
}
