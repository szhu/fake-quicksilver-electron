import electron from "electron";
import isDev from "electron-is-dev";
import "esm";
import fileIcon from "file-icon";
import { dirname, join } from "path";

if (isDev) __dirname = dirname(new URL(import.meta.url).pathname);

const { app, BrowserWindow, globalShortcut, ipcMain: ipc } = electron;
/** @typedef { electron.BrowserWindow} BrowserWindow */

let /** @type {BrowserWindow} */ mainWindow;

function createWindow() {
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 700,
    height: 160,
    resizable: false,

    // alwaysOnTop: true,
    frame: false,
    show: false,
    transparent: true,

    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
    },
  })

    .addListener("ready-to-show", () => {
      if (isDev) {
        mainWindow.show();
      }
    })
    .addListener("blur", () => {
      if (isDev) return;

      mainWindow.hide();
    })
    .addListener("closed", () => {
      mainWindow = null;
    });

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${join(__dirname, "../build/index.html")}`,
  );
}

app.addListener("ready", () => {
  createWindow();

  app.addListener("activate", () => {
    if (mainWindow === null) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });

  globalShortcut.register("Alt+Space", () => {
    if (mainWindow === null) {
      createWindow();
    } else if (mainWindow.isFocused()) {
      mainWindow.hide();
      app.hide();
    } else {
      mainWindow.show();
    }
  });
});

if (process.platform !== "darwin") {
  app
    //
    .addListener("window-all-closed", () => {
      app.quit();
    });
}

ipc.handle("getFileIcon", async (_event, path) => {
  console.log("getFileIcon", JSON.stringify(path));
  return await fileIcon.buffer(path, { size: 128 });
});
