import { Login } from "../views/login.js";
import { Home } from "../views/home.js";
import { Chat } from "../views/chat.js";
import { About } from "../views/about.js";

import { store, type App } from "../store.js";

const map: Record<App.Page, React.ReactNode> = {
	about: <About />,
	chat: <Chat />,
	home: <Home />,
	settings: <Home />,
};

export function usePage() {
	const page = store.useSnapshot((s) => s.page);

	return map[page] || <Login />;
}
