/** @format */

const { ipcMain } = require("electron");
const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindows;
let addWindows;

app.on("ready", () => {
  mainWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindows.loadURL(`file://${__dirname}/main.html`);
  mainWindows.on("closed", () => app.quit());
  const mainManu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainManu);
});

const createAddWindow = () => {
  addWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 300,
    height: 200,
    title: "Add New Todo",
  });
  addWindows.loadURL(`file://${__dirname}/add.html`);
  //   addWindows.setMenu(null);
};

ipcMain.on("todo:add", (event, todo) => {
  mainWindows.webContents.send("todo:add", todo);
  addWindows.close();
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

if (process.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      {
        label: "Toggle Developer Tools",
        accelerator: process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
