# typescript-module-alias

This is a library that can automatically find and execute corresponding modules according to alias path alias in tsconfig.json

## Install

install with npm:
```
npm install --save-dev typescript-module-alias
```

install with yarn:
```
yarn add typescript-module-alias -dev
```

## Quickstart

### on command line
```
npx typescript-module-alias ./test/a.ts
```

### package.json scripts
```
  "scripts": {
    "dev": "typescript-module-alias ./test/a.ts"
  }
```

## Example
- tsconfig.json
```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "lib": [
      "es5",
      "es2015",
      "es2017"
    ],
    "baseUrl": "./",
    "paths": {
      "@test/*": ["./test/*"]
    }
  }
}
```
- module test/a.ts
```ts
  import b from '@test/b';
  console.log('module a run success !!!', b);
```

- module test/b.ts
```ts
  console.log('module b run success !!!');
  export default 1;
```
