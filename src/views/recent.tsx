import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { useAppConfig } from "../hooks/use-app-config";
import { store } from "../store";

export function Recent() {
	const [{ recent = [] }] = useAppConfig();

	return (
		<Box display="flex" flexDirection="column">
			<Text>Recent:</Text>
			<SelectInput
				items={recent.map((e) => ({
					label: `[${e.type === "friend" ? "F" : "G"}] ${e.name || e.id}`,
					value: e.id,
				}))}
				onSelect={(item) => {
					const target = recent.find((e) => e.id === item.value);

					if (target) {
						store.mutate.page = "chat";
						store.mutate.active = { ...target };
					}
				}}
			/>
		</Box>
	);
}
