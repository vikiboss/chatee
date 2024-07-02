import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/index.tsx"],
	format: ["esm"],
	treeshake: true,
	target: "node18",
	platform: "node",
	dts: false,
	noExternal: ["@shined/react-use"],
});
