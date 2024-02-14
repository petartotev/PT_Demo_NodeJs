# PT_Demo_NodeJs

PT_Demo_NodeJsWebApiWithLes is a simple Node.js Web API using 'express' and 'sqlite' libraries.
<br>It was inspired by the Les Jackson's YouTube video [3 Frameworks / 3 APIs - Step by Step Builds](https://www.youtube.com/watch?v=Zo70w5ds0-w).

## Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Links](#links)

## Prerequisites

1. On Windows, make sure you have `Ubuntu` installed.

💡 In case you don't, download it from [here](https://ubuntu.com/desktop/wsl).

2. In `Ubuntu` terminal, make sure you have `NVM (Node Version Manager)` installed:
```
nvm -v
```

💡 If you don't, install it in `Ubuntu`:
```
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.nvm/nvm.sh
nvm -v
    0.39.7
```

3. Check the `node.js` versions installed using `nvm` command in `Ubuntu`.

💡 In case you need the LTS, go to https://nodejs.org/en to check the version and install it as follows in `Ubuntu`:

```
nvm ls
    ->       system
    iojs -> N/A (default)
    node -> stable (-> N/A) (default)
    unstable -> N/A (default)

nvm install 20.11.0
    Downloading and installing node v20.11.0...
    Downloading https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz...
    ####################################################################################    ####################################################################################    ############################################################## 100.0%
    Computing checksum with sha256sum
    Checksums matched!
    Now using node v20.11.0 (npm v10.2.4)
    Creating default alias: default -> 20.11.0 (-> v20.11.0)

nvm ls
    ->     v20.11.0
             system
    default -> 20.11.0 (-> v20.11.0)
    iojs -> N/A (default)
    unstable -> N/A (default)
    node -> stable (-> v20.11.0) (default)
    stable -> 20.11 (-> v20.11.0) (default)
    lts/* -> lts/iron (-> v20.11.0)
    lts/argon -> v4.9.1 (-> N/A)
    lts/boron -> v6.17.1 (-> N/A)
    lts/carbon -> v8.17.0 (-> N/A)
    lts/dubnium -> v10.24.1 (-> N/A)
    lts/erbium -> v12.22.12 (-> N/A)
    lts/fermium -> v14.21.3 (-> N/A)
    lts/gallium -> v16.20.2 (-> N/A)
    lts/hydrogen -> v18.19.0 (-> N/A)
    lts/iron -> v20.11.0
```

💡 You can also check the `node.js` version in `Ubuntu` using:

```
node -v
    v20.11.0
```

4. In `Ubuntu`, make sure you have `NPM (Node Package Manager)` installed:

```
npm --version
    9.8.1
```

💡 In case you don't, you can use `nvm` to install `npm` in `Ubuntu`:

```
nvm install-latest-npm
```

## Setup

1. Initialize API app:

```
cd src
npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
See `npm help init` for definitive documentation on these fields
and exactly what they do.
Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (src) node-api
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\Projects\PT_Demo_NodeJs\src\package.json:

{
  "name": "node-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "node-api": "bin/database.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
```

This should have created a simple `package.json` file in your `src` directory.

2. In `package.json` directory, install `Express`:

```
npm install express
    added 67 packages, and audited 191 packages in 5s
    23 packages are looking for funding
      run `npm fund` for details
    found 0 vulnerabilities
```

💡 Express is a very useful library for making HTTP applications?

In `src`, new `node_modules` directory and `package-lock.json` file should have been created with those installations.

3. Create new `index.js` file in `src`:

```
const express = require('express');
const app = express();

app.get('/api/todos', (req, res) => {
    res.status(200).json('message');
});

app.listen(4000, () => {
    console.log('Server running on port 4000')
});
```

4. Run the server by running:

```
node index.js
```

5. Test the application by accessing the server on `http://localhost:4000/api/todos`

![img](./res/api-todos-endpoint.jpg)

## Links
- https://www.youtube.com/watch?v=Zo70w5ds0-w - Les Jackson's 3 Frameworks YouTube video
- https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/