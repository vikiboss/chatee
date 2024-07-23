import { useControlledComponent, useUnmount } from "@shined/react-use";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import TextInput from "ink-text-input";
import { client } from "../client";
import { useAppConfig } from "../hooks/use-app-config";
import { store } from "../store";
import { md5 } from "../utils/md5";
import { segment } from "@icqqjs/icqq";

const REGEXP_IMAGE = /^img\s+(.*)$/;
const REGEXP_FACE = /^face\s+(\d+)$/;

export function Chat() {
	const id = useControlledComponent("");
	const raw = useControlledComponent("");

	const [, mutate] = useAppConfig();

	const [active, isGroup, hasTarget] = store.useSnapshot((s) => [
		s.active,
		s.active.type === "group",
		s.active.type && s.active.id,
	]);

	const histories = store.useSnapshot((s) => {
		const attr = s.active.type === "group" ? "groups" : "friends";
		return active.id ? s.history[attr][active.id] ?? [] : [];
	});

	useUnmount(() => {
		store.mutate.active = {};
	});

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
									? client.pickGroup(+id.value).name
									: client.pickFriend(+id.value).nickname;

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
					histories.slice(-100).map((e) => (
						<Box display="flex" flexDirection="column" key={e.id}>
							<Text
								dimColor
								color={e.name === client.nickname ? "yellow" : "green"}
							>
								[{e.name}] {new Date(+e.timestamp).toLocaleTimeString()}
							</Text>
							<Text dimColor>{e.content}</Text>
						</Box>
					))}

				{hasTarget && !histories.length && (
					<Text dimColor>Waiting for new message...</Text>
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
							const msg = raw.value;
							if (!active.id || !msg) return;

							raw.setValue("");

							store.mutate.history.groups[active.id] ??= [];

							const sendingTag = "(sending...)";
							const msgId = md5(`${msg}${Date.now()}`);

							if (isGroup) {
								store.mutate.history.groups[active.id].push({
									id: msgId,
									name: client.nickname ?? "unknown",
									timestamp: Date.now().toString(),
									content: `${msg} ${sendingTag}`,
									groupName: client.pickGroup(active.id).name ?? "unknown",
								});

								const g = client.pickGroup(active.id);
								if (msg.trim().match(REGEXP_IMAGE)) {
									const url = REGEXP_IMAGE.exec(msg)?.[1] ?? "";
									if (url) {
										await g?.sendMsg(segment.image(url));
									}
								} else {
									await g?.sendMsg(msg);
								}

								const item = store.mutate.history.groups[active.id].find(
									(e) => e.id === msgId,
								);

								if (item) {
									item.content = item.content.replace(sendingTag, "").trim();
								}
							} else {
								store.mutate.history.friends[active.id] ??= [];

								store.mutate.history.friends[active.id].push({
									id: msgId,
									name: client.nickname ?? "unknown",
									timestamp: Date.now().toString(),
									content: `${msg} ${sendingTag}`,
								});

								const f = client.pickFriend(active.id);

								if (msg.trim().match(REGEXP_IMAGE)) {
									const url = REGEXP_IMAGE.exec(msg)?.[1] ?? "";
									if (url) {
										await f?.sendMsg(segment.image(url));
									}
								} else {
									await f?.sendMsg(msg);
								}

								const item = store.mutate.history.friends[active.id].find(
									(e) => e.id === msgId,
								);

								if (item) {
									item.content = item.content.replace(sendingTag, "").trim();
								}
							}
						}}
					/>
				</Box>
			)}
		</Box>
	);
}
