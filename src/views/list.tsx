import { useSafeState } from "@shined/react-use";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useMemo } from "react";
import { store } from "../store";
import { TargetItem } from "../components/target-item";

export function List() {
	const [filterText, setFilter] = useSafeState("");

	const [friends, groups] = store.useSnapshot((s) => [
		s.friendList,
		s.groupList,
	]);

	const list = useMemo(() => {
		return [
			...friends.filter((e) => {
				return (
					e.user_id.toString().includes(filterText) ||
					e.nickname.includes(filterText)
				);
			}),
			...groups.filter((e) => {
				return (
					e.group_id.toString().includes(filterText) ||
					e.group_name.includes(filterText)
				);
			}),
		].map((e) => ({
			...e,
			id: "user_id" in e ? `F:${e.user_id}` : `G:${e.group_id}`,
		}));
	}, [filterText, friends, groups]);

	return (
		<Box display="flex" flexDirection="column">
			<TextInput value={filterText} onChange={setFilter} />
			<Box display="flex" flexDirection="column">
				{list.map((e) => (
					<TargetItem key={e.id} item={e} />
				))}
				{list.length === 0 && (
					<Text dimColor color="gray">
						No results
					</Text>
				)}
			</Box>
		</Box>
	);
}
