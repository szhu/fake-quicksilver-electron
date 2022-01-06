# Fake Quicksilver

| ![App screenshot, dark mode][] | ![App screenshot, light mode][] |
| :----------------------------: | :-----------------------------: |
|              Dark              |              Light              |

[App screenshot, dark mode]: docs/screenshot-2022-01-06-v1-dark.jpg
[App screenshot, light mode]: docs/screenshot-2022-01-06-v1-light.jpg

This is a simple search-based app launcher, inspired by the [Nostromo interface](https://github.com/quicksilver/Nostromo) for the macOS launcher app [Quicksilver](https://qsapp.com/).

I'm currently learning [Electron][], and I made this app for practice. The interface is polished, but the actual search mechanism is slow.

[Electron]: https://www.electronjs.org/

## Usage

![App usage screen recording](docs/screenshot-2022-01-06-v1-demo.gif)

When the app is first opened, it'll stay running in the background.

**To search:** Open the app again, or press Option-Space. To search for an app, quickly type your search query at the prompt. After 0.5 seconds of no input, the search will be executed.

**To clear the search:** Press Backspace.

**To quit the app:** Press Cmd-Q while the search prompt is visible.

## Development

The app has two components, the Electron app and the React app that runs in the Electron browser window. To start both in development mode: `yarn start`

Alternatively, run `yarn start:parcel` and `yarn start:electron` in separate terminals.

The frontend of the app should work on all platforms, but the actual search uses Spotlight (via `mdfind`) and so will only work on macOS.

To build for macOS: `yarn build --mac`

To build for all platforms: `yarn build:all`

## Credits

Web app stack: [React](https://reactjs.org/), [Parcel](https://parceljs.org/), [Typescript](https://www.typescriptlang.org/), [Emotion](https://emotion.sh/)

App stack: [Electron](https://electronjs.org/), [electron-builder](https://www.electron.build/)

Template used: [kumarryogeshh/electron-react-parcel-boilerplate](https://github.com/kumarryogeshh/electron-react-parcel-boilerplate)
