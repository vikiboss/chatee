import { useSafeState, useUnmount } from "@shined/react-use";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";
import { store } from "../store";
import { client } from "../client";

export function Chat() {
	const [id, setId] = useSafeState("");
	const [raw, setRaw] = useSafeState("");
	const active = store.useSnapshot((s) => s.active);
	const history = store.useSnapshot((s) => s.history);

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
		<Box display="flex" flexDirection="column">
			{!active.type && (
				<SelectInput
					items={
						[
							{ label: "Friend", value: "friend" },
							{ label: "Group", value: "group" },
						] as const
					}
					onSelect={(item) => {
						store.mutate.active.type = item.value;
					}}
				/>
			)}

			{active.type && !active.id && (
				<TextInput
					value={id}
					onSubmit={() => {
						if (!Number.isNaN(+id) && +id) {
							store.mutate.active.id = +id;
							store.mutate.active.name = isGroup
								? client?.pickGroup(+id).name
								: client?.pickFriend(+id).nickname;
						}
					}}
					onChange={setId}
				/>
			)}

			{hasTarget &&
				histories.map((e) => (
					<Box key={e.timestamp}>
						<Text dimColor color="cyan">
							{active.id}
						</Text>
						<Text dimColor>: {e.content}</Text>
					</Box>
				))}

			{hasTarget && !histories.length && <Text dimColor>No message</Text>}

			{hasTarget && (
				<TextInput
					onSubmit={async () => {
						if (!active.id || !raw) return;

						if (isGroup && active.id) {
							const g = client?.pickGroup(active.id);
							await g?.sendMsg(raw);

							store.mutate.history.groups[active.id] ??= [];
							store.mutate.history.groups[active.id].unshift({
								name: client?.nickname ?? "unknown",
								timestamp: Date.now().toString(),
								content: raw,
								groupName: client?.pickGroup(active.id).name ?? "unknown",
							});
						} else {
							const f = client?.pickFriend(active.id);
							await f?.sendMsg(raw);

							store.mutate.history.friends[active.id] ??= [];
							store.mutate.history.friends[active.id].unshift({
								name: client?.nickname ?? "unknown",
								timestamp: Date.now().toString(),
								content: raw,
							});
						}

						setRaw("");
					}}
					value={raw}
					onChange={setRaw}
				/>
			)}
		</Box>
	);
}
