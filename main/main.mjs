import { app, BrowserWindow, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    //win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("save-sheet", async (event, sheet) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Salvar ficha de RPG",
      defaultPath: `ficha-${sheet.name || "personagem"}.json`,
      filters: [{ name: "JSON", extensions: ["json"] }],
    });
    if (canceled || !filePath) return { success: false };
    fs.writeFileSync(filePath, JSON.stringify(sheet, null, 2), "utf-8");
    return { success: true, path: filePath };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
