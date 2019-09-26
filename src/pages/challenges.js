"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene los metodos principales que se replican en todo la aplicacion de Blokino.
 */

require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("popper.js");
require("bootstrap");
const { clipboard } = require("electron");
const $ = require("jquery"),
    { ipcRenderer } = require("electron"),
    esprima = require("esprima"),
    chalk = require("chalk"),
    log = console.log,
    Config = require("../../utils/config"),
    childProcess = require("../../../resources/libs/handler-child-process"),
    beautify = require("js-beautify").js,
    utils = require("../../utils/functions"),
    CodeMirror = require("codemirror"),
    messages = require("../../utils/messages/msg"),
    logs_msg = require("../../utils/logs/console"),
    firmataDevice = require("../../../resources/libs/johnnyFive/firmata/fir-blo"),
    observables = require("../../utils/observables"),
    J5Instance = require("../../../resources/libs/johnnyFive/instance-program");

let show_code = false,
    workspace = Blockly.inject("blokinoIDE", Config.blockly(Blockly, typeToolBar));

observables.createObservable();
Config.loadComponents(Blockly);
workspace.addChangeListener(changeCurrentCode);
workspace.addChangeListener(Blockly.Events.disableOrphans);

function changeCurrentCode(event) {
    let refresh_code = setInterval(() => {
        $("#current-code").text("");
        let code_beaufity = beautify(
            Blockly.JavaScript.workspaceToCode(workspace).replace(/var/gm, "let"),
            Config.beautify()
        );
        CodeMirror($("#current-code")[0], Config.codeMirror(code_beaufity));
    }, 300);
    setInterval(() => {
        clearInterval(refresh_code);
    }, 500);
}

// Limpia la pantalla
Config.cleanWorkspace(Blockly, workspace);

$("#open-doc").click(function(event) {
    event.preventDefault();
    utils.openURL("documentation");
});

$("#back-button-challenge").click(() => {
    ipcRenderer.send("kill-instances", "");
    window.history.back();
});

$("#show-modal-code-preview").click(() => {
    let code = removeCustomElements(getCodeJS());
    if (removeJumpLines(code).length !== 0) {
        $("#modal-code-preview").modal();
        $("#modal-body-code-preview").text("");
        localStorage.setItem("code", code);
        setTimeout(() => {
            CodeMirror($("#modal-body-code-preview")[0], Config.codeMirror(code));
        }, 300);
    } else {
        utils.setModalWarning(
            "No hay bloques funcionales en tu programa. Agrega algunos y volvelo a intentar."
        );
    }
});

$("#copy-code-preview").click(() => {
    clipboard.writeText(removeCustomElements(getCodeJS()).toString());
});

function getCodeJS() {
    return beautify(
        Blockly.JavaScript.workspaceToCode(workspace)
            .replace(/(\r\n|\n|\r)/gm, "")
            .replace(/var/gm, "let"),
        Config.beautify()
    );
}

function removeJumpLines(code) {
    return code.replace("\n", "");
}

function removeCustomElements(code) {
    return code
        .split("\n")
        .filter(elem => !elem.includes(".custom."))
        .join("\n");
}

$("#btn-download-code").click(() => {
    utils.downloadExampleCode();
});

$("#download-code").click(() => {
    utils.downloadCode(Blockly, workspace);
});

$("#download-code-js").click(() => {
    utils.downloadCodeJS();
});

$("#open-code").click(() => {
    utils.uploadCode(Blockly, workspace);
});

$("#clean-code").click(() => {
    utils.cleanCode(Blockly, document, workspace);
});

setTimeout(() => {
    $("#loader").css({
        display: "none"
    });
    $("#block-editor").css({
        display: "block"
    });
}, 500);

function createListDevices(devices) {
    utils.createRowDevice(devices, document);
}

function createSetupDevices(devices) {
    utils.createSetupDevices(devices, document);
}

$("#devices").click(() => {
    childProcess.devices(createListDevices);
});

