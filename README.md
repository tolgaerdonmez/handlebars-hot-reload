# Welcome to handlebars-hot-reload 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/tolgaerdonmez/handlebars-hot-reload#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/tolgaerdonmez/handlebars-hot-reload/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/tolgaerdonmez/handlebars-hot-reload)](https://github.com/tolgaerdonmez/handlebars-hot-reload/blob/master/LICENSE)
[![Twitter: tolgaerdonmez](https://img.shields.io/twitter/follow/tolgaerdonmez.svg?style=social)](https://twitter.com/tolgaerdonmez)

## Description

This CLI aims to render handlebar templates with hot reload functionality for ease of development of handlebar templates.

## Installation

```shell
npm install --global handlebars-hot-reload
```

or

```shell
yarn global add handlebars-hot-reload
```

## Usage

```shell
Usage: handlebars-hot-reload -t <template path> -j <json data path> -o <output path> -s <save output>

Options:
      --help          Show help                                        [boolean]
      --version       Show version number                              [boolean]
  -t, --templatePath  Template path you want to render       [string] [required]
  -j, --dataPath      JSON data to be injected into handlebar template, if this
                      is not given it will search for e.g example.hbs ->
                      example.json                                      [string]
  -p, --port          HTTP Port you want to serve the file              [number]
  -o, --outputPath    Save the created html output to given path        [string]
  -s, --saveOutput    Whether to save the created html output to the same
                      directory as the template, this will override the -o /
                      --outputPath option             [boolean] [default: false]
```

## Author

👤 **Tolga Erdönmez**

- My Startup: [tidible.app](https://tidible.app)
- Twitter: [@tolgaerdonmez](https://twitter.com/tolgaerdonmez)
- Github: [@tolgaerdonmez](https://github.com/tolgaerdonmez)
- LinkedIn: [@tolgaerdonmez](https://linkedin.com/in/tolgaerdonmez)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Tolga Erdönmez](https://github.com/tolgaerdonmez).

This project is [MIT](https://github.com/tolgaerdonmez/handlebars-hot-reload/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
