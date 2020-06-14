# monetize-npm-cli

`monetize-npm-cli` is a modular CLI that helps monetize npm packages using the Web Monetization API and different providers.

---

# Install

```bash
npm install -g monetize-npm-cli
```

---

# Usage

## Run file

To run your app while monetizing the supported npm packages

```bash
monetize-npm-cli yourFile.js
```

---

## Help

To view help page with all details

```bash
monetize-npm-cli --help
```

---

## Login to your Provider

To login to your web monetization provider

```bash
monetize-npm-cli --login
```

This will default to coil-extension if no provider is provided. See help for more details.

---

## Logout from your Provider

To logout from your web monetization provider

```bash
monetize-npm-cli --logout
```

This will default to coil-extension if no provider is provided. See help for more details.

---

## List packages

To list all packages supporting web monetization

```bash
monetize-npm-cli --list
```

---

Use help to get full list of supported commands

---

# API

The aim of this CLI is to mimic the web monetization API given [here](https://webmonetization.org/docs/api) as much as it could.
Instead of `document.monetization`, user gets `globalThis.monetization`.

`globalThis.monetization` itself is a proxy of an object which contains all the information and is not accessible globally.

## Exposed Methods

### getState

`document.monetization.state` => `globalThis.monetization.getState(name, version)`
`name` and `version` are defined in `package.json` of each package.

### addEventListener

There can be four listeners set up `monetizationpending`, `monetizationstart`, `monetizationstop`, `monetizationprogress`.
Let identify them by listenerIdentifier.

`document.monetization.addEventListener(listenerIdentifier, foo)` => `globalThis.monetization.addEventListener(name, version, listenerIdentifier, foo)`

### removeEventListener

`globalThis.monetization.removeEventListener(name, version, listenerIdentifier, foo)`
If foo is not passed, all the listeners for that package are removed.

---

Currently only coil-extension is supported as a provider. You read more about it [here](https://github.com/projectescape/wrapper-coil-extension#api)

---

# Add Support for web monetization to Packages

For packages to support web monetization, they must add a webMonetization key in thier package.json file

```json
{
  "webMonetization": {
    "wallet": "$yourWalletAddressGoesHere"
  }
}
```

---

# Providers

This app currently comes with only `coil-extension` provider as its the only provider existing right now, but support for more can be easily added as this CLI has been made keeping modularity in mind.

## Create a provider module

To create a provider module compatible with this CLI, it must have 3 exposed methods.

1. `login()`
1. `logout()`
1. `monetize(monetizationPackages[,timeout])`

### monetizationPackages

`monetizationPackages` is a proxy object passed to a provider module to start monetization

```javascript
// monetizationPackages
{
    packages:[
        {
          name: "",
          version: "",
          webMonetization: {
              wallet:""
          },
          state: "",
        //   These arrays contain event listeners
          monetizationpending: [],
          monetizationstart: [],
          monetizationstop: [],
          monetizationprogress: [],
        }
    ],
    invokeListener(data){
        // data is the response argument received when any event is fired
        // monetizationpending || monetizationstart || monetizationstop || monetizationprogress
        // Pass args as an array
    }
}
```

Create an issue on this repo to add support for your provider module.
