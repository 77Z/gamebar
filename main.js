const {app, BrowserWindow, globalShortcut, Menu, Tray} = require("electron");
const path = require('path');
const icoPath = path.join(__dirname, 'basetexture.png')

const trayTemplate = [
    {
        label: "Exit Gamebar",
        click() {
            app.quit();
        }
    }
]

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', function() {
        mainWindow = null
    })

    mainWindow.webContents.openDevTools()

    globalShortcut.register("CmdOrCtrl+Shift+Alt+G", () => {
        console.log("Shortcut pressed!");
        gamebar = new BrowserWindow({
            width: 1920,
            height: 1080,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            fullscreen: true,
            transparent: true,
            skipTaskbar: true
        })
        gamebar.loadURL(`file://${__dirname}/gbar.html`);
        gamebar.on('closed', function() {
            gamebar = null
        })
        //gamebar.webContents.openDevTools()
    })
}

function createOnlyInstance() {

    tray = new Tray(icoPath);

    const trayContextMenu = Menu.buildFromTemplate(trayTemplate);
    tray.setContextMenu(trayContextMenu);

    globalShortcut.register("CmdOrCtrl+Shift+Alt+G", () => {
        console.log("Shortcut pressed!");
        gamebar = new BrowserWindow({
            width: 1920,
            height: 1080,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            fullscreen: true,
            transparent: true,
            skipTaskbar: true
        })
        gamebar.loadURL(`file://${__dirname}/gbar.html`);
        gamebar.on('closed', function() {
            gamebar = null
        })
        //gamebar.webContents.openDevTools()
    })
}
app.on('ready', createWindow);

//app.on('window-all-closed', function() {
//    if (process.platform !== 'darwin') {
//        app.quit();
//    }
//})

//app.on('activate', function() {
//    if (mainWindow == null) {
//        createWindow();
//    }
//})

