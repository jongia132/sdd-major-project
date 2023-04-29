const { app, BrowserWindow } = require('electron')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts')
        },
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600
    })

    win.loadURL("http://localhost:5173")
    
}
app.whenReady().then(() => {
    createWindow()
})