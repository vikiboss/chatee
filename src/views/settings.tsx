import { useCircularList } from "@shined/react-use";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import TextInput from "ink-text-input";
import { useAppConfig } from "../hooks/use-app-config";
import { Platform } from "@icqqjs/icqq";
import { defaultSignAPi } from "../client";

export function Settings() {
	const [config, mutate] = useAppConfig();
	const [field, actions] = useCircularList([
		"user",
		"platform",
		"sign",
		"summary",
	]);

	return (
		<>
			{field === "user" && (
				<Box>
					<Text>Account: </Text>
					<TextInput
						value={(config.account ?? "").toString()}
						onSubmit={() => actions.next()}
						onChange={(value) => {
							if (+value === 0) {
								mutate.account = undefined;
							} else if (!Number.isNaN(+value)) {
								mutate.account = +value;
							}
						}}
					/>
				</Box>
			)}
			{field === "platform" && (
				<Box>
					<Text>Platform: </Text>
					<SelectInput
						items={[
							// { label: "Linux", value: 0 },
							{ label: "aPhone", value: Platform.Android },
							{ label: "aPad", value: Platform.aPad },
							{ label: "Watch", value: Platform.Watch },
							{ label: "macOS", value: Platform.iMac },
							{ label: "iPad", value: Platform.iPad },
							{ label: "Tim", value: Platform.Tim },
						]}
						onSelect={(item) => {
							mutate.platform = item.value;
							actions.next();
						}}
					/>
				</Box>
			)}

			{field === "sign" && (
				<Box>
					<Text>Sign API: </Text>
					<TextInput
						value={(config.signApi ?? "").toString()}
						onSubmit={() => actions.next()}
						onChange={(value) => {
							if (value) mutate.signApi = value;
						}}
					/>
				</Box>
			)}

			{field === "summary" && (
				<Box display="flex" flexDirection="column" gap={1}>
					<Box>
						<Text>Account: {config.account}</Text>
					</Box>
					<Box>
						<Text>Platform: {config.platform}</Text>
					</Box>
					<Box>
						<Text>Sign API: {config.signApi || defaultSignAPi}</Text>
					</Box>
					<Box>
						<Text dimColor color="gray">
							Press `Tab` to return.
						</Text>
					</Box>
				</Box>
			)}
		</>
	);
}
