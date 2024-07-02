import { useStableFn } from "@shined/react-use";
import { Login } from "../views/login.js";
import { Home } from "../views/home.js";
import { Chat } from "../views/chat.js";
import { Loading } from "../views/loading.js";
import { Settings } from "../views/settings.js";
import { About } from "../views/about.js";
import { store, type App } from "../store.js";
import { useLoading } from "./use-loading.js";

const map: Record<App.Page, React.ReactNode> = {
	about: <About />,
	chat: <Chat />,
	login: <Login />,
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

	// biome-ignore lint/correctness/useJsxKeyInIterable: JSX keys are not needed here
	return [loading ? <Loading /> : map[page] || <Login />, setPage] as const;
}
