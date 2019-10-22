"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion de los bloques del BUMPER.
 */

let url_documentation = "http://167.99.3.232/get_started",
    bumperFunctions = {
        block: Blockly => {
            Blockly.Blocks["button_bumper"] = {
                init: function() {
                    this.appendValueInput("bumper_pin")
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/bumper.png", 40, 40, "*")
                        )
                        .setCheck("Number")
                        .appendField("Crear Pulsador");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(0);
                    this.setTooltip("Crea un Pulsador, debe agregar la entrada.");
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["button_bump_press"] = {
                init: function() {
                    this.appendStatementInput("code_button_bumper_press")
                        .setCheck(null)
                        .appendField("Pulsar")
                        .appendField(new Blockly.FieldVariable("pulsador"), "current_bumper");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(0);
                    this.setTooltip(
                        "este bloque se usa para captar el evento de pulsar el Pulsador."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["button_bumper"] = block => {
                let current_button = Blockly.JavaScript.valueToCode(
                    block,
                    "bumper_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `
                    new five.Button(
                            { 
                                pin:${current_button},
                                custom:{
                                    type:'BUMPER'
                            }
                    })`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["button_bump_press"] = block => {
                let bumper = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_bumper"),
                    Blockly.Variables.NAME_TYPE
                );
                let bumper_code = Blockly.JavaScript.statementToCode(
                    block,
                    "code_button_bumper_press"
                );
                let code = `${bumper}.on('release',function(){${bumper_code}});\n`;
                return code;
            };
        }
    };

module.exports = bumperFunctions;
