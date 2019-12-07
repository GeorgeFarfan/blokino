"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuración de los bloques principales.
 */

let url_documentation = "http://167.99.3.232/get_started",
    appFunctions = {
        block: Blockly => {
            Blockly.Blocks["program"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Programa")
                        .appendField(
                            new Blockly.FieldTextInput("Nombre del programa ..."),
                            "current_name"
                        );
                    this.appendStatementInput("code_block").setCheck(null);
                    this.setColour(195);
                    this.setMovable(false);
                    this.setCommentText(false);
                    this.setHelpUrl(false);
                    this.setDeletable(false);
                    this.setTooltip("Define el bloque que contiene a toda la aplicación.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["block_code"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Bloque")
                        .appendField(
                            new Blockly.FieldTextInput("Nombre del bloque ..."),
                            "current_name"
                        );
                    this.appendStatementInput("code_block").setCheck(null);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(195);
                    this.setTooltip("Define el bloque del codigo del programa.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["block_variables"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Variables")
                        .appendField(
                            new Blockly.FieldTextInput("Nombre de las variables ..."),
                            "current_name"
                        );
                    this.appendStatementInput("variables_code").setCheck(null);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(195);
                    this.setTooltip("Define el bloque de las variables.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["block_message"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Mensaje")
                        .appendField(new Blockly.FieldTextInput("..."), "message")
                        .appendField("Tipo")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["Informativo", "info"],
                                ["Recordar", "remember"],
                                ["Advertencia", "warning"],
                                ["Peligro", "danger"],
                                ["Error", "error"]
                            ]),
                            "dropdown"
                        );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(60);
                    this.setTooltip("");
                    this.setHelpUrl("");
                }
            };
            Blockly.Blocks["pins_analog"] = {
                init: function() {
                    this.appendDummyInput().appendField(
                        new Blockly.FieldDropdown([
                            ["A0", "A0"],
                            ["A1", "A1"],
                            ["A2", "A2"],
                            ["A3", "A3"],
                            ["A4", "A4"],
                            ["A5", "A5"],
                            ["A6", "A6"],
                            ["A7", "A7"],
                            ["A8", "A8"],
                            ["A9", "A9"],
                            ["A10", "A10"],
                            ["A11", "A11"],
                            ["A12", "A12"],
                            ["A13", "A13"],
                            ["A14", "A14"],
                            ["A15", "A15"]
                        ]),
                        "pin_analog"
                    );
                    this.setOutput(true, null);
                    this.setColour(60);
                    this.setTooltip("");
                    this.setHelpUrl("");
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["program"] = block => {
                let statements_code_block = Blockly.JavaScript.statementToCode(block, "code_block");
                return statements_code_block;
            };
            Blockly.JavaScript["block_code"] = block => {
                let statements_code_block = Blockly.JavaScript.statementToCode(block, "code_block");
                return statements_code_block;
            };
            Blockly.JavaScript["block_variables"] = block => {
                let statements_variables_code = Blockly.JavaScript.statementToCode(
                    block,
                    "variables_code"
                );
                return statements_variables_code;
            };
            Blockly.JavaScript["block_message"] = block => {
                let message = block.getFieldValue("message");
                let type = block.getFieldValue("dropdown");
                let code = `process.send(
                JSON.stringify(
                    {
                        type:'blokino-message',
                        message_type: '${type}',
                        message:'${message}'
                }));\n`;
                return code;
            };
            Blockly.JavaScript["pins_analog"] = function(block) {
                let pin_analog = block.getFieldValue("pin_analog");
                let code = `${pin_analog}`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
        }
    };

module.exports = appFunctions;