$("#btnCheckDevice").on("click", () => {
    let device = $("input:radio[name=radios]:checked").val();
    if (device && device != undefined) {
        utils.verifyInternet(ipcRenderer, document);
    } else {
        utils.setModalError(
            "",
            messages.devices().not_found.msg_config,
            messages.devices().not_found.btn
        );
    }
});

$("#setupDeviceExecuteCode").on("click", () => {
    let device = $("input:radio[name=radios]:checked").val();
    localStorage.setItem("device", device);
    if (device && device != undefined) {
        utils.verifyInternetExecuteCode(ipcRenderer, document);
    } else {
        utils.setModalError(
            "",
            messages.devices().not_found.msg_config,
            messages.devices().not_found.btn
        );
    }
});

$("#cleanCodeBoard").on("click", () => {
    let device = $("input:radio[name=radios]:checked").val();
    if (device && device !== undefined) {
        utils.openModalWaiting(
            `Reiniciando la placa Arduino <span class="badge badge-secondary">${device}</span>`
        );
        ipcRenderer.send("clean", {
            code: "",
            device: device
        });
        ipcRenderer.on("resultClean", (event, resultClean) => {
            ipcRenderer.send("kill-instances", "");
            utils.closeModalWaiting();
        });
    } else {
        utils.setModalError(
            "",
            messages.devices().not_found.msg_clean,
            messages.devices().not_found.btn
        );
    }
});

$("#modal-devices-availables").on("hidden.bs.modal", () => {
    utils.clearListDevices(document, "proList");
});
$("#modal-list-device-execute").on("hidden.bs.modal", () => {
    utils.clearListDevices(document, "devicesList");
});

$("#openModalResistenceCalculator").on("click", () => {
    $("#ModalResistanceCalculator").modal();
});

// Modal que se abre cuando se quiere crear una variables
Blockly.prompt = function(message, defaultValue, callback) {
    currentCallback = callback;
    $("#new-variable").val("");
    $("#newVariableModal").modal();
};

// Modal para eliminar variables.
Blockly.confirm = function(message, callback) {
    currentCallback = callback;
    $("#modal-variable-remove").modal();
    $("#removeVariableTitle").html(message);
};

$("#cancelRemoveVariable").click(() => {
    currentCallback(false);
});
$("#acceptRemoveVariable").click(() => {
    currentCallback(true);
});

$("#successChallengesBtn").click(() => {
    ipcRenderer.send("kill-instances", "");
    window.history.back();
});

function clearScene(test, challenge_type) {
    $("#blokinoIDE").empty();
    workspace = Blockly.inject("blokinoIDE", Config.challenges(Blockly, test, challenge_type));
    workspace.addChangeListener(changeCurrentCode);
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    // Limpia la pantalla
    Config.cleanWorkspace(Blockly, workspace);
}

function modalErrorSyntax(state, test, tests, condition) {
    switch (state) {
        case "Exito":
            utils.validateModal(test, tests, condition);
            break;
        case "Error":
            ipcRenderer.send("kill-instances", "");
            utils.openModalErrorExecuteProgram(
                "El programa tiene algún error.<strong> Consejo: revisar variables, bloques y funciones.</strong>"
            );
            break;
        case "ErrorCallBack":
            ipcRenderer.send("kill-instances", "");
            utils.openModalErrorExecuteProgram(
                "Se agruparon funciones con el mismo nombre. Para poder ejecutar el programa debe solucionar esto."
            );
            break;
        case "ErrorJ5":
            ipcRenderer.send("kill-instances", "");
            utils.openModalErrorExecuteProgram(
                "Se produjo un error con el Arduino conectado. <strong> Consejo: desconectar el Arduino y conectarlo en otro puerto. Esperar 5 segundos y volver a ejecutar el programa.</strong>"
            );
            break;
    }
}

