"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque MATRIX-LED.
 */

const gestures = require("./resources/gestures"),
    url_documentation = "http://167.99.3.232/documentation";
let screenMarixFunctions = {
    block: Blockly => {
        Blockly.Blocks["matrix"] = {
            init: function () {
                this.appendValueInput("pin_cs")
                    .appendField(
                        new Blockly.FieldImage("../../images/blocks/matrix-leds.png", 40, 40, "*")
                    )
                    .setCheck("Number")
                    .appendField("Crear MATRIX-LEDS")
                    .appendField("Entrada_CS");
                this.appendValueInput("pin_din")
                    .setCheck("Number")
                    .appendField("Entrada_DIN");
                this.appendValueInput("pin_clk")
                    .setCheck("Number")
                    .appendField("Entrada_CLK");
                this.setInputsInline(true);
                this.setOutput(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["matrix_with_extensions"] = {
            init: function () {
                this.appendValueInput("pin_cs")
                    .appendField(
                        new Blockly.FieldImage("../../images/blocks/matrix-leds.png", 40, 40, "*")
                    )
                    .setCheck("Number")
                    .appendField("Crear MATRIX-LEDS")
                    .appendField("Entrada_CS");
                this.appendValueInput("pin_din")
                    .setCheck("Number")
                    .appendField("Entrada_DIN");
                this.appendValueInput("pin_clk")
                    .setCheck("Number")
                    .appendField("Entrada_CLK");
                this.appendValueInput("extensions")
                    .setCheck("Number")
                    .appendField("Extensiones");
                this.setInputsInline(true);
                this.setOutput(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["print_screen"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Dibujar ")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "current_led_matrix")
                    .appendField(" figura")
                    .appendField(
                        new Blockly.FieldDropdown([
                            ["feliz", "happy"],
                            ["triste", "sad"],
                            ["mmm", "chino"],
                            ["sorpresa", "surprise"],
                            ["risa", "jeje"],
                            ["lengua afuera", "tongue"],
                            ["corazon", "heart"],
                            ["casa", "house"],
                            ["interrogacion", "interrogation"],
                            ["exclamacion", "exclamation"],
                            ["lentes", "glass_man"],
                            ["Error", "error"],
                            ["Exito", "success"],
                            ["Todas los leds prendidos", "all_red"]
                        ]),
                        "options"
                    );
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("Asigna un figura a la matrix de leds.");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["blink_screen"] = {
            init: function () {
                this.appendStatementInput("blink_screen_code")
                    .setCheck(null)
                    .appendField("Hacer parpadear ")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "current_display");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["screen_on"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Encender pantalla")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "currente_screen");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("Enciende la matrix de leds.");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["screen_off"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Apagar pantalla")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "currente_screen");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("Apaga la matrix de leds.");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["screen_clear"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Limpiar pantalla")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "currente_screen");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("Limpia la matrix de leds.");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["message_screen"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Escribir en ")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "current_screen");
                this.appendValueInput("current_screen_message")
                    .setCheck("String")
                    .appendField(" mensaje");
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("Asigna un mensaje a la matrix de leds.");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["matrix_paint"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Dibujar ")
                    .appendField(new Blockly.FieldVariable("matrix"), "current_matrix");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_8");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl(url_documentation);
            }
        };
        Blockly.Blocks["matrix_leds_paint"] = {
            init: function () {
                this.appendDummyInput()
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField("Dibujar en la matrix")
                    .appendField(new Blockly.FieldVariable("MATRIX_LEDS"), "matrix");
                this.appendDummyInput()
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField("con tantas pantallas unida")
                    .appendField(new Blockly.FieldNumber(1, 0, 20, 1), "cant-matrix");
                this.appendValueInput("matrix_leds").setCheck("Array");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
        Blockly.Blocks["matrix_emoticon"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Posición")
                    .appendField(new Blockly.FieldNumber(1, 1, 20, 1), "position");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_1_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_2_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_3_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_4_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_5_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_6_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_7_8");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_1")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_2")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_3")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_4")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_5")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_6")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_7")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "led_8_8");

                this.setInputsInline(false);
                this.setOutput(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
        Blockly.Blocks["matrix_caracter"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Posicion")
                    .appendField(new Blockly.FieldNumber(1, 1, 20, 1), "position");
                this.appendValueInput("caracter")
                    .setCheck("String")
                    .appendField("Caracter");
                this.setOutput(true, null);
                this.setColour(15);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
    },
    code: Blockly => {
        Blockly.JavaScript["matrix"] = block => {
            let pin_cs = Blockly.JavaScript.valueToCode(
                block,
                "pin_cs",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let pin_din = Blockly.JavaScript.valueToCode(
                block,
                "pin_din",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let pin_clk = Blockly.JavaScript.valueToCode(
                block,
                "pin_clk",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let code = `
                new five.Led.Matrix({
                    pins:{ 
                        data:${pin_din},
                        clock:${pin_clk},
                        cs:${pin_cs},
                        custom:{
                            type:'SCREEN-MATRIX',
                            code:''
                        }
                    }
                })`;
            return [code, Blockly.JavaScript.ORDER_NONE];
        };
        Blockly.JavaScript["matrix_with_extensions"] = block => {
            let pin_cs = Blockly.JavaScript.valueToCode(
                block,
                "pin_cs",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let pin_din = Blockly.JavaScript.valueToCode(
                block,
                "pin_din",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let pin_clk = Blockly.JavaScript.valueToCode(
                block,
                "pin_clk",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let extensions = Blockly.JavaScript.valueToCode(
                block,
                "extensions",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let code = `
                new five.Led.Matrix({
                    pins:{ 
                        data:${pin_din},
                        clock:${pin_clk},
                        cs:${pin_cs},
                        custom:{
                            type:'SCREEN-MATRIX',
                            code:''
                        }
                    },
                    devices:${extensions}
                })`;
            return [code, Blockly.JavaScript.ORDER_NONE];
        };
        Blockly.JavaScript["message_screen"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("current_screen"),
                Blockly.Variables.NAME_TYPE
            );
            let message = Blockly.JavaScript.valueToCode(
                block,
                "current_screen_message",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let code = `
                    ${matrix}.custom.code = ${message};
                    let msg = ${message}.split('');
                    function next() { 
                        let c; 
                        if(c = msg.shift()){
                            ${matrix}.draw(c);
                            setTimeout(next, 1000) 
                        } 
                    };
                    next();`;
            return code;
        };
        Blockly.JavaScript["print_screen"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("current_led_matrix"),
                Blockly.Variables.NAME_TYPE
            );
            let gesture = block.getFieldValue("options");
            let code = `${matrix}.custom.code = "${gesture}";
                            ${matrix}.on();
                            ${matrix}.draw([${gestures.figures()[gesture]}]);`;
            return code;
        };
        Blockly.JavaScript["screen_off"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("currente_screen"),
                Blockly.Variables.NAME_TYPE
            );
            let code = `${matrix}.off();`;
            return code;
        };
        Blockly.JavaScript["screen_on"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("currente_screen"),
                Blockly.Variables.NAME_TYPE
            );
            let code = `${matrix}.on();`;
            return code;
        };
        Blockly.JavaScript["screen_clear"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("currente_screen"),
                Blockly.Variables.NAME_TYPE
            );
            let code = `${matrix}.clear();`;
            return code;
        };
        Blockly.JavaScript["matrix_paint"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("current_matrix"),
                Blockly.Variables.NAME_TYPE
            );
            let checkbox_led_1_1 = block.getFieldValue("led_1_1") == "TRUE" ? "1" : "0";
            let checkbox_led_1_2 = block.getFieldValue("led_1_2") == "TRUE" ? "1" : "0";
            let checkbox_led_1_3 = block.getFieldValue("led_1_3") == "TRUE" ? "1" : "0";
            let checkbox_led_1_4 = block.getFieldValue("led_1_4") == "TRUE" ? "1" : "0";
            let checkbox_led_1_5 = block.getFieldValue("led_1_5") == "TRUE" ? "1" : "0";
            let checkbox_led_1_6 = block.getFieldValue("led_1_6") == "TRUE" ? "1" : "0";
            let checkbox_led_1_7 = block.getFieldValue("led_1_7") == "TRUE" ? "1" : "0";
            let checkbox_led_1_8 = block.getFieldValue("led_1_8") == "TRUE" ? "1" : "0";
            let checkbox_led_2_1 = block.getFieldValue("led_2_1") == "TRUE" ? "1" : "0";
            let checkbox_led_2_2 = block.getFieldValue("led_2_2") == "TRUE" ? "1" : "0";
            let checkbox_led_2_3 = block.getFieldValue("led_2_3") == "TRUE" ? "1" : "0";
            let checkbox_led_2_4 = block.getFieldValue("led_2_4") == "TRUE" ? "1" : "0";
            let checkbox_led_2_5 = block.getFieldValue("led_2_5") == "TRUE" ? "1" : "0";
            let checkbox_led_2_6 = block.getFieldValue("led_2_6") == "TRUE" ? "1" : "0";
            let checkbox_led_2_7 = block.getFieldValue("led_2_7") == "TRUE" ? "1" : "0";
            let checkbox_led_2_8 = block.getFieldValue("led_2_8") == "TRUE" ? "1" : "0";
            let checkbox_led_3_1 = block.getFieldValue("led_3_1") == "TRUE" ? "1" : "0";
            let checkbox_led_3_2 = block.getFieldValue("led_3_2") == "TRUE" ? "1" : "0";
            let checkbox_led_3_3 = block.getFieldValue("led_3_3") == "TRUE" ? "1" : "0";
            let checkbox_led_3_4 = block.getFieldValue("led_3_4") == "TRUE" ? "1" : "0";
            let checkbox_led_3_5 = block.getFieldValue("led_3_5") == "TRUE" ? "1" : "0";
            let checkbox_led_3_6 = block.getFieldValue("led_3_6") == "TRUE" ? "1" : "0";
            let checkbox_led_3_7 = block.getFieldValue("led_3_7") == "TRUE" ? "1" : "0";
            let checkbox_led_3_8 = block.getFieldValue("led_3_8") == "TRUE" ? "1" : "0";
            let checkbox_led_4_1 = block.getFieldValue("led_4_1") == "TRUE" ? "1" : "0";
            let checkbox_led_4_2 = block.getFieldValue("led_4_2") == "TRUE" ? "1" : "0";
            let checkbox_led_4_3 = block.getFieldValue("led_4_3") == "TRUE" ? "1" : "0";
            let checkbox_led_4_4 = block.getFieldValue("led_4_4") == "TRUE" ? "1" : "0";
            let checkbox_led_4_5 = block.getFieldValue("led_4_5") == "TRUE" ? "1" : "0";
            let checkbox_led_4_6 = block.getFieldValue("led_4_6") == "TRUE" ? "1" : "0";
            let checkbox_led_4_7 = block.getFieldValue("led_4_7") == "TRUE" ? "1" : "0";
            let checkbox_led_4_8 = block.getFieldValue("led_4_8") == "TRUE" ? "1" : "0";
            let checkbox_led_5_1 = block.getFieldValue("led_5_1") == "TRUE" ? "1" : "0";
            let checkbox_led_5_2 = block.getFieldValue("led_5_2") == "TRUE" ? "1" : "0";
            let checkbox_led_5_3 = block.getFieldValue("led_5_3") == "TRUE" ? "1" : "0";
            let checkbox_led_5_4 = block.getFieldValue("led_5_4") == "TRUE" ? "1" : "0";
            let checkbox_led_5_5 = block.getFieldValue("led_5_5") == "TRUE" ? "1" : "0";
            let checkbox_led_5_6 = block.getFieldValue("led_5_6") == "TRUE" ? "1" : "0";
            let checkbox_led_5_7 = block.getFieldValue("led_5_7") == "TRUE" ? "1" : "0";
            let checkbox_led_5_8 = block.getFieldValue("led_5_8") == "TRUE" ? "1" : "0";
            let checkbox_led_6_1 = block.getFieldValue("led_6_1") == "TRUE" ? "1" : "0";
            let checkbox_led_6_2 = block.getFieldValue("led_6_2") == "TRUE" ? "1" : "0";
            let checkbox_led_6_3 = block.getFieldValue("led_6_3") == "TRUE" ? "1" : "0";
            let checkbox_led_6_4 = block.getFieldValue("led_6_4") == "TRUE" ? "1" : "0";
            let checkbox_led_6_5 = block.getFieldValue("led_6_5") == "TRUE" ? "1" : "0";
            let checkbox_led_6_6 = block.getFieldValue("led_6_6") == "TRUE" ? "1" : "0";
            let checkbox_led_6_7 = block.getFieldValue("led_6_7") == "TRUE" ? "1" : "0";
            let checkbox_led_6_8 = block.getFieldValue("led_6_8") == "TRUE" ? "1" : "0";
            let checkbox_led_7_1 = block.getFieldValue("led_7_1") == "TRUE" ? "1" : "0";
            let checkbox_led_7_2 = block.getFieldValue("led_7_2") == "TRUE" ? "1" : "0";
            let checkbox_led_7_3 = block.getFieldValue("led_7_3") == "TRUE" ? "1" : "0";
            let checkbox_led_7_4 = block.getFieldValue("led_7_4") == "TRUE" ? "1" : "0";
            let checkbox_led_7_5 = block.getFieldValue("led_7_5") == "TRUE" ? "1" : "0";
            let checkbox_led_7_6 = block.getFieldValue("led_7_6") == "TRUE" ? "1" : "0";
            let checkbox_led_7_7 = block.getFieldValue("led_7_7") == "TRUE" ? "1" : "0";
            let checkbox_led_7_8 = block.getFieldValue("led_7_8") == "TRUE" ? "1" : "0";
            let checkbox_led_8_1 = block.getFieldValue("led_8_1") == "TRUE" ? "1" : "0";
            let checkbox_led_8_2 = block.getFieldValue("led_8_2") == "TRUE" ? "1" : "0";
            let checkbox_led_8_3 = block.getFieldValue("led_8_3") == "TRUE" ? "1" : "0";
            let checkbox_led_8_4 = block.getFieldValue("led_8_4") == "TRUE" ? "1" : "0";
            let checkbox_led_8_5 = block.getFieldValue("led_8_5") == "TRUE" ? "1" : "0";
            let checkbox_led_8_6 = block.getFieldValue("led_8_6") == "TRUE" ? "1" : "0";
            let checkbox_led_8_7 = block.getFieldValue("led_8_7") == "TRUE" ? "1" : "0";
            let checkbox_led_8_8 = block.getFieldValue("led_8_8") == "TRUE" ? "1" : "0";

            let code = `
                    ${matrix}.custom.code =  [${[
                `"${checkbox_led_1_1 +
                    checkbox_led_1_2 +
                    checkbox_led_1_3 +
                    checkbox_led_1_4 +
                    checkbox_led_1_5 +
                    checkbox_led_1_6 +
                    checkbox_led_1_7 +
                    checkbox_led_1_8}"`,
                `"${checkbox_led_2_1 +
                    checkbox_led_2_2 +
                    checkbox_led_2_3 +
                    checkbox_led_2_4 +
                    checkbox_led_2_5 +
                    checkbox_led_2_6 +
                    checkbox_led_2_7 +
                    checkbox_led_2_8}"`,
                `"${checkbox_led_3_1 +
                    checkbox_led_3_2 +
                    checkbox_led_3_3 +
                    checkbox_led_3_4 +
                    checkbox_led_3_5 +
                    checkbox_led_3_6 +
                    checkbox_led_3_7 +
                    checkbox_led_3_8}"`,
                `"${checkbox_led_4_1 +
                    checkbox_led_4_2 +
                    checkbox_led_4_3 +
                    checkbox_led_4_4 +
                    checkbox_led_4_5 +
                    checkbox_led_4_6 +
                    checkbox_led_4_7 +
                    checkbox_led_4_8}"`,
                `"${checkbox_led_5_1 +
                    checkbox_led_5_2 +
                    checkbox_led_5_3 +
                    checkbox_led_5_4 +
                    checkbox_led_5_5 +
                    checkbox_led_5_6 +
                    checkbox_led_5_7 +
                    checkbox_led_5_8}"`,
                `"${checkbox_led_6_1 +
                    checkbox_led_6_2 +
                    checkbox_led_6_3 +
                    checkbox_led_6_4 +
                    checkbox_led_6_5 +
                    checkbox_led_6_6 +
                    checkbox_led_6_7 +
                    checkbox_led_6_8}"`,
                `"${checkbox_led_7_1 +
                    checkbox_led_7_2 +
                    checkbox_led_7_3 +
                    checkbox_led_7_4 +
                    checkbox_led_7_5 +
                    checkbox_led_7_6 +
                    checkbox_led_7_7 +
                    checkbox_led_7_8}"`,
                `"${checkbox_led_8_1 +
                    checkbox_led_8_2 +
                    checkbox_led_8_3 +
                    checkbox_led_8_4 +
                    checkbox_led_8_5 +
                    checkbox_led_8_6 +
                    checkbox_led_8_7 +
                    checkbox_led_8_8}"`
            ]}];
                    ${matrix}.on();
                    ${matrix}.draw([${[
                `"${checkbox_led_1_1 +
                    checkbox_led_1_2 +
                    checkbox_led_1_3 +
                    checkbox_led_1_4 +
                    checkbox_led_1_5 +
                    checkbox_led_1_6 +
                    checkbox_led_1_7 +
                    checkbox_led_1_8}"`,
                `"${checkbox_led_2_1 +
                    checkbox_led_2_2 +
                    checkbox_led_2_3 +
                    checkbox_led_2_4 +
                    checkbox_led_2_5 +
                    checkbox_led_2_6 +
                    checkbox_led_2_7 +
                    checkbox_led_2_8}"`,
                `"${checkbox_led_3_1 +
                    checkbox_led_3_2 +
                    checkbox_led_3_3 +
                    checkbox_led_3_4 +
                    checkbox_led_3_5 +
                    checkbox_led_3_6 +
                    checkbox_led_3_7 +
                    checkbox_led_3_8}"`,
                `"${checkbox_led_4_1 +
                    checkbox_led_4_2 +
                    checkbox_led_4_3 +
                    checkbox_led_4_4 +
                    checkbox_led_4_5 +
                    checkbox_led_4_6 +
                    checkbox_led_4_7 +
                    checkbox_led_4_8}"`,
                `"${checkbox_led_5_1 +
                    checkbox_led_5_2 +
                    checkbox_led_5_3 +
                    checkbox_led_5_4 +
                    checkbox_led_5_5 +
                    checkbox_led_5_6 +
                    checkbox_led_5_7 +
                    checkbox_led_5_8}"`,
                `"${checkbox_led_6_1 +
                    checkbox_led_6_2 +
                    checkbox_led_6_3 +
                    checkbox_led_6_4 +
                    checkbox_led_6_5 +
                    checkbox_led_6_6 +
                    checkbox_led_6_7 +
                    checkbox_led_6_8}"`,
                `"${checkbox_led_7_1 +
                    checkbox_led_7_2 +
                    checkbox_led_7_3 +
                    checkbox_led_7_4 +
                    checkbox_led_7_5 +
                    checkbox_led_7_6 +
                    checkbox_led_7_7 +
                    checkbox_led_7_8}"`,
                `"${checkbox_led_8_1 +
                    checkbox_led_8_2 +
                    checkbox_led_8_3 +
                    checkbox_led_8_4 +
                    checkbox_led_8_5 +
                    checkbox_led_8_6 +
                    checkbox_led_8_7 +
                    checkbox_led_8_8}"`
            ]}]);`;

            return code;
        };
        Blockly.JavaScript["blink_screen"] = block => {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("current_display"),
                Blockly.Variables.NAME_TYPE
            );
            let blink_screen_code = Blockly.JavaScript.statementToCode(block, "blink_screen_code");
            let code = `while(true){
                        ${matrix}.clear();
                        setTimeout(() => {
                            ${matrix}.draw([${gestures.figures()[blink_screen_code]}]);
                        }, 3000);
                    };`;

            return code;
        };
        Blockly.JavaScript["matrix_leds_paint"] = function (block) {
            let matrix = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue("matrix"),
                Blockly.Variables.NAME_TYPE
            );
            let matrix_leds = Blockly.JavaScript.valueToCode(
                block,
                "matrix_leds",
                Blockly.JavaScript.ORDER_ATOMIC
            );
            let code_matrix = ``;

            let code = `
                    let codes = ${matrix_leds};
                    codes.forEach(m_led => {
                        ${matrix}.draw(m_led.position, m_led.matrix_code)
                    });\n`;
            return code;
        };
        Blockly.JavaScript["matrix_emoticon"] = function (block) {
            let position = Number(block.getFieldValue("position")) - 1;
            let checkbox_led_1_1 = block.getFieldValue("led_1_1") == "TRUE" ? "1" : "0";
            let checkbox_led_1_2 = block.getFieldValue("led_1_2") == "TRUE" ? "1" : "0";
            let checkbox_led_1_3 = block.getFieldValue("led_1_3") == "TRUE" ? "1" : "0";
            let checkbox_led_1_4 = block.getFieldValue("led_1_4") == "TRUE" ? "1" : "0";
            let checkbox_led_1_5 = block.getFieldValue("led_1_5") == "TRUE" ? "1" : "0";
            let checkbox_led_1_6 = block.getFieldValue("led_1_6") == "TRUE" ? "1" : "0";
            let checkbox_led_1_7 = block.getFieldValue("led_1_7") == "TRUE" ? "1" : "0";
            let checkbox_led_1_8 = block.getFieldValue("led_1_8") == "TRUE" ? "1" : "0";
            let checkbox_led_2_1 = block.getFieldValue("led_2_1") == "TRUE" ? "1" : "0";
            let checkbox_led_2_2 = block.getFieldValue("led_2_2") == "TRUE" ? "1" : "0";
            let checkbox_led_2_3 = block.getFieldValue("led_2_3") == "TRUE" ? "1" : "0";
            let checkbox_led_2_4 = block.getFieldValue("led_2_4") == "TRUE" ? "1" : "0";
            let checkbox_led_2_5 = block.getFieldValue("led_2_5") == "TRUE" ? "1" : "0";
            let checkbox_led_2_6 = block.getFieldValue("led_2_6") == "TRUE" ? "1" : "0";
            let checkbox_led_2_7 = block.getFieldValue("led_2_7") == "TRUE" ? "1" : "0";
            let checkbox_led_2_8 = block.getFieldValue("led_2_8") == "TRUE" ? "1" : "0";
            let checkbox_led_3_1 = block.getFieldValue("led_3_1") == "TRUE" ? "1" : "0";
            let checkbox_led_3_2 = block.getFieldValue("led_3_2") == "TRUE" ? "1" : "0";
            let checkbox_led_3_3 = block.getFieldValue("led_3_3") == "TRUE" ? "1" : "0";
            let checkbox_led_3_4 = block.getFieldValue("led_3_4") == "TRUE" ? "1" : "0";
            let checkbox_led_3_5 = block.getFieldValue("led_3_5") == "TRUE" ? "1" : "0";
            let checkbox_led_3_6 = block.getFieldValue("led_3_6") == "TRUE" ? "1" : "0";
            let checkbox_led_3_7 = block.getFieldValue("led_3_7") == "TRUE" ? "1" : "0";
            let checkbox_led_3_8 = block.getFieldValue("led_3_8") == "TRUE" ? "1" : "0";
            let checkbox_led_4_1 = block.getFieldValue("led_4_1") == "TRUE" ? "1" : "0";
            let checkbox_led_4_2 = block.getFieldValue("led_4_2") == "TRUE" ? "1" : "0";
            let checkbox_led_4_3 = block.getFieldValue("led_4_3") == "TRUE" ? "1" : "0";
            let checkbox_led_4_4 = block.getFieldValue("led_4_4") == "TRUE" ? "1" : "0";
            let checkbox_led_4_5 = block.getFieldValue("led_4_5") == "TRUE" ? "1" : "0";
            let checkbox_led_4_6 = block.getFieldValue("led_4_6") == "TRUE" ? "1" : "0";
            let checkbox_led_4_7 = block.getFieldValue("led_4_7") == "TRUE" ? "1" : "0";
            let checkbox_led_4_8 = block.getFieldValue("led_4_8") == "TRUE" ? "1" : "0";
            let checkbox_led_5_1 = block.getFieldValue("led_5_1") == "TRUE" ? "1" : "0";
            let checkbox_led_5_2 = block.getFieldValue("led_5_2") == "TRUE" ? "1" : "0";
            let checkbox_led_5_3 = block.getFieldValue("led_5_3") == "TRUE" ? "1" : "0";
            let checkbox_led_5_4 = block.getFieldValue("led_5_4") == "TRUE" ? "1" : "0";
            let checkbox_led_5_5 = block.getFieldValue("led_5_5") == "TRUE" ? "1" : "0";
            let checkbox_led_5_6 = block.getFieldValue("led_5_6") == "TRUE" ? "1" : "0";
            let checkbox_led_5_7 = block.getFieldValue("led_5_7") == "TRUE" ? "1" : "0";
            let checkbox_led_5_8 = block.getFieldValue("led_5_8") == "TRUE" ? "1" : "0";
            let checkbox_led_6_1 = block.getFieldValue("led_6_1") == "TRUE" ? "1" : "0";
            let checkbox_led_6_2 = block.getFieldValue("led_6_2") == "TRUE" ? "1" : "0";
            let checkbox_led_6_3 = block.getFieldValue("led_6_3") == "TRUE" ? "1" : "0";
            let checkbox_led_6_4 = block.getFieldValue("led_6_4") == "TRUE" ? "1" : "0";
            let checkbox_led_6_5 = block.getFieldValue("led_6_5") == "TRUE" ? "1" : "0";
            let checkbox_led_6_6 = block.getFieldValue("led_6_6") == "TRUE" ? "1" : "0";
            let checkbox_led_6_7 = block.getFieldValue("led_6_7") == "TRUE" ? "1" : "0";
            let checkbox_led_6_8 = block.getFieldValue("led_6_8") == "TRUE" ? "1" : "0";
            let checkbox_led_7_1 = block.getFieldValue("led_7_1") == "TRUE" ? "1" : "0";
            let checkbox_led_7_2 = block.getFieldValue("led_7_2") == "TRUE" ? "1" : "0";
            let checkbox_led_7_3 = block.getFieldValue("led_7_3") == "TRUE" ? "1" : "0";
            let checkbox_led_7_4 = block.getFieldValue("led_7_4") == "TRUE" ? "1" : "0";
            let checkbox_led_7_5 = block.getFieldValue("led_7_5") == "TRUE" ? "1" : "0";
            let checkbox_led_7_6 = block.getFieldValue("led_7_6") == "TRUE" ? "1" : "0";
            let checkbox_led_7_7 = block.getFieldValue("led_7_7") == "TRUE" ? "1" : "0";
            let checkbox_led_7_8 = block.getFieldValue("led_7_8") == "TRUE" ? "1" : "0";
            let checkbox_led_8_1 = block.getFieldValue("led_8_1") == "TRUE" ? "1" : "0";
            let checkbox_led_8_2 = block.getFieldValue("led_8_2") == "TRUE" ? "1" : "0";
            let checkbox_led_8_3 = block.getFieldValue("led_8_3") == "TRUE" ? "1" : "0";
            let checkbox_led_8_4 = block.getFieldValue("led_8_4") == "TRUE" ? "1" : "0";
            let checkbox_led_8_5 = block.getFieldValue("led_8_5") == "TRUE" ? "1" : "0";
            let checkbox_led_8_6 = block.getFieldValue("led_8_6") == "TRUE" ? "1" : "0";
            let checkbox_led_8_7 = block.getFieldValue("led_8_7") == "TRUE" ? "1" : "0";
            let checkbox_led_8_8 = block.getFieldValue("led_8_8") == "TRUE" ? "1" : "0";

            let code = `{position:${position},
                 matrix_code:[${[
                     `"${checkbox_led_1_1 +
                         checkbox_led_1_2 +
                         checkbox_led_1_3 +
                         checkbox_led_1_4 +
                         checkbox_led_1_5 +
                         checkbox_led_1_6 +
                         checkbox_led_1_7 +
                         checkbox_led_1_8}"`,
                     `"${checkbox_led_2_1 +
                         checkbox_led_2_2 +
                         checkbox_led_2_3 +
                         checkbox_led_2_4 +
                         checkbox_led_2_5 +
                         checkbox_led_2_6 +
                         checkbox_led_2_7 +
                         checkbox_led_2_8}"`,
                     `"${checkbox_led_3_1 +
                         checkbox_led_3_2 +
                         checkbox_led_3_3 +
                         checkbox_led_3_4 +
                         checkbox_led_3_5 +
                         checkbox_led_3_6 +
                         checkbox_led_3_7 +
                         checkbox_led_3_8}"`,
                     `"${checkbox_led_4_1 +
                         checkbox_led_4_2 +
                         checkbox_led_4_3 +
                         checkbox_led_4_4 +
                         checkbox_led_4_5 +
                         checkbox_led_4_6 +
                         checkbox_led_4_7 +
                         checkbox_led_4_8}"`,
                     `"${checkbox_led_5_1 +
                         checkbox_led_5_2 +
                         checkbox_led_5_3 +
                         checkbox_led_5_4 +
                         checkbox_led_5_5 +
                         checkbox_led_5_6 +
                         checkbox_led_5_7 +
                         checkbox_led_5_8}"`,
                     `"${checkbox_led_6_1 +
                         checkbox_led_6_2 +
                         checkbox_led_6_3 +
                         checkbox_led_6_4 +
                         checkbox_led_6_5 +
                         checkbox_led_6_6 +
                         checkbox_led_6_7 +
                         checkbox_led_6_8}"`,
                     `"${checkbox_led_7_1 +
                         checkbox_led_7_2 +
                         checkbox_led_7_3 +
                         checkbox_led_7_4 +
                         checkbox_led_7_5 +
                         checkbox_led_7_6 +
                         checkbox_led_7_7 +
                         checkbox_led_7_8}"`,
                     `"${checkbox_led_8_1 +
                         checkbox_led_8_2 +
                         checkbox_led_8_3 +
                         checkbox_led_8_4 +
                         checkbox_led_8_5 +
                         checkbox_led_8_6 +
                         checkbox_led_8_7 +
                         checkbox_led_8_8}"`
                 ]}]}`;

            return [code, Blockly.JavaScript.ORDER_NONE];
        };
        Blockly.JavaScript["matrix_caracter"] = function (block) {
            let position = block.getFieldValue("position") - 1;
            let caracter = Blockly.JavaScript.valueToCode(
                block,
                "caracter",
                Blockly.JavaScript.ORDER_ATOMIC
            );

            let code = `{position:${position},matrix_code:${caracter}}`;
            return [code, Blockly.JavaScript.ORDER_NONE];
        };
    }
};
module.exports = screenMarixFunctions;