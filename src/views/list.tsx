import { Box, Text } from "ink";
import { store } from "../store";

export function List() {
	const [friends, groups] = store.useSnapshot((s) => [
		s.friendList,
		s.groupList,
	]);
	return (
		<Box display="flex" flexDirection="column">
			<Box>
				<Text bold>Friends</Text>
				{friends.map((e) => (
					<Text key={e.user_id}>
						{e.nickname} ({e.user_id})
					</Text>
				))}
				{friends.length === 0 && <Text>No friends</Text>}
			</Box>
			<Box>
				<Text bold>Groups</Text>
				{groups.map((e) => (
					<Text key={e.group_id}>
						{e.group_name} ({e.group_id})
					</Text>
				))}
				{groups.length === 0 && <Text>No groups</Text>}
			</Box>
		</Box>
	);
}