function modalChallenges(state, test, tests, condition) {
    utils.closeModalWaiting();
    switch (state) {
        case "Exito":
            $("#stopProgram").prop("disabled", false);
            utils.validateModal(test, tests, condition);
            break;
        case "Error":
            ipcRenderer.send("kill-instances", "");
            $("#stopProgram").prop("disabled", true);
            utils.openModalErrorExecuteProgram(
                "El programa tiene algún error.<strong> Consejo: revisar variables, bloques y funciones.</strong>"
            );
            break;
        case "ErrorCallBack":
            ipcRenderer.send("kill-instances", "");
            $("#stopProgram").prop("disabled", true);
            utils.openModalErrorExecuteProgram(
                "Se agruparon funciones con el mismo nombre. Para poder ejecutar el programa debe solucionar esto."
            );
            break;
        case "ErrorJ5":
            ipcRenderer.send("kill-instances", "");
            $("#stopProgram").prop("disabled", true);
            utils.openModalErrorExecuteProgram(
                "Se produjo un error con el Arduino conectado. <strong> Consejo: desconectar el Arduino y conectarlo en otro puerto. Esperar 5 segundos y volver a ejecutar el programa. Si el error persiste, configure el dispositivo con Blokino.</strong>"
            );
            break;
    }
}

$("#stopProgram").click(() => {
    ipcRenderer.send("kill-instances", "");
    $("#stopProgram").prop("disabled", true);
});

function modalExpert(state) {
    utils.closeModalWaiting();
    switch (state) {
        case "Exito":
            $("#stopProgram").prop("disabled", false);
            utils.setModalSuccessAllTest(
                `Ya armaste el programa de Blokino, el programa se va a ejecutar en el dispositivo Arduino <strong>${localStorage.getItem(
                    "device"
                )}</strong>.`
            );
            break;
        case "Error":
            ipcRenderer.send("kill-instances", "");
            $("#stopProgram").prop("disabled", true);
            utils.openModalErrorExecuteProgram(
                "El programa tiene algún error.<strong> Consejo: revisar variables, bloques y funciones.</strong>"
            );
            break;
        case "ErrorCallBack":
            ipcRenderer.send("kill-instances", "");
            $("#stopProgram").prop("disabled", true);
            utils.openModalErrorExecuteProgram(
                "Se agruparon funciones con el mismo nombre. Para poder ejecutar el programa debe solucionar esto."
            );
            break;
        case "ErrorJ5":
            ipcRenderer.send("kill-instances", "");
            $("#stopProgram").prop("disabled", true);
            utils.openModalErrorExecuteProgram(
                "Se produjo un error con el Arduino conectado. <strong> Consejo: desconectar el Arduino y conectarlo en otro puerto. Esperar 5 segundos y volver a ejecutar el programa. Si el error persiste, configure el dispositivo con Blokino.</strong>"
            );
            break;
    }
}

$(".dropdown-menu li a").click(() => {
    let band = $(this).attr("data-option");
    switch ($(this).text()) {
        case "Negra":
            $("#" + band).css("background-color", "black");
            break;
        case "Marron":
            $("#" + band).css("background-color", "maroon");
            break;
        case "Roja":
            $("#" + band).css("background-color", "red");
            break;
        case "Naranja":
            $("#" + band).css("background-color", "orange");
            break;
        case "Amarilla":
            $("#" + band).css("background-color", "yellow");
            break;
        case "Verde":
            $("#" + band).css("background-color", "green");
            break;
        case "Azul":
            $("#" + band).css("background-color", "blue");
            break;
        case "Violeta":
            $("#" + band).css("background-color", "violet");
            break;
        case "Gris":
            $("#" + band).css("background-color", "rgba(176, 174, 174, 0.31)");
            break;
        case "Blanca":
            $("#" + band).css("background-color", "white");
            break;
        case "Dorado":
            $("#" + band).css("background-color", "#d3d335");
            break;
        case "Plateado":
            $("#" + band).css("background-color", "#f1f1f1");
            break;
    }
});

$(".dropdown-menu-option li a").click(() => {
    switch ($(this).text()) {
        case "4 bandas":
            $("#rec_5").css("display", "none");
            $("#option-5").css("display", "none");
            break;
        case "5 bandas":
            $("#rec_5").css("display", "block");
            $("#option-5").css("display", "block");
            break;
    }
});
