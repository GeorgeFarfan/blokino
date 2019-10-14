"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene toda la configuracion, que necesita la versión experta de Blokino.
 */

let variables = [],
    currentCallback = null;
$("#newVariableModal").on("hidden.bs.modal", () => {
    let new_variable = $("#new-variable")
        .val()
        .replace(/\s/g, "");
    if (!variables.includes(new_variable)) {
        if (utils.allLetters(new_variable)) {
            currentCallback(new_variable);
            variables.push(new_variable);
            $("#new-variable").val("");
        } else {
            if (variables.length == 0) {
                utils.setModalError(
                    "",
                    messages.variable(new_variable).empty.msg,
                    messages.variable(new_variable).empty.btn
                );
            } else {
                utils.setModalError(
                    "",
                    messages.variable(new_variable).error_expert.msg,
                    messages.variable(new_variable).error_expert.btn
                );
            }
        }
    } else {
        utils.setModalError(
            "",
            messages.variable(new_variable).duplicate.msg,
            messages.variable(new_variable).duplicate.btn
        );
    }
});

// Modal para eliminar variables.
Blockly.confirm = (object, callback) => {
    currentCallback = callback;
    if (object.type === "delete_variable") {
        variables = variables.filter(var_blocks => var_blocks !== object.variable);
        $("#modal-variable-remove").modal();
        $("#removeVariableTitle").html(`<h2>${object.message}</h2>`);
    }
};

document.getElementById("executeCode").addEventListener("click", function(event) {
    let code = getCode(Blockly.JavaScript.workspaceToCode(workspace));
    let device = $("input:radio[name=radios]:checked").val();
    if (device !== undefined) {
        utils.openModalWaiting("Verificando el programa ...");
        ipcRenderer.send("execute", {
            code: code,
            device: device,
            validate_code: {
                variable: [``]
            },
            channel: "channel_expert"
        });
        localStorage.setItem("device", device);
        ipcRenderer.on("channel_expert", (event, result) => {
            if (result == "ErrorCallBack" || result == "Error" || result == "ErrorJ5") {
                modalExpert(result);
            } else {
                let data = JSON.parse(result);
                modalExpert(data.status);
                localStorage.setItem("code", data.code);
            }
        });
    } else {
        log(chalk.black.bgRed.bold(logs_msg.devices().dont_selected));
        utils.setModalError("", messages.devices().not_found.msg, messages.devices().not_found.btn);
    }
});

document.getElementById("copy-code-preview").addEventListener("click", function(event) {
    let code = removeCustomElements(beautify(localStorage.getItem("code")), Config.beautify());
    clipboard.writeText(code);
});

document.getElementById("open-modal-code-preview").addEventListener("click", function(event) {
    let code = removeCustomElements(beautify(localStorage.getItem("code")), Config.beautify());
    localStorage.setItem("code", code);
    setTimeout(() => {
        $("#modal-code-preview").modal();
        $("#modal-body-code-preview").text("");
        setTimeout(() => {
            CodeMirror($("#modal-body-code-preview")[0], Config.codeMirror(code));
        }, 300);
    }, 300);
});

document.getElementById("openModalExecuteCode").addEventListener("click", function(event) {
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let result = utils.esprimaValidation(code);
    if (result !== "Error") {
        if (result.body.length == 0) {
            log(chalk.black.bgRed.bold(logs_msg.code().empty));
            utils.setModalError(
                "",
                messages.code().empty_execute.msg,
                messages.code().empty_execute.btn
            );
        } else {
            childProcess.devices(createSetupDevices);
        }
    } else {
        modalErrorSyntax("Error", "", 1, false);
    }
});
