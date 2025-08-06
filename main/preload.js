const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
  saveSheet: (sheet) => ipcRenderer.invoke("save-sheet", sheet),
  listarFichas: () => ipcRenderer.invoke('listar-fichas')
});