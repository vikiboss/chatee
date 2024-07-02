import { Box, Text } from "ink";
import { store } from "../store";
import { useSafeState } from "@shined/react-use";
import TextInput from "ink-text-input";
import { useMemo } from "react";

export function List() {
	const [filter, setFilter] = useSafeState("");

	const [friends, groups] = store.useSnapshot((s) => [
		s.friendList,
		s.groupList,
	]);

	const filtered = useMemo(() => {
		return {
			friends: friends.filter(
				(e) =>
					e.user_id.toString().includes(filter) || e.nickname.includes(filter),
			),
			groups: groups.filter(
				(e) =>
					e.group_id.toString().includes(filter) ||
					e.group_name.includes(filter),
			),
		};
	}, [filter, friends, groups]);

	return (
		<Box display="flex" flexDirection="column">
			<TextInput value={filter} onChange={setFilter} />
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
