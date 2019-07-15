import {ipcMain,Menu,MenuItem,BrowserWindow} from "electron";
import {tray} from "./tray";
import {trayIconUrl,isDevelopment} from "./config";
import {win} from "./createWindow";
import path from "path";
let T;

ipcMain.on('getmessage',(event)=>{
    var count = 0;
    if(!win.isVisible()){
        if(!T){
          T = setInterval(function() {
              count++;
              if (count%2 == 0) {
                if(isDevelopment){
                  tray.setImage(path.join(trayIconUrl, '../public/logo.png'))
                }else{
                   tray.setImage(path.join(trayIconUrl, 'logo.png'))
                }
               
              } else {
                if(isDevelopment){
                  tray.setImage(path.join(trayIconUrl, '../public/qie.png'))
                }else{
                   tray.setImage(path.join(trayIconUrl, 'qie.jpg'))
                }
               
              }
          }, 500);
        }
      }
  })


ipcMain.on("ondragstart", (event, filePath) => {
    event.sender.startDrag({
      file: filePath,
      icon: "/path/to/icon.png"
    });
});


ipcMain.on('signShowRightClickMenu', (event) => {
  // 生成菜单
  console.log(11122)
  const menu = new Menu();
  menu.append(new MenuItem({label:'复制', role: 'copy' }));
  menu.append(new MenuItem({label:'粘贴', role: 'paste' }));
  menu.append(new MenuItem({label:'剪切', role: 'cut' ,  submenu: [
    {
        label: '男',
        type: 'radio'
    },
    {
        label: '女',
        type: 'radio'
    },
]}));
  menu.append(new MenuItem({ label:'全选', role: 'selectall' }));

  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup(win);
});
  