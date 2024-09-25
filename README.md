# **seon-sdk**

This module provides a TypeScript class, Seon, to interact with Seon's Fraud API. The Seon class allows you to send fraud detection requests using the provided API key and endpoint URL.

https://docs.seon.io/api-reference/fraud-api

## Installation

You can install the package using **npm**, **yarn**, or **pnpm**.

```bash
pnpm add seon-sdk

yarn install seon-sdk

npm install seon-sdk
```

## Usage

```tsx
import { Seon, FraudApiRequest, FraudApiResponse } from "seon-sdk";

const seon = new Seon(process.env.SEON_KEY, process.env.SEON_URL);

const request: FraudApiRequest = { /* PARAMETERS */ };

const response: FraudApiResponse = await seon.fraud(request);

console.log(response);
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/seon-sdk
