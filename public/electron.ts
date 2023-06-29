const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        },
        width: 1200,
        height: 700,
        minWidth: 1200,
        minHeight: 700
    })
    // win.loadURL("http://localhost:5173")
    win.loadFile(path.join(__dirname, "../dist/index.html"))
    
}

app.whenReady().then(() => {
    createWindow()
})