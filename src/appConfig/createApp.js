import {app,protocol} from "electron";
import { installVueDevtools } from "vue-cli-plugin-electron-builder/lib";
import {createWindow,win} from "./createWindow";
import {createTray} from "./tray";
import {isDevelopment} from "./config"


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

app.on("ready", async () => {

    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installVueDevtools();
      } catch (e) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
    }
    createTray();
    
    createWindow();
  });
  
  
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
  