"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque LED-RGB.
 */

let url_documentation = "http://167.99.3.232/documentation",
    ledRgbFunctions = {
        block: Blockly => {
            Blockly.Blocks["led_rgb"] = {
                init: function() {
                    this.appendValueInput("pin_red")
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/led-rgb.png", 30, 30, "*")
                        )
                        .setCheck("Number")
                        .appendField("Crear LED-RGB")
                        .appendField("Rojo");
                    this.appendValueInput("pin_green")
                        .setCheck("Number")
                        .appendField("Verde");
                    this.appendValueInput("pin_blue")
                        .setCheck("Number")
                        .appendField("Azul");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(30);
                    this.setTooltip("Crea un Led RGB con su entrada.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["led_rgb_intensity"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Intensidad LED-RGB")
                        .appendField(new Blockly.FieldVariable("LED_RGB"), "current_led_rgb")
                        .appendField("Rango")
                        .appendField(new Blockly.FieldNumber(0, 0, 100), "current_range_intensity");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(30);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["color_led"] = {
                init: function() {
                    this.appendValueInput("led")
                        .setCheck(null)
                        .appendField("Dar color")
                        .appendField(new Blockly.FieldColour("#FF0000"), "led_color")
                        .appendField(" al Led");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(30);
                    this.setTooltip("Asigna color al led RGB.");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["led_rgb"] = block => {
                let pin_red = Blockly.JavaScript.valueToCode(
                    block,
                    "pin_red",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let pin_green = Blockly.JavaScript.valueToCode(
                    block,
                    "pin_green",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let pin_blue = Blockly.JavaScript.valueToCode(
                    block,
                    "pin_blue",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `new five.Led.RGB(
                    {
                        pins:{ 
                            red:${pin_red},
                            green:${pin_green},
                            blue:${pin_blue}
                        },custom:{
                            type:'LED-RGB',
                            blink:0,
                            color:''
                        }
                    }
                )`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["color_led"] = block => {
                let colour = block.getFieldValue("led_color");
                let led_rgb = Blockly.JavaScript.valueToCode(
                    block,
                    "led",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `${led_rgb}.color('${colour}');
                            ${led_rgb}.custom.color='${colour}';`;
                return code;
            };

            Blockly.JavaScript["led_rgb_intensity"] = block => {
                let led_rgb = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led_rgb"),
                    Blockly.Variables.NAME_TYPE
                );
                let intensity = block.getFieldValue("current_range_intensity");
                let code = `${led_rgb}.intensity(
                                        ${intensity})`;
                return code;
            };
        }
    };

module.exports = ledRgbFunctions;
