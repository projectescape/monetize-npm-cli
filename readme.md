# monetize-npm-cli

`monetize-npm-cli` is a modular CLI that helps monetize npm packages using the Web Monetization API and different providers.

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

# Supported Packages

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

This app currently comes with only `coil-extension` provider

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
    invokeListener(i,listener){
        // i is the index of package
        // listener is the name of listeners to invoke
        // monetizationpending || monetizationstart || monetizationstop || monetizationprogress
    }
}
```

Create an issue on this repo to add support for your provider module.
