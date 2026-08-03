"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose a safe, minimal API to the renderer process here.
// Example:
// contextBridge.exposeInMainWorld('electronAPI', {
//   getVersion: () => process.versions.electron,
// });
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    platform: process.platform,
});
