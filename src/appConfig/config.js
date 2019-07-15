import path from "path";
let trayIconUrl = path.join(__dirname);//托盘图标的根路径
const isDevelopment = process.env.NODE_ENV !== "production";

export {trayIconUrl,isDevelopment}