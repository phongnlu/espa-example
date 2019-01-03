# ESPA example

Example of a typical ESPA webapp

## Requirements

- nodejs >= 6
- npm >= 3
- git

## Installation

```cmd
> npm i (from root directory)
```

## Usage

```cmd
> npm run dev 
```
- Go to http://localhost:8888/src/build/myapp

## Unit test, Code coverage

```cmd
> npm run test {product} (from root directory)
> Ex: npm run test myapp 
```

## Build

```cmd
> npm run build {product} {release_version} (from root directory)
> Ex: npm run build myapp 1.0.0
```
- Then you can find the final bundles inside dist folder