import { useEffectOnce, useSafeState } from "@shined/react-use";

export function useStdSize() {
	const [size, setSize] = useSafeState({
		columns: process.stdout.columns,
		rows: process.stdout.rows,
	});

	useEffectOnce(() => {
		function onResize() {
			setSize({
				columns: process.stdout.columns,
				rows: process.stdout.rows,
			});
		}

		process.stdout.on("resize", onResize);
		process.stdout.write("\x1b[?1049h");

		return () => {
			process.stdout.off("resize", onResize);
			process.stdout.write("\x1b[?1049l");
		};
	});

	return size;
}
