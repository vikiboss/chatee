import { useStableFn } from "@shined/react-use";
import { Home } from "../views/home.js";
import { Chat } from "../views/chat.js";
import { Loading } from "../views/loading.js";
import { Settings } from "../views/settings.js";
import { About } from "../views/about.js";
import { store, type App } from "../store.js";
import { useLoading } from "./use-loading.js";
import { List } from "../views/list.js";
import { QRcode } from "../views/qrcode.js";
import { Recent } from '../views/recent.js';

const map: Record<App.Page, React.ReactNode> = {
	about: <About />,
	chat: <Chat />,
	qrcode: <QRcode />,
	list: <List />,
	recent: <Recent />,
	home: <Home />,
	settings: <Settings />,
	loading: <Loading />,
};

export function usePage() {
	const loading = useLoading();
	const page = store.useSnapshot((s) => s.page);

	const setPage = useStableFn((page: App.Page) => {
		store.mutate.page = page;
	});

	return [
		// biome-ignore lint/correctness/useJsxKeyInIterable: JSX keys are not needed here
		loading ? <Loading /> : map[page],
		setPage,
		page,
	] as const;
}
