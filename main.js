// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron"),
    sudo = require("sudo-prompt"),
    J5Instance = require("./resources/libs/johnnyFive/instance-program"),
    ipcMain = require("electron").ipcMain,
    childProcess = require("./resources/libs/handler-child-process"),
    chalk = require("chalk"),
    config = require("./src/utils/config"),
    path = require("path"),
    log = console.log;

let mainWindow;

function createWindow() {
    let menu = Menu.buildFromTemplate(config.createPageHelp());
    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, "src/images/blokino.png")
    });
    // and load the index.html of the app.
    mainWindow.loadFile("index.html");
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on("closed", function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        reset();
        aboutPage = null;
        mainWindow = null;
    });
}

const singleInstanceApp = app.requestSingleInstanceLock();

if (!singleInstanceApp) {
    reset();
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
    // Create myWindow, load the rest of the app, etc...
    app.on("ready", () => {});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        reset();
        app.quit(0);
    }
});

app.on("activate", function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

function reset() {
    log(chalk.black.bgYellow.bold("Cerrando instancia ..."));
    J5Instance.killnodes();
    installed = false;
}

// Instalacion de entorno
ipcMain.on("setup", (event, device) => {
    log(chalk.black.bgYellow.bold("Dispositivo para configurar: ", device));
    if (device) {
        childProcess.setupDevice(sudo, device);
        installed = true;
    }
});

// Ejecucion del codigo del entorno
ipcMain.on("execute", (event, data) => {
    log(chalk.black.bgWhite.bold("Código: \n", data.code));
    log(chalk.black.bgWhite.bold("Dispositivo: \n", data.device));
    J5Instance.killnodes();
    J5Instance.executeProgram(
        data.code,
        data.device,
        event,
        data.validate_code.variable,
        data.channel
    );
});

ipcMain.on("clean", (event, data) => {
    log(chalk.black.bgWhite.bold("Código: \n", data.code));
    log(chalk.black.bgWhite.bold("Dispositivo: \n", data.device));
    J5Instance.killnodes();
    J5Instance.cleanProgram(data.code, data.device, event);
});

ipcMain.on("kill-instances", (event, code) => {
    reset();
});
