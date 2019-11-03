"use strict";

/**
 * @author jorge Farfan Coaguila
 * @description Este módulo contiene las funciones para instalar Firmata en las placas Arduino, usando GORT.
 */

const serialportCommand = require("../../serial-port/serialport-commands"),
    platform = require("../../../config/platform"),
    chalk = require("chalk"),
    log = console.log,
    fs = require("fs"),
    sudo = require("sudo-prompt"),
    exec = require("child_process").exec,
    path = require("path");

let gortFirmata = {
    linux: function() {
        return {
            nodeJS: {
                path: "apt-get install nodejs"
            },
            gort: {
                x64: {
                    path: "curl -sLO https://s3.amazonaws.com/gort-io/0.9.0/gort_0.9.0_amd64.deb",
                    file: "dpkg -i gort_0.9.0_amd64.deb"
                },
                x86: {
                    path: "curl -sLO https://s3.amazonaws.com/gort-io/0.9.0/gort_0.9.0_i386.deb",
                    file: "dpkg -i gort_0.9.0_amd64.deb"
                }
            }
        };
    },
    gort: function() {
        let config_gort = this.linux().gort;
        let info = platform.infoOS();
        if (info.short_name_os === "Lin" || info.short_name_os === "mac") {
            switch (info.arch) {
                case "x86":
                    return config_gort.x86;
                    break;
                case "x64":
                    return config_gort.x64;
                    break;
                default:
                    break;
            }
        }
    },
    devices: async function(callback) {
        let devices = serialportCommand.listDevices();
        let os_arch = platform.arch();
        let devices_gort = [];
        let promise = null;
        switch (os_arch) {
            case "Linx86":
            case "Linx64":
                devices_gort = await this.deviceGortLinux();
                promise = new Promise((resolve, reject) => {
                    setTimeout(() => resolve(this.setNameDevices(devices, devices_gort)), 100);
                });
                await promise;
                break;
        }

        return callback(devices);
    },
    setNameDevices: function(devices, devices_gort) {
        devices.forEach(function(device) {
            devices_gort.forEach(function(dev) {
                if (dev.includes(device.port)) {
                    if (dev.includes("Uno")) {
                        device.name = "Arduino UNO";
                    }
                    if (dev.includes("Mega")) {
                        device.name = "Arduino MEGA";
                    }
                    if (dev.includes("ttyUSB")) {
                        device.name = "Arduino NANO";
                    }
                }
            });
        });
    },
    deviceGortLinux: function() {
        return new Promise(resolve => {
            let options = {
                name: "Electron"
            };
            sudo.exec("" + path.resolve(__dirname) + "/gort_lin_x86 scan serial", options, function(
                error,
                stdout,
                stderr
            ) {
                log(chalk.black.bgYellow.bold("Dispositivo respuesta: " + stdout));
                if (stdout !== "") {
                    log(chalk.white.bgGreen.bold("Dispositivos ", stdout));
                    resolve(
                        stdout
                            .replace("1. ", "separator")
                            .replace("2. ", "separator")
                            .replace("3. ", "separator")
                            .split("separator")
                            .filter(device => {
                                return device.toString() != "";
                            })
                    );
                }
            });
        });
    },
    deviceGortWindows: function(arch_gort) {
        return new Promise(resolve => {
            let options = {
                    name: "Electron"
                },
                lib = "";
            lib = path.join(
                path.dirname(fs.realpathSync(__filename)),
                "/gort_win_" + arch_gort + ".exe"
            );
            exec("" + lib + " scan serial", options, function(error, stdout, stderr) {
                log(chalk.black.bgYellow.bold("Dispositivo respuesta: " + stdout));
                if (stdout !== "") {
                    log(chalk.black.bgYellow.bold("Dispositivos ", stdout));
                    resolve(
                        stdout
                            .replace("1. ", "separator")
                            .replace("2. ", "separator")
                            .replace("3. ", "separator")
                            .split("separator")
                            .filter(device => {
                                return device.toString() != "";
                            })
                    );
                }
            });
        });
    },

    deviceGortLinux: function() {
        return new Promise(resolve => {
            let options = {
                name: "Electron"
            };
            sudo.exec("" + path.resolve(__dirname) + "/gort_lin_x86 scan serial", options, function(
                error,
                stdout,
                stderr
            ) {
                log(chalk.black.bgYellow.bold("Dispositivo respuesta: " + stdout));
                if (error !== "") {
                    log(chalk.white.bgGreen.bold("Dispositivos ", stdout));
                    resolve(
                        stdout
                            .replace("1. ", "separator")
                            .replace("2. ", "separator")
                            .replace("3. ", "separator")
                            .split("separator")
                            .filter(device => {
                                return device.toString() != "";
                            })
                    );
                } else {
                }
            });
        });
    },
    deviceGortWindows: function(arch_gort) {
        return new Promise(resolve => {
            let options = {
                    name: "Electron"
                },
                lib = "";
            lib = path.join(
                path.dirname(fs.realpathSync(__filename)),
                "/gort_win_" + arch_gort + ".exe"
            );
            exec("" + lib + " scan serial", options, function(error, stdout, stderr) {
                log(chalk.black.bgYellow.bold("Dispositivo respuesta: " + stdout));
                if (stdout !== "") {
                    log(chalk.black.bgYellow.bold("Dispositivos ", stdout));
                    resolve(
                        stdout
                            .replace("1. ", "separator")
                            .replace("2. ", "separator")
                            .replace("3. ", "separator")
                            .split("separator")
                            .filter(device => {
                                return device.toString() != "";
                            })
                    );
                }
            });
        });
    },
    gortSetup: function(device) {
        let lib = "",
            os_arch = platform.arch();
        let options = {
            name: "Electron"
        };

        switch (os_arch) {
            case "Linx86":
                sudo.exec(
                    "" + path.resolve(__dirname) + "/gort_lin_x86 arduino install ",
                    options,
                    function(error, stdout, stderr) {
                        if (error !== "") {
                            log(chalk.white.bgGreen.bold("FIRMATA respuesta: " + stdout));
                            log(
                                chalk.white.bgGreen.bold(
                                    "Dispositivo ",
                                    device,
                                    ": Arduino instalado."
                                )
                            );
                        } else {
                            //Se presento un error
                            log(chalk.black.bgRed.bold("FIRMATA error: " + stderr));
                        }
                    }
                );
                sudo.exec(
                    "" +
                        path.resolve(__dirname) +
                        "/gort_lin_x86 arduino upload firmata " +
                        device +
                        "",
                    options,
                    function(error, stdout, stderr) {
                        if (error !== "") {
                            log(chalk.white.bgGreen.bold("FIRMATA respuesta: " + stdout));
                            log(
                                chalk.white.bgGreen.bold(
                                    "Dispositivo ",
                                    device,
                                    ": Firmata inatalado."
                                )
                            );
                        } else {
                            //Se presento un error
                            log(chalk.black.bgRed.bold("FIRMATA error: " + stderr));
                        }
                    }
                );
                break;
            case "Linx64":
                sudo.exec(
                    "" + path.resolve(__dirname) + "/gort_lin_x64 arduino install ",
                    options,
                    function(error, stdout, stderr) {
                        if (error !== "") {
                            log(chalk.white.bgGreen.bold("ARDUINO respuesta: " + stdout));
                            log(
                                chalk.white.bgGreen.bold(
                                    "Dispositivo ",
                                    device,
                                    ": Arduino instalado."
                                )
                            );
                        } else {
                            //Se presento un error
                            log(chalk.black.bgRed.bold("ARDUINO error: " + stderr));
                        }
                    }
                );
                sudo.exec(
                    "" +
                        path.resolve(__dirname) +
                        "/gort_lin_x64 arduino upload firmata " +
                        device +
                        "",
                    options,
                    function(error, stdout, stderr) {
                        if (error !== "") {
                            log(chalk.white.bgGreen.bold("FIRMATA respuesta: " + stdout));
                            log(
                                chalk.white.bgGreen.bold(
                                    "Dispositivo ",
                                    device,
                                    ": Firmata inatalado."
                                )
                            );
                        } else {
                            //Se presento un error
                            log(chalk.black.bgRed.bold("FIRMATA error: " + stderr));
                        }
                    }
                );
                break;
            case "win32":
                lib = path.join(path.dirname(fs.realpathSync(__filename)), "/gort_win_x86.exe");
                exec("" + lib + " arduino upload firmata " + device + "", options, function(
                    error,
                    stdout,
                    stderr
                ) {
                    if (error !== "") {
                        log(chalk.white.bgGreen.bold("FIRMATA respuesta: " + stdout));
                        log(
                            chalk.white.bgGreen.bold("Dispositivo ", device, ": Firmata inatalado.")
                        );
                    } else {
                        //Se presento un error
                        log(chalk.black.bgRed.bold("FIRMATA error: " + stderr));
                    }
                });
                break;
            case "win64":
                lib = path.join(path.dirname(fs.realpathSync(__filename)), "/gort_win_x64.exe");
                exec("" + lib + " arduino upload firmata " + device + "", options, function(
                    error,
                    stdout,
                    stderr
                ) {
                    if (error !== "") {
                        log(chalk.white.bgGreen.bold("FIRMATA respuesta: " + stdout));
                        log(
                            chalk.white.bgGreen.bold("Dispositivo ", device, ": Firmata inatalado.")
                        );
                    } else {
                        //Se presento un error
                        log(chalk.black.bgRed.bold("FIRMATA error: " + stderr));
                    }
                });
                break;
        }
    }
};

module.exports = gortFirmata;
