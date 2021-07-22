import { app, BrowserWindow,Menu } from 'electron'
import '../renderer/store'


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const cluburl = process.env.NODE_ENV === 'development'
?`http://localhost:9080/#/clubManager`
: ``
const prourl = process.env.NODE_ENV === 'development'
?`http://localhost:9080/#/product`
:``
const turnoverurl = process.env.NODE_ENV === 'development'
?`http://localhost:9080/#/turnover`
:``
const accountManagerurl = process.env.NODE_ENV === 'development'
?`http://localhost:9080/#/accountManager`
:``
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const template = [
  {
      label:'文件',
      submenu:[
          {
              label:'关于',
              role:'about'
          },
          {
              type:'separator'
          },
          {
              label:'关闭',
              accelerator:'Command+Q',
              click:()=>{
                mainWindow.close();
              }
          }
      ]
  },
  {
      label:'编辑',
      submenu:[
          {
              label:'会员管理',
              click:()=>{
                mainWindow.loadURL(cluburl)
              }
          },
          {
              label:'商品管理',
              click:()=>{
                  mainWindow.loadURL(prourl)
              }
          },
          {
              type:'separator'
          },
          {
              label:'营业额',
              accelerator:'Command+F',
              click:()=>{
                  mainWindow.loadURL(turnoverurl)
              }
          },
          {
              label:'账号管理',
              accelerator:'Command+R',
              click:()=>{
                 mainWindow.loadURL(accountManagerurl)
              }
          }

      ]
  }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
