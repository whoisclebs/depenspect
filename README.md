# Depenspect

[![Node.js Package](https://github.com/whoisclebs/depenspect/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/whoisclebs/depenspect/actions/workflows/npm-publish.yml)
[![npm](https://img.shields.io/npm/v/depenspect)](https://www.npmjs.com/package/depenspect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Depenspect inspects npm package metadata and returns the versions that were marked as deprecated in the npm registry.

## Table of Contents

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development](#development)
- [Publishing](#publishing)
- [License](#license)

## About The Project

Use Depenspect when you need to check whether older versions of a package have deprecation notices. It supports regular and scoped npm package names.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install depenspect
```

GitHub Packages is also supported under the scoped package name:

```bash
npm install @whoisclebs/depenspect --registry=https://npm.pkg.github.com
```

## Usage

```ts
import { getAllDeprecated } from 'depenspect'

const deprecatedVersions = await getAllDeprecated('left-pad')

console.log(deprecatedVersions)
// [{ version: '1.1.0', info: 'use 2.0.0' }]
```

Registry lookup helpers are also exported:

```ts
import { getRegisterUrl } from 'depenspect'

const registryUrl = getRegisterUrl('@my-scope')
```

## Development

```bash
npm ci
npm test
npm run lint
npm run build
```

The package is built with `tsup` and emits CommonJS output plus TypeScript declarations in `dist/`.

## Publishing

Publishing runs from GitHub releases. The workflow publishes:

- `depenspect` to npm with `NPM_TOKEN`
- `@whoisclebs/depenspect` to GitHub Packages with `GITHUB_TOKEN`

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
