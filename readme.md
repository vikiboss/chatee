# Chatee

Terminal chat.

## Usage

1. Get Token from [icqqjs](https://github.com/icqqjs)
2. Set Token in `.npmrc` file

> Please replace `<ICQQ_GITHUB_TOKEN>` with your token.

```shell
echo "//npm.pkg.github.com/:_authToken=<ICQQ_GITHUB_TOKEN>" >> .npmrc
```

3. Run Chatee

```tsx
npx chatee
// or 
// CHATEE_SIGN_API=<SIGN_API> CHATEE_PLATFORM=<PLATFORM> CHATEE_UIN=<UIN> npx chatee
```

## Env

- `CHATEE_SIGN_API`: Sign API for `icqq`
- `CHATEE_PLATFORM`: Platform for `icqq`
- `CHATEE_UIN`: Uin/ACcount for `icqq`
