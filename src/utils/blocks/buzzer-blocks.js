"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque BUZZER.
 */

let url_documentation = "http://167.99.3.232/get_started",
    buzzerFunction = {
        block: Blockly => {
            Blockly.Blocks["buzzer"] = {
                init: function() {
                    this.appendValueInput("buzzer_pin")
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/buzzer.png", 30, 30, "*")
                        )
                        .setCheck("Number")
                        .appendField("Crear Zumbador");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(345);
                    this.setTooltip("Crea un Zumbador, debe agregarse su entrada digital.");
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["buzzer_stop"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Detener Zumbador")
                        .appendField(new Blockly.FieldVariable("zumbador"), "current_buzzer");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(345);
                    this.setTooltip("Este bloque se usa para detener al Zumbador.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["buzzer_off"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Apagar Zumbador")
                        .appendField(new Blockly.FieldVariable("zumbador"), "current_buzzer");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(345);
                    this.setTooltip("Este bloque se usa para apagar al Zumbador.");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["buzzer_play_with_sound"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Hacer sonar Zumbador")
                        .appendField(new Blockly.FieldVariable("zumbador"), "current_buzzer")
                        .appendField("con Sonido")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["Star Wars", "star_wars"],
                                ["Mario Bros - 1", "mario_bros_1"],
                                ["Mario Bros - 2", "mario_bros_2"],
                                ["Claxon", "claxon"]
                            ]),
                            "current_sound"
                        );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(345);
                    this.setTooltip(
                        "Este bloque se para reproducir sonidos del listado en el Zumbador."
                    );
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["buzzer_new_note"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Crear Nota Musical")
                        .appendField("Tipo de Nota")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["A", "A"],
                                ["B", "B"],
                                ["C", "C"],
                                ["D", "D"],
                                ["E", "E"],
                                ["F", "F"],
                                ["G", "G"]
                            ]),
                            "current_note"
                        )
                        .appendField(" Grado de la Nota")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["Solo nota", "Solo nota"],
                                ["1", "1"],
                                ["2", "2"],
                                ["3", "3"],
                                ["4", "4"],
                                ["5", "5"]
                            ]),
                            "current_grade"
                        )
                        .appendField("  Tiempo / Ritmo")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["1", "1"],
                                ["2", "2"],
                                ["3", "3"],
                                ["4", "4"]
                            ]),
                            "current_duration"
                        )
                        .appendField(" milisegundo");
                    this.setInputsInline(false);
                    this.setOutput(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["buzzer_new_note_mute"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Crear Pausa")
                        .appendField("Tiempo de la pausa")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["1", "1"],
                                ["2", "2"],
                                ["3", "3"],
                                ["4", "4"]
                            ]),
                            "current_time"
                        )
                        .appendField(" milisegundo");
                    this.setInputsInline(false);
                    this.setOutput(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["buzzer_play_with_notes"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Hacer sonar el ")
                        .appendField(new Blockly.FieldVariable("zumbador"), "current_buzzer")
                        .appendField(" Velocidad")
                        .appendField(new Blockly.FieldNumber(0, 0, 30), "current_time");
                    this.appendValueInput("current_list_notes")
                        .setCheck("Array")
                        .appendField("  con notas");
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["buzzer_is_playing"] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("esta sonando?")
                        .appendField(new Blockly.FieldVariable("zumbador"), "current_buzzer");
                    this.setOutput(true, null);
                    this.setColour(345);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["buzzer"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "buzzer_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `new five.Piezo(
                                    { 
                                        pin:${pin},
                                        custom:{
                                            type:'BUZZER',
                                            code:{
                                                state:'',
                                                notes:'',
                                                tempo:'',
                                                grade:''
                                            }
                                        }
                                    }
                                )`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["buzzer_play_with_notes"] = block => {
                let buzzer = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_buzzer"),
                    Blockly.Variables.NAME_TYPE
                );
                let time = block.getFieldValue("current_time");
                let notes = Blockly.JavaScript.valueToCode(
                    block,
                    "current_list_notes",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let tempo = time * 100;
                let code = `
                            ${buzzer}.custom.code.status = 'playing';
                            ${buzzer}.custom.code.notes = ${notes};
                            ${buzzer}.play({
                                    song:${notes},
                                    tempo:${tempo}
                                }
                            );`;
                return code;
            };

            Blockly.JavaScript["buzzer_new_note"] = block => {
                let note = block.getFieldValue("current_note");
                let grade = block.getFieldValue("current_grade");
                let duration = block.getFieldValue("current_duration");
                let code = "";
                if (grade === "Solo nota") {
                    code = `
                            ['${note}','${duration}']
                        `;
                } else {
                    code = `
                            ['${note}','${grade}','${duration}']`;
                }
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
            Blockly.JavaScript["buzzer_new_note_mute"] = block => {
                let time = block.getFieldValue("current_time");
                let code = `[null, '${time}']`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["buzzer_stop"] = block => {
                let buzzer = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_buzzer"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `
                            ${buzzer}.custom.code.status = 'stop';
                            ${buzzer}.noTone;
                        `;
                return code;
            };
            Blockly.JavaScript["buzzer_off"] = block => {
                let buzzer = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_buzzer"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `
                            ${buzzer}.custom.code.status = 'off';
                            ${buzzer}.off;`;
                return code;
            };

            Blockly.JavaScript["buzzer_play_with_sound"] = block => {
                let buzzer = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_buzzer"),
                    Blockly.Variables.NAME_TYPE
                );
                let sound = block.getFieldValue("current_sound");
                let code = "";
                switch (sound) {
                    case "claxon":
                        code = `
                                ${buzzer}.custom.code.status = 'play with sound';
                                ${buzzer}.custom.code.notes = 'claxon';
                                ${buzzer}.play({
                                    song:[
                                        ['C4', 4],
                                        [null, 4],
                                        ['C4', 4],
                                        [null, 4],
                                        ['C4', 4],
                                        [null, 8]
                                    ],
                                    tempo: 150
                                });`;
                        break;
                    case "mario_bros_1":
                        code = `
                                ${buzzer}.custom.code.status = 'play with sound';
                                ${buzzer}.custom.code.notes = 'mario-1';
                                ${buzzer}.play({
                                    song:[
                                        ['E5', 1 / 4],
                                        [null, 1 / 4],
                                        ['E5', 1 / 4],
                                        [null, 3 / 4],
                                        ['E5', 1 / 4],
                                        [null, 3 / 4],
                                        ['C5', 1 / 4],
                                        [null, 1 / 4],
                                        ['E5', 1 / 4],
                                        [null, 3 / 4],
                                        ['G5', 1 / 4],
                                        [null, 7 / 4],
                                        ['G4', 1 / 4],
                                        [null, 7 / 4]
                                    ],
                                    tempo: 200
                                });`;
                        break;
                    case "mario_bros_2":
                        code = `
                                ${buzzer}.custom.code.status = 'play with sound';
                                ${buzzer}.custom.code.notes = 'mario-2';
                                ${buzzer}.play(
                                    { 
                                        song:[  
                                            ['C5', 1/4],
                                            [null, 5 / 4],
                                            ['G4', 1 / 4],
                                            [null, 5 / 4],
                                            ['E4', 1 / 4],
                                            [null, 5 / 4],
                                            ['E4', 1 / 4],
                                            [null, 1 / 4],
                                            ['B4', 1 / 4],
                                            [null, 3 / 4],
                                            ['A#4', 1 / 4],
                                            [null, 1 / 4],
                                            ['E4', 1 / 4],
                                            [null, 3 / 4],
                                            ['G4', 1 / 4],
                                            [null, 1 / 4],
                                            ['E5', 1 / 4],
                                            [null, 3 / 4],
                                            ['G5', 1 / 4],
                                            [null, 1 / 4],
                                            ['A5', 1 / 4],
                                            [null, 3 / 4],
                                            ['F5', 1 / 4],
                                            [null, 1 / 4],
                                            ['G5', 1 / 4],
                                            [null, 3 / 4],
                                            ['E5', 1 / 4],
                                            [null, 3 / 4],
                                            ['C5', 1 / 4],
                                            [null, 1 / 4],
                                            ['D5', 1 / 4],
                                            [null, 1 / 4],
                                            ['B4', 1 / 4],
                                            [null, 3 / 4]
                                        ],tempo:200
                                    }
                                );`;
                        break;
                    case "star_wars":
                        code = `
                                ${buzzer}.custom.code.status = 'play with sound';
                                ${buzzer}.custom.code.notes = 'star-wars';
                                ${buzzer}.play({song:[
                                    ['A', 500],
                                    [null, 50],
                                    ['A', 500],
                                    [null, 50],
                                    ['A', 500],
                                    [null, 50],
                                    ['F', 350],
                                    [null, 50],
                                    ['C5', 150],
                                    [null, 50],
                                    ['A', 500],
                                    [null, 50],
                                    ['F', 350],
                                    [null, 50],
                                    ['C5', 150],
                                    [null, 50],
                                    ['A', 650],
                                    [null, 50],
                                    [null, 500],
                                    ['E5', 500],
                                    [null, 50],
                                    ['E5', 500],
                                    [null, 50],
                                    ['E5', 500],
                                    [null, 50],
                                    ['F5', 350],
                                    [null, 50],
                                    ['C5', 150],
                                    [null, 50],
                                    ['G4', 500],
                                    [null, 50],
                                    ['F', 350],
                                    [null, 50],
                                    ['C5', 150],
                                    [null, 50],
                                    ['A', 650],
                                    [null, 50],
                                    [null, 500],

                                    ['A5', 500],
                                    [null, 50],
                                    ['A', 300],
                                    [null, 50],
                                    ['A', 150],
                                    [null, 50],
                                    ['A5', 500],
                                    [null, 50],
                                    ['G#5', 325],
                                    [null, 50],
                                    ['G5', 175],
                                    [null, 50],
                                    ['F#5', 125],
                                    [null, 50],
                                    ['F5', 125],
                                    [null, 50],
                                    ['F#5', 250],
                                    [null, 50],
                                    [null, 325],
                                    ['A4', 250],
                                    [null, 50],
                                    ['D#5', 500],
                                    [null, 50],
                                    ['D5', 325],
                                    [null, 50],
                                    ['C#5', 175],
                                    [null, 50],
                                    ['C5', 125],
                                    [null, 50],
                                    ['B', 125],
                                    [null, 50],
                                    ['C5', 250],
                                    [null, 50],
                                    [null, 350],

                                    ['F', 250],
                                    [null, 50],
                                    ['G4', 500],
                                    [null, 50],
                                    ['F', 350],
                                    [null, 50],
                                    ['A', 125],
                                    [null, 50],
                                    ['C5', 500],
                                    [null, 50],
                                    ['A', 375],
                                    [null, 50],
                                    ['C5', 125],
                                    [null, 50],
                                    ['E5', 650],
                                    [null, 50],
                                    [null, 500],

                                    ['A5', 500],
                                    [null, 50],
                                    ['A', 300],
                                    [null, 50],
                                    ['A', 150],
                                    [null, 50],
                                    ['A5', 500],
                                    [null, 50],
                                    ['G#5', 325],
                                    [null, 50],
                                    ['G5', 175],
                                    [null, 50],
                                    ['F#5', 125],
                                    [null, 50],
                                    ['F5', 125],
                                    [null, 50],
                                    ['F#5', 250],
                                    [null, 50],
                                    [null, 325],
                                    ['A4', 250],
                                    [null, 50],
                                    ['D#5', 500],
                                    [null, 50],
                                    ['D5', 325],
                                    [null, 50],
                                    ['C#5', 175],
                                    [null, 50],
                                    ['C5', 125],
                                    [null, 50],
                                    ['B', 125],
                                    [null, 50],
                                    ['C5', 250],
                                    [null, 50],
                                    [null, 350],

                                    ['F', 250],
                                    [null, 50],
                                    ['G4', 500],
                                    [null, 50],
                                    ['F', 375],
                                    [null, 50],
                                    ['C5', 125],
                                    [null, 50],
                                    ['A', 500],
                                    [null, 50],
                                    ['F', 375],
                                    [null, 50],
                                    ['C5', 125],
                                    [null, 50],
                                    ['A', 650],
                                    [null, 50],
                                    [null, 650]
                                ],tempo:100000 
                            }
                        );`;
                        break;
                }

                return code;
            };

            Blockly.JavaScript["buzzer_is_playing"] = block => {
                let buzzer = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_buzzer"),
                    Blockly.Variables.NAME_TYPE
                );
                let code = `${buzzer}.isPlaying`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
        }
    };

module.exports = buzzerFunction;
