const { contextBridge, shell, ipcRenderer: ipc } = require("electron");
const childProcess = require("child_process");

function shellCall(/** @type {string[]} */ [command, ...args]) {
  return new Promise((resolve, reject) => {
    childProcess.execFile(command, args, function (err, stdout, stderr) {
      if (err && err.code) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

/** @type {Record<string, string>} */
let pathCache = {};

/** @type {Record<string, string>} */
let iconCache = {};

const bridge = {
  async search(/** @type {string} */ query) {
    let path = pathCache[query];
    if (!path) {
      path = (
        await shellCall([
          "bash",
          "-c",
          `mdfind 'kind:application' -name '${query.replace(
            "'",
            "",
          )}' | head -1`,
        ])
      ).trim();
      pathCache[query] = path;
    }
    if (path.length === 0) {
      return undefined;
    }

    let url = iconCache[path];
    if (url === undefined) {
      let iconBuffer = await ipc.invoke("getFileIcon", path);
      let blob = new Blob([iconBuffer], { type: "image/png" });
      url = URL.createObjectURL(blob);
      iconCache[path] = url;
    }
    return { path, iconUrl: url };
  },
  async open(/** @type {string} */ path) {
    shell.openPath(path);
  },
};

contextBridge.exposeInMainWorld("bridge", bridge);

module.exports = { bridge };
