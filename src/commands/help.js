const help = () => {
  console.log(
    `monetize-npm-cli is a CLI that helps monetize npm packages using the Web Monetization API using different providers

The following commands are listed according to thier priority order
(All Provider related commands are in capital)

--help, -h
Displays the help page that you are viewing right now

--login, -L
    --provider, -P (Defaults to coil-extension if not provided/matched)
Login into your web monetization provider.

--logout
    --provider, -P (Defaults to coil-extension if not provided/matched)
Logout from your web monetization provider.

--list, -l
    --depth (Defaults to 3)
    --expand (Default false)
Lists the number of packages installed which support web monetization.
Depth is the number of previous directories package.json will be searched for if not found in the current working directory.
Expand is used to list the names and version of pacages.

--version, -v
Returns the name and version of the package

File path given
    --provider, -P (Defaults to coil-extension if not provided/matched)
    --timeout, -T (defines how much time is spent on monetizing one package in queue. Can be ignored by provider)
    --depth (Defaults to 3)
Used to run an application while monetizing the packages it is using and providing a globalThis.monetization object to interact with

Default
Help page
`
  );
};

module.exports = help;
