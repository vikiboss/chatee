import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/index.tsx"],
	splitting: false,
	format: ["esm"],
	treeshake: true,
	target: "node18",
	platform: "node",
	dts: false,
	clean: true,
	minify: true,
	noExternal: ["@shined/react-use", "meow"],
});
