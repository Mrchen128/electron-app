import {app,Tray,Menu} from "electron";
import path from "path";
import {win} from "./createWindow"
import {trayIconUrl,isDevelopment} from "./config.js"


let tray=null;
function createTray(){
    if(isDevelopment){
        tray = new Tray(path.join(trayIconUrl,'../public/qie.jpg')); //使用png格式
      }else{
        tray = new Tray(path.join(trayIconUrl,'qie.jpg')); //使用png格式    
      }
      //   //系统托盘图标闪烁
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
            app.exit()
          }
        }
      ]);
      tray.setToolTip("This is my application.");
      tray.setContextMenu(contextMenu);
    
      tray.on("click", () => {
        win.isVisible() ? win.hide() : win.show();
      });
  
}
export {createTray,tray}