/** @format */
const electron = require("electron");
const { ipcRenderer } = require("electron/renderer");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const { value } = document.querySelector("textarea");
  ipcRenderer.send("todo:add", value);
});
