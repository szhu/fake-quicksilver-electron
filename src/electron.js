if (require("electron-is-dev")) {
  const electronReload = /** @type {any} */ (require("electron-reload"));
  electronReload("src/{electron,main,preload}.js", {
    // Only use this library to exit the app, not reload.
    // The `start` script will launch the app once it stops running.
    electron: "/usr/bin/false",
    hardResetMethod: "exit",
    forceHardReset: true,
  });
}

// @ts-expect-error
require = require("esm")(module);
module.exports = require("./main.js");
