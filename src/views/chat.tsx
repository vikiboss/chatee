import { useControlledComponent, useUnmount } from "@shined/react-use";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";
import { store } from "../store";
import { client } from "../client";
import { useAppConfig } from "../hooks/use-app-config";

export function Chat() {
	const id = useControlledComponent("");
	const raw = useControlledComponent("");
	const active = store.useSnapshot((s) => s.active);
	const history = store.useSnapshot((s) => s.history);
	const [, mutate] = useAppConfig();

	const isGroup = active.type === "group";

	useUnmount(() => {
		store.mutate.active.name = undefined;
		store.mutate.active.type = undefined;
		store.mutate.active.id = undefined;
	});

	const histories = active.id
		? history[isGroup ? "groups" : "friends"][active.id] ?? []
		: [];

	const hasTarget = active.type && active.id;

	return (
		<Box flexGrow={1} display="flex" flexDirection="column">
			{!active.type && (
				<Box>
					<Text>Chat 👉 </Text>
					<SelectInput
						onSelect={(item) => {
							store.mutate.active.type = item.value;
						}}
						items={
							[
								{ label: "with Friend", value: "friend" },
								{ label: "in Group", value: "group" },
							] as const
						}
					/>
				</Box>
			)}

			{active.type && !active.id && (
				<Box>
					<Text>Target Id 👉 </Text>
					<TextInput
						{...id.props}
						onSubmit={() => {
							if (!Number.isNaN(+id.value) && +id.value) {
								store.mutate.active.id = +id.value;

								store.mutate.active.name = isGroup
									? client?.pickGroup(+id.value).name
									: client?.pickFriend(+id.value).nickname;

								if (mutate.recent.every((e) => e.id !== +id.value)) {
									mutate.recent.push({ ...store.mutate.active });
								}
							}
						}}
					/>
				</Box>
			)}

			<Box display="flex" flexDirection="column" marginY={1}>
				{hasTarget &&
					histories.slice(-60).map((e) => (
						<Box key={e.timestamp + e.name + e.content}>
							<Text
								dimColor
								color={e.name === client?.nickname ? "gray" : "green"}
							>
								[{new Date(+e.timestamp).toLocaleTimeString()}-{e.name}]
							</Text>

							<Box marginLeft={1}>
								<Text dimColor>{e.content}</Text>
							</Box>
						</Box>
					))}

				{hasTarget && !histories.length && (
					<Text dimColor>Waiting for message...</Text>
				)}
			</Box>

			{hasTarget && (
				<Box>
					<Box marginRight={1}>
						<Text dimColor>&rarr;</Text>
					</Box>
					<TextInput
						{...raw.props}
						onSubmit={async () => {
							if (!active.id || !raw.value) return;

							raw.setValue(`${raw.value} (sending...)`);

							if (isGroup) {
								const g = client?.pickGroup(active.id);
								await g?.sendMsg(raw.value);

								store.mutate.history.groups[active.id] ??= [];
								store.mutate.history.groups[active.id].push({
									name: client?.nickname ?? "unknown",
									timestamp: Date.now().toString(),
									content: raw.value,
									groupName: client?.pickGroup(active.id).name ?? "unknown",
								});
							} else {
								const f = client?.pickFriend(active.id);
								await f?.sendMsg(raw.value);

								store.mutate.history.friends[active.id] ??= [];
								store.mutate.history.friends[active.id].push({
									name: client?.nickname ?? "unknown",
									timestamp: Date.now().toString(),
									content: raw.value,
								});
							}

							raw.reset();
						}}
					/>
				</Box>
			)}
		</Box>
	);
}
