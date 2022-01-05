const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let /** @type {BrowserWindow} */ mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 300,
    resizable: false,

    frame: false,
    show: false,
    transparent: true,
  })
    .addListener("ready-to-show", () => {
      mainWindow.show();
    })
    .addListener("closed", () => {
      mainWindow = null;
    });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  );
}

app
  //
  .addListener("ready", createWindow)
  .addListener("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

if (process.platform !== "darwin") {
  app
    //
    .addListener("window-all-closed", () => {
      app.quit();
    });
}

if (isDev) {
  const electronReload = /** @type {any} */ (require("electron-reload"));
  electronReload(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}
