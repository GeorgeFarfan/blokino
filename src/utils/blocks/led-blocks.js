"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los bloques funcionales de LED y LED-RGB.
 */

"use strict";

let url_documentation = "http://167.99.3.232/get_started",
    ledFunctions = {
        block: Blockly => {
            Blockly.Blocks["led"] = {
                init: function() {
                    this.appendValueInput("led_pin")
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/led.png", 30, 30, "*")
                        )
                        .setCheck("Number")
                        .setAlign(Blockly.ALIGN_CENTRE)
                        .appendField("Crear LED");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(30);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["blink"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Parpadear")
                        .appendField(new Blockly.FieldVariable("led"), "current_led")
                        .appendField("Tiempo")
                        .appendField(new Blockly.FieldNumber(0, 1, 100, 1), "time")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["milisegundos", "miliseconds"],
                                ["segundos", "seconds"],
                                ["minutos", "minutes"]
                            ]),
                            "blink_period"
                        );
                    this.setInputsInline(false);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(30);
                    this.setTooltip("Asigna el parpadeo al led.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["turn_off_led"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Apagar")
                        .appendField(new Blockly.FieldVariable("led"), "current_led_off");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(30);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["turn_on_led"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Encender")
                        .appendField(new Blockly.FieldVariable("led"), "current_led");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(30);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["stop_led"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Detener")
                        .appendField(new Blockly.FieldVariable("led"), "current_led_stop");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(30);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["led_pwa_fade_out"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Apagar lentamente")
                        .appendField(new Blockly.FieldVariable("led"), "current_led");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(45);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["led_pwa_fade_in"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Encender lentamente")
                        .appendField(new Blockly.FieldVariable("led"), "current_led");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(45);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["led_pwa_pulse"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Parpadear por partes")
                        .appendField(new Blockly.FieldVariable("led"), "current_led");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(45);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["led_pwa_pulse_time"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Parpadear por partes ")
                        .appendField(new Blockly.FieldVariable("led"), "current_led");
                    this.appendValueInput("current_time")
                        .setCheck("Number")
                        .appendField(" Tiempo");
                    this.appendDummyInput().appendField(
                        new Blockly.FieldDropdown([
                            ["milisegundos", "miliseconds"],
                            ["segundos", "seconds"]
                        ]),
                        "current_time"
                    );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(45);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["brightness_led"] = {
                init: function() {
                    this.appendValueInput("current_led")
                        .setCheck(null)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField("Brillo")
                        .appendField("Escala")
                        .appendField(new Blockly.FieldNumber(0), "grado")
                        .appendField("Led");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(45);
                    this.setTooltip("Asigna el brillo al led.");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["led"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "led_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `new five.Led({pin:${pin},custom:{type:'LED',blink:0}})`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["blink"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led"),
                    Blockly.Variables.NAME_TYPE
                );
                let time = 0;
                let blink_period = block.getFieldValue("blink_period");
                let blink_time = block.getFieldValue("time");
                switch (blink_period) {
                    case "miliseconds":
                        time = blink_time * 100;
                        break;
                    case "seconds":
                        time = blink_time * 1000;
                        break;
                    case "minutes":
                        time = blink_time * 60000;
                        break;
                }
                let code = `${led}.blink(${time});
                            ${led}.custom.blink=${time};`;

                return code;
            };
            Blockly.JavaScript["turn_off_led"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led_off"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `${led}.stop().off();`;
                return code;
            };

            Blockly.JavaScript["turn_on_led"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `${led}.on();`;
                return code;
            };

            Blockly.JavaScript["stop_led"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led_stop"),
                    Blockly.Variables.NAME_TYPE
                );

                let code = `${led}.stop();`;
                return code;
            };

            // Definir que se necesita un puerto PWA
            Blockly.JavaScript["brightness_led"] = block => {
                let grade = block.getFieldValue("grado");
                let led = Blockly.JavaScript.valueToCode(
                    block,
                    "current_led",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `${led}.brightness(${grade});`;
                return code;
            };

            Blockly.JavaScript["led_pwa_fade_out"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `${led}.fadeOut();`;
                return code;
            };
            Blockly.JavaScript["led_pwa_fade_in"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `${led}.fadeIn();`;
                return code;
            };
            Blockly.JavaScript["led_pwa_pulse"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `${led}.pulse();`;
                return code;
            };
            Blockly.JavaScript["led_pwa_pulse_time"] = block => {
                let led = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_led"),
                    Blockly.Variables.NAME_TYPE
                );
                let time_value = Blockly.JavaScript.valueToCode(
                    block,
                    "current_time",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let time_type = block.getFieldValue("current_time");
                let time = 0;
                switch (time_type) {
                    case "miliseconds":
                        time = time_value * 100;
                        break;
                    case "seconds":
                        time = time_value * 1000;
                        break;
                    case "minutes":
                        time = time_value * 60000;
                        break;
                }
                let code = `${led}.pulse(
                                {easing: 'linear',
                                duration:${time},
                                cuePoints:[0, 0.2, 0.4, 0.6, 0.8, 1], 
                                keyFrames: [0, 10, 0, 50, 0, 255] 
                            });`;
                return code;
            };
        }
    };

module.exports = ledFunctions;
