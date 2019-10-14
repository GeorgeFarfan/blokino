"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene toda la configuracion, que necesita el desafío del LED-RGB.
 */

let validate_result_code = [[], [], []],
    current_test = "test_1",
    variables = [],
    conditions = {
        test_1: false,
        test_2: false
    },
    currentCallback = null;
let validator = require("../../utils/validators/ledrgb-validator");

$("#newVariableModal").on("hidden.bs.modal", () => {
    let new_variable = $("#new-variable")
        .val()
        .replace(/\s/g, "");
    if (new_variable === "ledrgb_1" || new_variable === "ledrgb_2") {
        if (!variables.includes(new_variable)) {
            if (utils.allLetters(new_variable)) {
                currentCallback(new_variable);
                variables.push(new_variable);
                $("#new-variable").val("");
            } else {
                utils.setModalError(
                    "",
                    messages.variable(new_variable).error.msg,
                    messages.variable(new_variable).error.btn
                );
            }
        } else {
            utils.setModalError(
                "",
                messages.variable(new_variable).duplicate.msg,
                messages.variable(new_variable).duplicate.btn
            );
        }
    } else {
        if (new_variable.length == 0) {
            utils.setModalError(
                "",
                messages.variable(new_variable).empty.msg,
                messages.variable(new_variable).empty.btn
            );
        } else {
            utils.setModalError(
                "",
                messages.variable(new_variable).incorrect.msg,
                messages.variable(new_variable).incorrect.btn
            );
        }
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
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let device = $("input:radio[name=radios]:checked").val();
    if (device !== undefined) {
        let validate_code = utils.esprimaValidation(code);
        if (validate_code !== "Error") {
            validate_result_code = validator.ledRGB(validate_code.body, validate_result_code);
            if (current_test == "test_1") {
                let validate_result = validate_result_code.filter(
                    led_filter =>
                        (led_filter["type"] === "LED-RGB" && led_filter["name"] === "ledrgb_1") ||
                        (led_filter["type"] === "LED-RGB" && led_filter["name"] === "ledrgb_2")
                );

                if (validate_result.length == 2) {
                    conditions["test_1"] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`ledrgb_1`, `ledrgb_2`]
                        },
                        channel: "channel_one"
                    });
                    ipcRenderer.on("channel_one", (event, result_data) => {
                        if (
                            result_data == "ErrorCallBack" ||
                            result_data == "Error" ||
                            result_data == "ErrorJ5"
                        ) {
                            modalChallenges(result_data, "test_1", 1, conditions.test_1);
                        } else {
                            let data = JSON.parse(result_data);
                            let result = data.variables_status.filter(
                                led_filter =>
                                    (led_filter["custom"]["type"] === "LED-RGB" &&
                                        led_filter["custom"]["color"] === "#FF0000" &&
                                        led_filter["custom"]["blink"] === 100 &&
                                        led_filter["pins"][0] === 6 &&
                                        led_filter["pins"][1] === 5 &&
                                        led_filter["pins"][2] === 3) ||
                                    (led_filter["custom"]["type"] === "LED-RGB" &&
                                        led_filter["custom"]["blink"] === 500 &&
                                        led_filter["custom"]["color"] === "#008000" &&
                                        led_filter["pins"][0] === 11 &&
                                        led_filter["pins"][1] === 10 &&
                                        led_filter["pins"][2] === 9)
                            );
                            if (result.length == 2) {
                                modalChallenges(data.status, "test_1", 1, conditions.test_1);
                            } else {
                                modalChallenges("Error", "test_1", 1, conditions.test_1);
                            }
                        }
                    });
                } else {
                    utils.setModalError(
                        "",
                        messages.code(1).execute_title.msg,
                        messages.code().btn
                    );
                    log(chalk.white.bgRed.bold(logs_msg.code().dont_work));
                }
            }
        } else {
            modalErrorSyntax("Error", current_test, 1, conditions.test_1);
        }
    } else {
        log(chalk.black.bgRed.bold(logs_msg.devices().dont_selected));
        utils.setModalError("", messages.devices().not_found.msg, messages.devices().not_found.btn);
    }
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
        modalErrorSyntax("Error", current_test, 1, conditions.test_1);
    }
});

$("#carouselExampleControls").bind("slide.bs.carousel", function(e) {
    if (e.relatedTarget.dataset.pos === "test_1" || e.relatedTarget.dataset.pos === "test_2") {
        variables = [];
        current_test = e.relatedTarget.dataset.pos;
        clearScene(e.relatedTarget.dataset.pos, "ChallengeLEDRGB");
    }
});
