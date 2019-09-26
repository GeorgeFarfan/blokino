"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene el bloque funcional del JOYSTICK.
 */
let url_documentation = "http://167.99.3.232/documentation",
    joystickFunctions = {
        block: Blockly => {
            Blockly.Blocks["joystick"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/joystick.png", 60, 60, "*")
                        )
                        .appendField("Crear Control");
                    this.appendValueInput("joy_x")
                        .setCheck("String")
                        .appendField("-  Entrada horizontal");
                    this.appendValueInput("joy_y")
                        .setCheck("String")
                        .appendField("Entrada Vertical");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(150);
                    this.setTooltip("Crea un Joystick .");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_detected_movement"] = {
                init: function() {
                    this.appendStatementInput("code_movement")
                        .setCheck(null)
                        .appendField("Detectar movimientos")
                        .appendField(new Blockly.FieldVariable("joystick"), "current_joystick");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setInputsInline(false);
                    this.setColour(150);
                    this.setTooltip("Define el bloque que captura los movimientos del control.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_up"] = {
                init: function() {
                    this.appendStatementInput("code_mov_up")
                        .setCheck(null)
                        .appendField("Arriba");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("Captura el movimiento de mover el control para arriba.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_down"] = {
                init: function() {
                    this.appendStatementInput("code_mov_down")
                        .setCheck(null)
                        .appendField("Abajo");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("Captura el movimiento de mover el control para abajo.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_left"] = {
                init: function() {
                    this.appendStatementInput("code_mov_left")
                        .setCheck(null)
                        .appendField("Izquierda");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("Captura el movimiento de mover el control para la izquierda.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_right"] = {
                init: function() {
                    this.appendStatementInput("code_mov_right")
                        .setCheck(null)
                        .appendField("Derecha");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("Captura el movimiento de mover el control para la derecha.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_up_right"] = {
                init: function() {
                    this.appendStatementInput("code_mov_up_right")
                        .setCheck(null)
                        .appendField("Arriba a la derecha");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip(
                        "Captura el movimiento de mover el control hacia arriba a la derecha."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_up_left"] = {
                init: function() {
                    this.appendStatementInput("code_mov_up_left")
                        .setCheck(null)
                        .appendField("Arriba a la izquierda");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip(
                        "Captura el movimiento de mover el control hacia arriba a la izquierda."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_down_right"] = {
                init: function() {
                    this.appendStatementInput("code_mov_down_right")
                        .setCheck(null)
                        .appendField("Abajo a la derecha");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip(
                        "Captura el movimiento de mover el control hacia abajo a la derecha."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["joy_movement_down_left"] = {
                init: function() {
                    this.appendStatementInput("code_mov_down_left")
                        .setCheck(null)
                        .appendField("Abajo a la izquierda");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip(
                        "Captura el movimiento de mover el control hacia abajo la izquierda."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["joystick"] = block => {
                let joy_x = Blockly.JavaScript.valueToCode(
                    block,
                    "joy_x",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let joy_y = Blockly.JavaScript.valueToCode(
                    block,
                    "joy_y",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `
                        new five.Joystick(
                            { 
                                pins: [${joy_x},${joy_y}],
                                custom: {
                                    type:'JOYSTICK',
                                    pos_x: ${joy_x},
                                    pos_y: ${joy_y}
                                }
                            })`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["joy_detected_movement"] = block => {
                let joystick = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_joystick"),
                    Blockly.Variables.NAME_TYPE
                );
                let joystick_code = Blockly.JavaScript.statementToCode(block, "code_movement");
                let code = `${joystick}.on('change',function(){ let x = Math.round(this.x); let y = Math.round(this.y);${joystick_code};})`;
                return code;
            };
            Blockly.JavaScript["joy_movement_up"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_up");
                let code = `if( x == 0 && y == 1 ){  ${movement_code}  }`;
                return code;
            };
            Blockly.JavaScript["joy_movement_down"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_down");
                let code = `if( x == 0 && y == -1 ){  ${movement_code}   }`;
                return code;
            };
            Blockly.JavaScript["joy_movement_left"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_left");
                let code = `if( x == -1 && y == 0 ){  ${movement_code}   }`;
                return code;
            };
            Blockly.JavaScript["joy_movement_right"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_right");
                let code = `if( x == 1 && y == 0 ){  ${movement_code}   }`;

                return code;
            };
            Blockly.JavaScript["joy_movement_up_right"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_up_right");
                let code = `if( x == 1 && y == 1 ){  ${movement_code}   }`;

                return code;
            };
            Blockly.JavaScript["joy_movement_up_left"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_up_left");
                let code = `if( x == -1 && y == 1 ){  ${movement_code}  }`;
                return code;
            };
            Blockly.JavaScript["joy_movement_down_right"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(
                    block,
                    "code_mov_down_right"
                );
                let code = `if( x == 1 && y == -1 ){  ${movement_code}  }`;
                return code;
            };
            Blockly.JavaScript["joy_movement_down_left"] = block => {
                let movement_code = Blockly.JavaScript.statementToCode(block, "code_mov_down_left");
                let code = `if( x == -1 && y == -1 ){  ${movement_code}  }`;
                return code;
            };
        }
    };

module.exports = joystickFunctions;
