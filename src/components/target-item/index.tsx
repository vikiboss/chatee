import { Box, Text } from "ink";

import type { FriendInfo, GroupInfo } from "@icqqjs/icqq";

interface Props {
	item: FriendInfo | GroupInfo;
}

export function TargetItem(props: Props) {
	const { item } = props;
	const isFriend = "user_id" in item;
	const tag = `[${isFriend ? "F" : "G"}]`;
	const name = isFriend ? item.nickname : item.group_name;
	const id = isFriend ? item.user_id : item.group_id;
	const tagColor = isFriend ? "green" : "blue";

	return (
		<Box key={id + isFriend.toString()} gap={1}>
			<Text dimColor color={tagColor} bold>
				{tag}
			</Text>
			<Text dimColor color="gray">
				{name} ({id})
			</Text>
		</Box>
	);
}
