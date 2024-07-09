# Chatee

A terminal chat app, powered by [`React`](https://react.dev/), [`ink`](https://github.com/vadimdemedes/ink), and [`icqq`](https://github.com/icqqjs/icqq) (private repo, join [icqqjs](https://github.com/icqqjs) org first to use it).

## Setup

1. Get **GitHub Organization Access Token** from [icqqjs](https://github.com/icqqjs).
2. Set scope config and token in global `.npmrc` file (such as `~/.npmrc`).

> Please replace `<ICQQ_GITHUB_TOKEN>` with your token.

```shell
echo "@icqqjs:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=<ICQQ_GITHUB_TOKEN>" >> ~/.npmrc
```

3. Run Chatee

```tsx
npx chatee
// or use specific env
// CHATEE_SIGN_API=<SIGN_API> CHATEE_PLATFORM=<PLATFORM> CHATEE_UIN=<UIN> npx chatee
```

## Usage

- Press `⬆️` & `⬇️` to navigate.
- Press `Tab` to return home.
- Press `Ctrl C` to exit.
- **Filter** feature at **Friends and Groups** page is supported.

## Env Description

- `CHATEE_SIGN_API`: Sign API for `icqq`
- `CHATEE_PLATFORM`: Platform for `icqq`
- `CHATEE_UIN`: Account/uin for `icqq`

## Data & Config

- Chatee Dir: `<os.homedir>/.config/chatee`
- Chatee Config: `<os.homedir>/.config/chatee/chatee.json`

## License

MIT (c) 2024 Viki
