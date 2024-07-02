import { Box, Text } from "ink";
import { store } from "../store";

export function List() {
	const [friends, groups] = store.useSnapshot((s) => [
		s.friendList,
		s.groupList,
	]);

	return (
		<Box display="flex" flexDirection="column">
			<Box display="flex" flexDirection="column">
				<Text bold>Friends</Text>
				{friends.map((e) => (
					<Box key={e.user_id}>
						<Text>
							{e.nickname} ({e.user_id})
						</Text>
					</Box>
				))}
				{friends.length === 0 && <Text>No friends</Text>}
			</Box>
			<Box display="flex" flexDirection="column">
				<Text bold>Groups</Text>
				{groups.map((e) => (
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
