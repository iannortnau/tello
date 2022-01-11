import { app , ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const isProd = process.env.NODE_ENV === 'production';
import { spawn , exec } from "child_process";
import * as fs from "fs";

let mainWindow = null;

let p1 = null;

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  mainWindow = createWindow('main', {
    width: 960,
    height: 540,
    minHeight:540,
    maxHeight:540,
    maxWidth:960,
    minWidth:960,
    resizable:false,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    //mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  if(p1){
    p1.kill();
  }
  app.quit();
});

ipcMain.on('reload', (event, msg) => {
  mainWindow.reload();
});

/*
let auxFfmpeg = null;
ipcMain.on('decode', (event, msg) => {
  if (msg === "run") {
    p1 = exec('gst-launch-1.0 -v udpsrc port=11111 ! decodebin ! videoconvert ! autovideosink');

    p1.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    p1.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  }
  if (msg === "kill") {
    p1.kill();
  }
  event.reply('decode-resp', 'pong');
});
*/