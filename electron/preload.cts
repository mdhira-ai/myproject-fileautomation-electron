import { contextBridge, ipcRenderer } from "electron";

// Expose a safe, minimal API to the renderer process here.
// Example:
// contextBridge.exposeInMainWorld('electronAPI', {
//   getVersion: () => process.versions.electron,
// });

contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  checkfiles: () => ipcRenderer.invoke("checkfiles"),
  changeDir: (data: any) => ipcRenderer.invoke("changeDir", data),
  check_file_size: (data: any) => ipcRenderer.invoke("filesize", data),
  
});
