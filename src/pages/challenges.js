"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene los metodos principales que se replican en todo la aplicacion de Blokino.
 */

require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("popper.js");
require("bootstrap");

const moment = require("moment");
moment.locale("es");

const { clipboard } = require("electron"),
    $ = require("jquery"),
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
    observables = require("../../utils/observables");

let workspace = Blockly.inject("blokino-workspace", Config.blockly(Blockly, typeToolBar));

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

Config.cleanWorkspace(Blockly, workspace);

// Modal que se abre cuando se quiere crear una variables
Blockly.prompt = (message, defaultValue, callback) => {
    currentCallback = callback;
    $("#new-variable").val("");
    $("#modal-new-variable").modal();
};

$("#open-doc").click(event => {
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
        utils.setModalWarning(messages.errors().modal.empty_block_code);
    }
});

$("#copy-code-preview").click(() => {
    clipboard.writeText(removeCustomElements(getCodeJS()).toString());
});

function getCodeJS() {
    return beautify(
        Blockly.JavaScript.workspaceToCode(workspace).replace(/var/gm, "let"),
        Config.beautify()
    );
}

function getCode(code) {
    return beautify(code.replace(/var/gm, "let"), Config.beautify());
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

$("#btn-devices-setup").click(() => {
    childProcess.devices(createListDevices);
});

$("#check-device").on("click", () => {
    let device = $("input:radio[name=radios]:checked").val();
    if (device && device != undefined) {
        localStorage.setItem("device", device);
        utils.verifyInternet(ipcRenderer, document);
    } else {
        localStorage.setItem("device", "");
        utils.setModalError(
            "",
            messages.devices().not_found.msg_config,
            messages.devices().not_found.btn
        );
    }
});

$("#btn-setup-device").on("click", () => {
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

$("#reset-board").on("click", () => {
    let device = $("input:radio[name=radios]:checked").val();
    if (device && device !== undefined) {
        utils.openModalWaiting(messages.help(device).modal.reboot_device);
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
    utils.clearListDevices(document, "devices");
});
$("#modal-list-device-execute").on("hidden.bs.modal", () => {
    utils.clearListDevices(document, "devices-setup");
});

$("#cancel-remove-variable").click(() => {
    currentCallback(false);
});
$("#accept-remove-variable").click(() => {
    currentCallback(true);
});

$("#btn-success-challenges").click(() => {
    ipcRenderer.send("kill-instances", "");
    window.history.back();
});

function clearScene(test, challenge_type) {
    $("#blokino-workspace").empty();
    workspace = Blockly.inject(
        "blokino-workspace",
        Config.challenges(Blockly, test, challenge_type)
    );
    workspace.addChangeListener(changeCurrentCode);
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    Config.cleanWorkspace(Blockly, workspace);
}

function modalErrorSyntax(state, test, tests, condition) {
    switch (state) {
        case "Exito":
            utils.validateModal(test, tests, condition);
            break;
        case "Error":
            ipcRenderer.send("kill-instances", "");
            utils.openModalErrorExecuteProgram(messages.errors().modal.syntax);
            break;
        case "ErrorCallBack":
            ipcRenderer.send("kill-instances", "");
            utils.openModalErrorExecuteProgram(messages.errors().modal.nested_functions);
            break;
        case "ErrorJ5":
            ipcRenderer.send("kill-instances", "");
            utils.openModalErrorExecuteProgram(messages.errors().modal.johnny_five);
            break;
    }
}

function modalChallenges(state, test, tests, condition) {
    utils.closeModalWaiting();
    switch (state) {
        case "Exito":
            $("#stop-program").prop("disabled", false);
            utils.validateModal(test, tests, condition);
            break;
        case "Error":
            ipcRenderer.send("kill-instances", "");
            $("#stop-program").prop("disabled", true);
            utils.openModalErrorExecuteProgram(messages.errors().modal.syntax);
            break;
        case "ErrorCallBack":
            ipcRenderer.send("kill-instances", "");
            $("#stop-program").prop("disabled", true);
            utils.openModalErrorExecuteProgram(messages.errors().modal.nested_functions);
            break;
        case "ErrorJ5":
            ipcRenderer.send("kill-instances", "");
            $("#stop-program").prop("disabled", true);
            utils.openModalErrorExecuteProgram(messages.errors().modal.johnny_five);
            break;
    }
}

$("#stop-program").click(() => {
    ipcRenderer.send("kill-instances", "");
    $("#stop-program").prop("disabled", true);
});

function modalExpert(state) {
    utils.closeModalWaiting();
    switch (state) {
        case "Exito":
            $("#stop-program").prop("disabled", false);
            utils.setModalSuccessAllTest(messages.success().modal.correct_validation);
            break;
        case "Error":
            ipcRenderer.send("kill-instances", "");
            $("#stop-program").prop("disabled", true);
            utils.openModalErrorExecuteProgram(messages.errors().modal.syntax);
            break;
        case "ErrorCallBack":
            ipcRenderer.send("kill-instances", "");
            $("#stop-program").prop("disabled", true);
            utils.openModalErrorExecuteProgram(messages.errors().modal.nested_functions);
            break;
        case "ErrorJ5":
            ipcRenderer.send("kill-instances", "");
            $("#stop-program").prop("disabled", true);
            utils.openModalErrorExecuteProgram(messages.errors().modal.johnny_five);
            break;
    }
}

$("#clean-console").click(() => {
    $("#blokino-messages").html(`
           <p class="initial-message m-0"><strong>>> Blokino => esperando mensajes ...</strong>
            </p>
    `);
});
