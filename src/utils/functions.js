"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este modulo contiene muchas funciones utiles que usa toda la aplicacio de Blokino.
 */

const SHELL = require("electron").shell,
    PLATFORM = require("../../resources/libs/config/platform"),
    { spawn } = require("child_process"),
    ESPRIMA = require("esprima"),
    { dialog } = require("electron").remote,
    FS = require("fs"),
    INTERNET_AVAILABLE = require("internet-available"),
    CRYPTOJS = require("crypto-js"),
    PASS = "PRgtwNenjWQfwSw9MSsdUYXb3GQxP7uvaJHnFRGjYWhLSqvBGR5uQvQuYbqSk7JZtNYeumBYUVuxrC7J",
    CODE_BASE = require("../utils/program/blokino-program"),
    FIRMATA = require("../../resources/libs/johnnyFive/firmata/fir-blo"),
    CHILD_PROCESS = require("../../resources/libs/handler-child-process"),
    CHALK = require("chalk"),
    J5 = require("../../resources/libs/johnnyFive/instance-program"),
    log = console.log;

let utilFunctions = {
    cleanCode: (Blockly, document, workspace) => {
        Blockly.mainWorkspace.clear();
        $("#loader").css("display", "block");
        setTimeout(() => {
            $("#loader").css("display", "none");
            let xml = Blockly.Xml.textToDom(CODE_BASE.application().program);
            Blockly.mainWorkspace.clear();
            Blockly.Xml.domToWorkspace(xml, workspace);
        }, 500);
    },

    uploadCode: (Blockly, workspace) => {
        dialog.showOpenDialog(fileNames => {
            if (fileNames === undefined) {
                log(CHALK.gray.bgRed.bold("No se seleccionó ningún archivo."));
                return;
            }
            let readStream = FS.createReadStream(fileNames[0]);
            readStream.on("error", err => {
                $("#modal-error-upload-program").modal();
            });
            readStream.on("data", codeEncrypt => {
                try {
                    let bytesCode = CRYPTOJS.AES.decrypt(codeEncrypt.toString(), PASS);
                    let xmlCode = bytesCode.toString(CRYPTOJS.enc.Utf8);
                    let xmlBlokino = Blockly.Xml.textToDom(xmlCode);
                    Blockly.mainWorkspace.clear();
                    Blockly.Xml.domToWorkspace(xmlBlokino, workspace);
                    utilFunctions.setModalSuccess(
                        "Se agregó correctamente el proyecto de bloques."
                    );
                } catch (error) {
                    utilFunctions.setModalError(
                        "",
                        "El formato del archivo no corresponde a un programa Blokino.Volvelo a intentar seleccionado un programa de Blokino.",
                        "Volvelo a intentar"
                    );
                }
            });
        });
    },

    downloadCode: (Blockly, workspace) => {
        dialog.showSaveDialog(fileName => {
            if (fileName === undefined) {
                log(CHALK.gray.bgRed.bold("No se seleccionó ningún archivo."));
                return;
            }
            let xmlBlokino = Blockly.Xml.workspaceToDom(workspace);
            let xmlPlaneText = Blockly.Xml.domToText(xmlBlokino);
            let codeEncrypt = CRYPTOJS.AES.encrypt(xmlPlaneText, PASS);
            let name = fileName + ".blokino";
            FS.writeFile(name, codeEncrypt, err => {
                if (err) {
                    utilFunctions.setModalError(
                        "",
                        "No se pudo descargar el código del programa Blokino.",
                        "Volvelo a intentar"
                    );
                }
                utilFunctions.setModalSuccess("Se descargo correctamente el proyecto de bloques.");
            });
        });
    },

    downloadCodeJS: () => {
        dialog.showSaveDialog(fileName => {
            if (fileName === undefined) {
                log(CHALK.gray.bgRed.bold("No se seleccionó ningún archivo."));
                return;
            }
            let code = localStorage.getItem("code");
            let name = fileName + ".js";
            FS.writeFile(name, code, err => {
                if (err) {
                    utilFunctions.setModalError(
                        "",
                        "No se pudo descargar el código Javascript del programa de Blokino.",
                        "Volvelo a intentar"
                    );
                }
                utilFunctions.setModalSuccess(
                    "Se descargó correctamente el código Javascript del programa de Blokino."
                );
            });
        });
    },

    openModalErrorExecuteProgram: message => {
        utilFunctions.setModalError("", message, "Volvelo a intentar");
    },

    openModalWaiting: message => {
        $("#modal-waiting").modal();
        $("#modal-waiting-message").html(message);
    },

    closeModalWaiting: () => {
        $("#modal-waiting").modal("toggle");
    },

    esprimaValidation: code => {
        let res = null;
        try {
            res = ESPRIMA.parse(code);
        } catch (error) {
            res = "Error";
        }
        return res;
    },
    clearListDevices: (document, id) => {
        let elem = document.getElementById(id);
        elem.parentElement.removeChild(elem);
    },

    setupDevice: ipcRenderer => {
        let device = $("input:radio[name=radios]:checked").val();
        if (device) {
            async function Devices() {
                try {
                    if ((await FIRMATA.manageDevice("uno", device)) == "Exito") {
                        log(CHALK.gray.bgGreen.bold("Se configuro correctamente la placa: UNO"));
                    } else {
                        log(CHALK.gray.bgRed.bold("No se pudo configurar la placa: UNO"));
                    }
                    if ((await FIRMATA.manageDevice("mega", device)) == "Exito") {
                        log(CHALK.gray.bgGreen.bold("Se configuro correctamente la placa: MEGA"));
                    } else {
                        log(CHALK.gray.bgRed.bold("No se pudo configurar la placa: MEGA"));
                    }
                    let resNano = await FIRMATA.manageDevice("nano", device);
                    if (resNano == "Exito") {
                        log(CHALK.gray.bgGreen.bold("Se configuro correctamente la placa: NANO"));
                    } else {
                        log(
                            CHALK.gray.bgRed.bold(
                                "No se pudo configurar la placa: NANO, ahora voy a usar GORT"
                            )
                        );
                        CHILD_PROCESS.gortSetup(device);
                    }
                } catch (err) {
                    return err;
                }
            }
            Devices();
        }
    },

    waitingSetupDevice: message => {
        $("#modal-waiting-setup-device").modal();
        $("#waitingSetupDeviceMessage").html(message);
    },
    setModalSuccessAllTest: message => {
        $("#modal-success-all-tests").modal();
        $("#modal-success-all-tests-message").html(message);
    },

    setModalSuccess: message => {
        $("#modal-success").modal();
        $("#modal-success-content-message").html(message);
    },

    setModalWarning: (message, btn) => {
        $("#modal-warning").modal();
        $("#modal-warning-content-message").html(message);
        $("#modal-warning-btn").html(btn);
    },

    setModalError: (title, message, btn) => {
        $("#modal-error").modal();
        $("#modal-error-content-message").html(message);
        $("#errorModalBtn").html(btn);
    },

    createRowDevice: (devices, document) => {
        setTimeout(() => {
            document.getElementById("renderList").innerHTML = "";
            let ul = document.createElement("ul");
            ul.setAttribute("id", "proList");
            document.getElementById("renderList").appendChild(ul);
            if (devices.length > 0) {
                devices.forEach(renderProductList);

                function renderProductList(element) {
                    let div_container = document.createElement("div");
                    div_container.setAttribute("id", "device_item");
                    let li = document.createElement("li");
                    li.setAttribute("class", "item");
                    div_container.innerHTML =
                        "<img src='../../images/devices/icon_device.png' class='avatar'>" +
                        '<input class="device_bullet" type="radio" id="' +
                        element.name +
                        " : " +
                        element.port +
                        '" value="' +
                        element.port +
                        '" name="radios"><label class="device_label" for="' +
                        element.port +
                        '">  ' +
                        element.name +
                        ": " +
                        element.port +
                        "</label> ";
                    li.appendChild(div_container);
                    ul.appendChild(li);
                }
                $("#modal-devices-availables").modal();
            } else {
                utilFunctions.setModalError(
                    "",
                    "No se encontraron dispositivos conectados. Para poder ejecutar un programa en Blokino, se necesita un dispositivo conectado.",
                    "Conecta algún dispositivo"
                );
            }
        }, 500);
    },

    createSetupDevices: (devices, document) => {
        setTimeout(() => {
            document.getElementById("listDevices").innerHTML = "";
            let ul = document.createElement("ul");
            ul.setAttribute("id", "devicesList");
            document.getElementById("listDevices").appendChild(ul);
            if (devices.length > 0) {
                devices.forEach(renderProductList);

                function renderProductList(element) {
                    let li = document.createElement("li");
                    li.setAttribute("class", "item");
                    li.setAttribute("id", "device_item");
                    ul.appendChild(li);
                    li.innerHTML =
                        "<img src='../../images/devices/icon_device.png' class='avatar'>" +
                        '<input class="device_bullet" type="radio" id="' +
                        element.name +
                        " : " +
                        element.port +
                        '" value="' +
                        element.port +
                        '" name="radios"><label class="device_label" for="' +
                        element.port +
                        '"> ' +
                        element.name +
                        ": " +
                        element.port +
                        "</label>";
                }
                $("#modal-list-device-execute").modal();
            } else {
                utilFunctions.setModalError(
                    "",
                    "No se encontraron dispositivos conectados. Para poder ejecutar un programa en Blokino, se necesita un dipositivo conectado.",
                    "Conecta algún dispositivo"
                );
            }
        }, 500);
    },

    formatExecuteCode: code => {
        return code.replace(/(\r\n|\n|\r)/gm, "").replace(/  /gi, "");
    },

    allLetters: text => {
        let reg_pattern = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
        if (text.match(reg_pattern)) {
            return true;
        } else {
            return false;
        }
    },

    openURL: type_url => {
        let url_path = "";
        switch (type_url) {
            case "main":
                url_path = "http://167.99.3.232/";
                break;
            case "documentation":
                url_path = "http://167.99.3.232/get_started";
                break;
            case "download":
                url_path = "http://167.99.3.232/download";
                break;
            case "projects":
                url_path = "http://167.99.3.232/projects";
                break;
            case "frietzing":
                url_path = "http://fritzing.org/download/";
                break;
            case "node-bots":
                url_path = "https://nodebots.io/";
                break;
            case "tinkercad-head":
                url_path = "https://www.tinkercad.com/things/6yHLDikH7lH";
                break;
            case "tinkercad-body":
                url_path = "https://www.tinkercad.com/things/fEH2LHIDVvG";
                break;
            case "tinkercad-connectors":
                url_path = "https://www.tinkercad.com/things/8AdPdvg0qGx";
                break;
            case "tinkercad-hand-left":
                url_path = "https://www.tinkercad.com/things/7Xqm1Oru7RZ";
                break;
            case "tinkercad-hand-right":
                url_path = "https://www.tinkercad.com/things/0HlIie7Wm3C";
                break;
            case "tinkercad-foot-left":
                url_path = "https://www.tinkercad.com/things/ihPl2EKWFso";
                break;
            case "tinkercad-foot-right":
                url_path = "https://www.tinkercad.com/things/dseP2vjujda";
                break;
        }
        if (PLATFORM.arch().includes("win")) {
            SHELL.openExternal(url_path);
        } else {
            spawn("chromium-browser", ["--no-sandbox", url_path]);
        }
    },

    verifyInternet: (ipcRenderer, document) => {
        let device = $("input:radio[name=radios]:checked").val();
        if (device) {
            J5.killnodes();
            $("#modal-waiting-setup-device").modal();
            utilFunctions.initMsgSetupDevice(document);
            INTERNET_AVAILABLE()
                .then(() => {
                    log(CHALK.gray.bgGreen.bold("Blokino esta conectado a la red."));
                    utilFunctions.setupDevice(ipcRenderer);
                    setTimeout(() => {
                        utilFunctions.successMsgrSetupDevice(document);
                    }, 10000);
                })
                .catch(() => {
                    utilFunctions.errorMsgrSetupDevice(document);
                    log(CHALK.gray.bgRed.bold("Blokino no esta conectado a la red."));
                });
        } else {
            utilFunctions.clearListDevices(document, "proList");
        }
    },

    verifyInternetExecuteCode: (ipcRenderer, document) => {
        let device = $("input:radio[name=radios]:checked").val();
        if (device) {
            J5.killnodes();
            $("#modal-waiting-setup-device").modal();
            utilFunctions.initMsgSetupDevice(document);
            INTERNET_AVAILABLE()
                .then(() => {
                    log(CHALK.gray.bgGreen.bold("Blokino esta conectado a la red."));
                    utilFunctions.setupDevice(ipcRenderer);
                    setTimeout(() => {
                        utilFunctions.successMsgrSetupDevice(document);
                    }, 10000);
                })
                .catch(() => {
                    utilFunctions.errorMsgrSetupDevice(document);
                    log(CHALK.gray.bgRed.bold("Blokino no esta conectado a la red."));
                });
        } else {
            utilFunctions.clearListDevices(document, "devicesList");
        }
    },

    initMsgSetupDevice: () => {
        let device_available = localStorage.getItem("device");
        let device = device_available ? device_available : "Arduino";
        $("#container-waiting-device").css("display", "none");
        $("#loader-setup-device").css("display", "block");
        $("#modal-title-device").html(
            `Configurando la placa <span class="badge badge-secondary">${device}</span> ...`
        );
        $("#modal-title-device").css("margin-bottom", "5em");
    },

    successMsgrSetupDevice: document => {
        let device_available = localStorage.getItem("device");
        let device = device_available ? device_available : "Arduino";
        $("#loader-setup-device").css("display", "none");
        $("#container-waiting-device").css("display", "block");
        $("#modal-title-device").html(
            `Se configuró correctamente la placa <span class="badge badge-secondary">${device}</span> ...`
        );
        $("#modal-title-device").css("margin-bottom", "1em");
        utilFunctions.clearListDevices(document);
    },

    errorMsgrSetupDevice: document => {
        $("#loader-setup-device").css("display", "none");
        $("#container-waiting-device").css("display", "block");
        $("#modal-title-device").text(
            "Para configurar el dispositivo debe estar conectado a internet."
        );
        $("#modal-title-device").css("margin-bottom", "1em");
        utilFunctions.clearListDevices(document);
    },

    challengeComplete: tests => {
        for (let i = 1; i <= tests; i++) {
            $("#test" + i + "_title")
                .html("Prueba " + i + " - Completada")
                .removeClass("challenge-badge-incomplete")
                .addClass("challenge-badge-complete");
        }
    },

    validateModal: (current_test, tests, complete_challenge) => {
        if (complete_challenge) {
            utilFunctions.challengeComplete(tests);
            utilFunctions.setModalSuccessAllTest(
                "Cumpliste con todas las pruebas. El desafío fue completado. Aún quedan muchos desafíos por completar. Antes de cerrar este, siempre revisa las sugerencias que pueden ayudar a mejorar el uso de <strong>Blokino</strong>."
            );
        } else {
            switch (current_test) {
                case "test_1":
                    utilFunctions.setModalSuccess(
                        "Cumpliste con la <strong>Prueba 1</strong>. Continúa con las demás, para terminar el desafío."
                    );
                    $("#test1_title").html("Prueba 1 - Completada");
                    $("#test1_title")
                        .removeClass("challenge-badge-incomplete")
                        .addClass("challenge-badge-complete");
                    break;
                case "test_2":
                    utilFunctions.setModalSuccess(
                        "Cumpliste con la <strong>Prueba 2</strong>. Continúa con las demás, para terminar el desafío."
                    );
                    $("#test2_title").html("Prueba 2 - Completada");
                    $("#test2_title")
                        .removeClass("challenge-badge-incomplete")
                        .addClass("challenge-badge-complete");
                    break;
                case "test_3":
                    utilFunctions.setModalSuccess(
                        "Cumpliste con la <strong>Prueba 3</strong>. Continúa con las demás, para terminar el desafío."
                    );
                    $("#test3_title").html("Prueba 3 - Completada");
                    $("#test3_title")
                        .removeClass("challenge-badge-incomplete")
                        .addClass("challenge-badge-complete");
                    break;
                case "test_4":
                    utilFunctions.setModalSuccess(
                        "Cumpliste con la <strong>Prueba 4</strong>. Continúa con las demás, para terminar el desafío."
                    );
                    $("#test4_title").html("Prueba 4 - Completada");
                    $("#test4_title")
                        .removeClass("challenge-badge-incomplete")
                        .addClass("challenge-badge-complete");
                    break;
            }
        }
    }
};

module.exports = utilFunctions;
