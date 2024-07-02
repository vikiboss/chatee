import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useAppConfig } from "../hooks/use-app-config";
import { md5 } from "../utils/md5";
import { useCircularList, useSafeState } from "@shined/react-use";
import SelectInput from "ink-select-input";

export function Settings() {
	const [field, actions] = useCircularList([
		"user",
		"pwd",
		"protocol",
		"summary",
	] as const);

	const [config, mutate] = useAppConfig();
	const [pass, setPass] = useSafeState("");

	return (
		<>
			{field === "user" && (
				<Box>
					<Text>Account: </Text>
					<TextInput
						value={(config.account ?? "").toString()}
						onSubmit={() => actions.next()}
						onChange={(value) => {
							if (!Number.isNaN(+value)) {
								mutate.config.account = +value;
							}
						}}
					/>
				</Box>
			)}
			{field === "pwd" && (
				<Box>
					<Text>Password: </Text>
					<TextInput
						value={pass}
						onSubmit={() => {
							if (pass) {
								mutate.config.password = md5(pass);
							}
							actions.next();
						}}
						onChange={setPass}
					/>
				</Box>
			)}
			{field === "protocol" && (
				<Box>
					<Text>Platform: </Text>
					<SelectInput
						items={[
							// { label: "Linux", value: 0 },
							{ label: "aPhone", value: 1 },
							{ label: "aPad", value: 2 },
							{ label: "Watch", value: 3 },
							{ label: "macOS", value: 4 },
							{ label: "iPad", value: 5 },
							{ label: "Tim", value: 6 },
						]}
						onSelect={(item) => {
							mutate.config.platform = item.value;
							actions.next();
						}}
					/>
				</Box>
			)}

			{field === "summary" && (
				<Box display="flex" flexDirection="column">
					<Box>
						<Text>Account: {config.account}</Text>
					</Box>
					<Box>
						<Text wrap="truncate-end">
							Password: {pass || `[md5]${config.password}`}
						</Text>
					</Box>
					<Box>
						<Text>Platform: {config.platform}</Text>
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
