const { app, shell } = require('electron');
const images = require('./images');
const { spawn } = require('child_process');

/**
 * Retrieves main browser window menu
 * @param {Electron.BrowserWindow} mainWindow 
 */
module.exports = (mainWindow) => {
    let name = app.getName();

    const template = [
        {
            label: 'Effects',
            submenu: [
                { label: 'Default', click: () => sendEffect(mainWindow, 'default') },
                { label: 'Ascii', click: () => sendEffect(mainWindow, 'ascii') },
                { label: 'Daltonize', click: () => sendEffect(mainWindow, 'daltonize') },
                { label: 'Sketch', click: () => sendEffect(mainWindow, 'sketch') }
            ]
        },
        {
            label: 'View',
            submenu: [{
                label: 'Saved Photos',
                click: () => openDir(images.getPath(app))

            }]
        }
    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });
        template.push({ role: 'windowMenu' });
        template.push({ role: 'help', submenu: [] });
    }
    return template;
}

function sendEffect(mainWindow, effectName) {
    mainWindow.webContents.send('effect-chosen', effectName);
}

function openDir(path) {
    let cmd = openCmd[process.platform];
    if (cmd) spawn(cmd, [path]);
    else shell.showItemInFolder(path);
}

const openCmd = {
    darwin: 'open',
    win32: 'explorer',
    linus: 'nautilus'
}