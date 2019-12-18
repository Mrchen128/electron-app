import { BrowserWindow, dialog, Menu, app } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { T } from "./ipcMain";

let win = null;
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  // if (process.platform === "darwin") {
  const template = [
    {
      label: "关于",
      submenu: [
        {
          role: "about",
          label: "关于",
          click() {
            console.log("about");
          }
        },
        {
          role: "quit",
          label: "退出"
        }
      ]
    }
  ];
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  // } else {
  //   // windows及linux系统
  //   Menu.setApplicationMenu(null);
  // }
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
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
  win.on("show", function() {
    clearInterval(T);

    console.log("show");
  }); //窗口从隐藏出现事件
  win.on("restore", function() {
    clearInterval(T);

    console.log("restore");
  }); //窗口从最小化到最大化事件

  createMenu(); //生成菜单
}

export { createWindow, win };
