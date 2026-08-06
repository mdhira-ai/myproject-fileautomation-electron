"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose a safe, minimal API to the renderer process here.
// Example:
// contextBridge.exposeInMainWorld('electronAPI', {
//   getVersion: () => process.versions.electron,
// });
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    platform: process.platform,
    checkfiles: () => electron_1.ipcRenderer.invoke("checkfiles"),
    changeDir: (data) => electron_1.ipcRenderer.invoke("changeDir", data),
    check_file_size: (data) => electron_1.ipcRenderer.invoke("filesize", data),
});
