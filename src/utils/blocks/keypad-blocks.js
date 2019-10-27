"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque KEYPAD.
 */

let url_documentation = "http://167.99.3.232/documentation",
    keypadFunctions = {
        block: Blockly => {
            Blockly.Blocks["keypad_block"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/keypad.png", 40, 40, "*")
                        )
                        .appendField("Crear Teclado");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["keypad_press_key"] = {
                init: function() {
                    this.appendStatementInput("code_keypad_key")
                        .setCheck(null)
                        .appendField("Tecla presionada")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["1", "1"],
                                ["2", "2"],
                                ["3", "3"],
                                ["4", "4"],
                                ["5", "5"],
                                ["6", "6"],
                                ["7", "7"],
                                ["8", "8"],
                                ["9", "9"],
                                ["*", "*"],
                                ["0", "0"],
                                ["#", "#"]
                            ]),
                            "current_key"
                        );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["keypad_press"] = {
                init: function() {
                    this.appendStatementInput("code_keypad_press")
                        .setCheck(null)
                        .appendField("Presionar tecla")
                        .appendField(new Blockly.FieldVariable("TECLADO"), "current_keypad");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["keypad_block"] = block => {
                let code = `
                    new five.Touchpad(
                        {
                            controller:'MPR121_KEYPAD',
                            keys: 
                                [["*", "0", "#"], ["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"]],
                            sensitivity:0.25,
                            custom:{type:'KEYPAD'}
                        })`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
            Blockly.JavaScript["keypad_press"] = block => {
                let keypad = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_keypad"),
                    Blockly.Variables.NAME_TYPE
                );
                let keypad_code = Blockly.JavaScript.statementToCode(block, "code_keypad_press");
                let code = `['press'].forEach(function(eventType){${keypad}.on(eventType, function(event){${keypad_code}})});\n`;
                return code;
            };
            Blockly.JavaScript["keypad_press_key"] = block => {
                let keypad = block.getFieldValue("current_key");
                let keypad_code = Blockly.JavaScript.statementToCode(block, "code_keypad_key");
                let code = `if('${keypad}'== event.which.toString()){${keypad_code}};\n `;
                return code;
            };
        }
    };

module.exports = keypadFunctions;
