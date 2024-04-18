const { app, BrowserWindow } = require("electron/main");
const find = require("find-process");
const { exec } = require("child_process");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 1024,
    autoHideMenuBar: true,
  });

  win.loadURL("http://localhost:3000/");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

const CloseHost = () => {
  find("name", "node")
    .then((processes) => {
      const reactProcess = processes.find((proc) =>
        proc.cmd.includes("react-scripts")
      );
      if (reactProcess) {
        exec(`taskkill /PID ${reactProcess.pid} /F`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Lỗi: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Lỗi: ${stderr}`);
            return;
          }
          console.log(`Quy trình có PID ${reactProcess.pid} đã được kết thúc.`);
        });
      } else {
        console.log("Không tìm thấy quy trình React.");
      }
    })
    .catch((err) => {
      console.error("Lỗi khi tìm kiếm quy trình:", err);
    });
};

app.on("window-all-closed", () => {
  CloseHost()
  if (process.platform !== "darwin") {
    CloseHost()
    app.quit();
  }
});