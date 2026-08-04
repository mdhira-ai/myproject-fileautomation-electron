import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { Getfiles } from "./mylib/getfiles.cjs";

const isDev = !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },

    autoHideMenuBar: true,
  });

  if (isDev) {
    // Vite dev server URL (matches the port in vite.config.ts / npm run dev)
    mainWindow.loadURL("http://localhost:5173");
    // mainWindow.webContents.openDevTools();
  } else {
    // Load the built renderer files
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("checkfiles", async () => {
  return Getfiles.create();
});

ipcMain.handle("changeDir", async (_event, folderName) => {
  return Getfiles.change_dir(folderName);
});
