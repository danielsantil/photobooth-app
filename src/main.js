const electron = require('electron');
const { app, BrowserWindow, ipcMain: ipc, Menu } = electron;
const images = require('./images');
const menu = require('./menu');

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 893,
        height: 725,
        resizable: false,
        show: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    let appMenu = Menu.buildFromTemplate(menu(mainWindow));
    Menu.setApplicationMenu(appMenu);
});

ipc.on('save-image', (e, args) => {
    let path = images.getPath(app);
    images.save(path, args[0], args[1], savedImage => { e.sender.send('image-saved', savedImage); });
});