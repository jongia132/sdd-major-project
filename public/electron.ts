const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
            webviewTag: true
        },
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600
    })
    win.loadURL("http://localhost:5173")
    // win.loadFile(path.join(__dirname, "../dist/index.html"))
    
}

app.whenReady().then(() => {
    createWindow()
})