import { app , ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const isProd = process.env.NODE_ENV === 'production';
import { spawn , exec } from "child_process";
import * as fs from "fs";

let p1 = null;
let p2 = null;

//exec("ffmpeg -re -i udp://0.0.0.0:11111 -c copy -r 30 -b 800k -f flv rtmp://localhost/live/tello");
//exec("ffplay -i udp://0.0.0.0:11111 -fflags nobuffer -fflags discardcorrupt -flags low_delay -framedrop -avioflags direct -f hls -hls_time 4 -hls_playlist_type event ./stream/stream.m3u8");
//ffmpeg -re -i udp://0.0.0.0:11111 -fflags nobuffer -flags low_delay ./stream/stream.m3u8
//ffmpeg -re -i udp://0.0.0.0:11111 -fflags nobuffer -flags low_delay -f hls -hls_time 4 -hls_playlist_type event ./render/public/stream.m3u8 || ffplay ./stream/stream.m3u8
if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  //p1.kill();
  app.quit();
});

let auxFfmpeg = null;
ipcMain.on('decode', (event, msg) => {

  if (msg === "run") {
    p1 = exec('ffmpeg -i udp://0.0.0.0:11111 -f sdl "Tello"');

    p1.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    p1.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  }
  if (msg === "kill") {
    //p1.stop();
  }
  event.reply('decode-resp', 'pong');
});
