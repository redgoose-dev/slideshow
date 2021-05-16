const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const dev = process.argv[2] === '--dev';
let win = null;

// create window
function createWindow ()
{
  let settings = {
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      devTools: dev,
    },
  };
  win = new BrowserWindow(settings);
  win.loadFile('docs/index.html');
  createMainMenu();
  win.on('closed', () => { win = null; });
}

// create main menu
function createMainMenu()
{
  const mac = process.platform === 'darwin';
  let tree = [
    {
      label: 'Menu',
      submenu: [
        { role: 'about' },
        mac && { role: 'close' },
        { role: 'quit' },
      ].filter(Boolean),
    },
    {
      label: 'Navigator',
      submenu: [
        { role: 'reload' },
        dev && { role: 'forceReload' },
        { role: 'togglefullscreen' },
      ].filter(Boolean),
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
      ],
    },
  ];
  let menu = Menu.buildFromTemplate(tree);
  Menu.setApplicationMenu(menu);
}

// disabled security warnings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

// app events
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', () => {
  if (win) return;
  createWindow();
});
