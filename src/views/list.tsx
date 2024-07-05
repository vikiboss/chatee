import { useMount, useSafeState } from "@shined/react-use";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useMemo } from "react";
import { refreshList } from "../client";
import { store } from "../store";

export function List() {
	const [filterText, setFilter] = useSafeState("");

	const [friends, groups] = store.useSnapshot((s) => [
		s.friendList,
		s.groupList,
	]);

	useMount(refreshList);

	const filtered = useMemo(() => {
		return {
			friends: friends.filter((e) => {
				return (
					e.user_id.toString().includes(filterText) ||
					e.nickname.includes(filterText)
				);
			}),
			groups: groups.filter((e) => {
				return (
					e.group_id.toString().includes(filterText) ||
					e.group_name.includes(filterText)
				);
			}),
		};
	}, [filterText, friends, groups]);

	return (
		<Box display="flex" flexDirection="column">
			<TextInput value={filterText} onChange={setFilter} />
			<Box display="flex" flexDirection="column">
				<Text bold> === Friends === </Text>
				{filtered.friends.map((e) => (
					<Box key={e.user_id}>
						<Text>
							{e.nickname} ({e.user_id})
						</Text>
					</Box>
				))}
				{friends.length === 0 && <Text>No friends</Text>}
			</Box>
			<Box display="flex" flexDirection="column">
				<Text bold> === Groups === </Text>
				{filtered.groups.map((e) => (
					<Box key={e.group_id}>
						<Text>
							{e.group_name} ({e.group_id})
						</Text>
					</Box>
				))}
				{groups.length === 0 && <Text>No groups</Text>}
			</Box>
		</Box>
	);
}
