import { createClient } from "@icqqjs/icqq";

const client = createClient({
	platform: 3,
	log_level: "trace",
	sign_api_addr: "https://qsign.viki.moe/sign",
});

client.on("system.login.qrcode", () => {
	console.log("login qrcode");
});

client.on("system.login.error", () => {
	console.log("login error");
});

client.on("system.login.device", () => {
	console.log("login device");
});

client.on("system.login.slider", () => {
	console.log("login slider");
});

client.on("system.online", async () => {
	console.log("online");
});

client.on("system.offline", () => {
	console.log("offline");
});

client.login();
