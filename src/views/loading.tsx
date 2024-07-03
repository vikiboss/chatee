import { Box, Text } from "ink";

export function Loading() {
	return (
		<Box height="100%" marginY={2} marginX={4}>
			<Text color="green">Loading...</Text>
		</Box>
	);
}
