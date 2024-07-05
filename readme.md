# Chatee

A terminal chat app, powered by [`React`](https://react.dev/), [`ink`](https://github.com/vadimdemedes/ink), and [`icqq`](https://github.com/icqqjs/icqq) (private repo, join [icqqjs](https://github.com/icqqjs) org first to use it).

## Usage

1. Get **GitHub Organization Access Token** from [icqqjs](https://github.com/icqqjs).
2. Set token in `.npmrc` file via following command.

> Please replace `<ICQQ_GITHUB_TOKEN>` with your token.

```shell
echo "//npm.pkg.github.com/:_authToken=<ICQQ_GITHUB_TOKEN>" >> .npmrc
```

3. Run Chatee

```tsx
npx chatee
// or use specific env
// CHATEE_SIGN_API=<SIGN_API> CHATEE_PLATFORM=<PLATFORM> CHATEE_UIN=<UIN> npx chatee
```

## Env Description

- `CHATEE_SIGN_API`: Sign API for `icqq`
- `CHATEE_PLATFORM`: Platform for `icqq`
- `CHATEE_UIN`: Account/uin for `icqq`

## License

MIT (c) 2024 Viki
