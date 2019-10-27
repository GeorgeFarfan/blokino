"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque del BOTON.
 */

let url_documentation = "http://167.99.3.232/documentation",
    buttonFunctions = {
        block: Blockly => {
            Blockly.Blocks["button"] = {
                init: function() {
                    this.appendValueInput("button_pin")
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/button.png", 40, 40, "*")
                        )
                        .setCheck("Number")
                        .appendField("Crear Boton");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(315);
                    this.setTooltip("Crea un Boton, se debe agregar la entrada digital.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["button_press"] = {
                init: function() {
                    this.appendStatementInput("button_press_code")
                        .setCheck(null)
                        .appendField("Pulsar")
                        .appendField(new Blockly.FieldVariable("boton"), "button");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(315);
                    this.setTooltip(
                        "Este bloque se usa para manejar el evento de apretar un Boton."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["button_hold"] = {
                init: function() {
                    this.appendStatementInput("code_hold_button")
                        .setCheck(null)
                        .appendField("Mantener presionado")
                        .appendField(new Blockly.FieldVariable("boton"), "current_hold_button");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(315);
                    this.setTooltip(
                        "Este bloque se usa para manejar el evento mantener apretado el Boton."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["button_up"] = {
                init: function() {
                    this.appendStatementInput("code_up_button")
                        .setCheck(null)
                        .appendField("Soltar Boton")
                        .appendField(new Blockly.FieldVariable("boton"), "current_up_button");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(315);
                    this.setTooltip(
                        "Este bloque se usa para manejar el evento de soltar el Boton."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["button"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "button_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `new five.Button({pin:${pin},custom:{type:'BUTTON'}})`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
            Blockly.JavaScript["button_press"] = block => {
                let button = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("button"),
                    Blockly.Variables.NAME_TYPE
                );
                let button_code = Blockly.JavaScript.statementToCode(block, "button_press_code");
                let code = `${button}.on('press',function(){${button_code}});\n`;
                return code;
            };
            Blockly.JavaScript["button_hold"] = block => {
                let button = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_hold_button"),
                    Blockly.Variables.NAME_TYPE
                );
                let button_code = Blockly.JavaScript.statementToCode(block, "code_hold_button");
                let code = `${button}.on('hold',function(){${button_code}});\n`;
                return code;
            };
            Blockly.JavaScript["button_up"] = block => {
                let button = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_up_button"),
                    Blockly.Variables.NAME_TYPE
                );
                let button_code = Blockly.JavaScript.statementToCode(block, "code_up_button");
                let code = `${button}.on('hold',function(){
                    ${button_code}
                });\n`;
                return code;
            };
        }
    };

module.exports = buttonFunctions;
