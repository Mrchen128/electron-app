"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  Tray
} from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
import path from "path";
const isDevelopment = process.env.NODE_ENV !== "production";
let win;
let tray = null;

ipcMain.on("ondragstart", (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: "/path/to/icon.png"
  });
});
let trayIcon = path.join(__dirname, "../src/tray"); //app是选取的目录
let T;
ipcMain.on('getmessage',(event)=>{
  var count = 0;
  if(!T){
    T = setInterval(function() {
        count++;
        if (count%2 == 0) {
          tray.setImage(path.join(trayIcon, 'logo.png'))
        } else {
          tray.setImage(path.join(trayIcon, 'qie.jpg'))
        }
    }, 500);
 }
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      secure: true,
      standard: true
    }
  }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
    // icon: `${__static}/fengjing.ico`
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

 
  win.on("close", e => {
    e.preventDefault(); //阻止默认行为，一定要有
    dialog.showMessageBox(
      {
        type: "info",
        title: "Information",
        defaultId: 0,
        message: "确定要关闭吗？",
        buttons: ["最小化", "直接退出"]
      },
      index => {
        if (index === 0) {
          // win.minimize();	//调用 最小化实例方法
          win.hide(); //窗口隐藏；
        } else {
          win = null;
          // app.quit();	//不要用quit();试了会弹两次
          app.exit(); //exit()直接关闭客户端，不会执行quit();
        }
      }
    );
  });
  win.on("show",function(){
    console.log(11)
     clearInterval(T)
     T=null;
  })
  win.on('restore',function(){
    console.log(22)

    clearInterval(T);
    T=null;

  })
  createMenu();
}

function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === "darwin") {
    const template = [
      {
        label: "App Demo",
        submenu: [
          {
            role: "about"
          },
          {
            role: "quit"
          }
        ]
      }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null);
  }
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd  Q
  if (process.platform !== "darwin") {
    //  app.quit()
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  tray = new Tray(path.join(trayIcon,'qie.jpg')); //使用png格式
    //系统托盘图标闪烁
 
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开",
      click() {
        win.show()
      }
    },
    {
      label: "退出",
      click() {
        app.quit()
      }
    }
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });
    createWindow();
});



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
