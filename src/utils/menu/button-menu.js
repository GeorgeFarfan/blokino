"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío de los LEDs
 */

let menuFunctions = {
    menu: () => {
        return {
            test_1: {
                code: `
                    <xml id="toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210">
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <block type="math_number">
                                    <field name="NUM"></field>
                                </block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Procedimientos" colour="100">
                                <category name="Crear Procedimiento" colour="100" custom="PROCEDURE">
                                </category>
                                <sep gap="32"></sep>
                            </category><sep gap="32"></sep> 
                            <category name="Botones" colour="315">
                                <block type="button"></block>
                                <block type="button_press"></block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Leds" colour="20">
                                <block type="led"></block>
                                <block type="blink"></block>
                                <block type="turn_on_led"></block>
                                <block type="stop_led"></block>
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            },
            test_2: {
                code: `
                    <xml id="toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"></category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <block type="math_number">
                                    <field name="NUM"></field>
                                </block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Procedimientos" colour="100">
                                <category name="Crear Procedimiento" colour="100" custom="PROCEDURE">
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Botones" colour="315">
                                <block type="button"></block>
                                <block type="button_press"></block>
                            </category><sep gap="32"></sep> 
                            <category name="Pulsadores" colour="0">
                                <block type="button_bumper"></block>
                                <block type="button_bump_press"></block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Leds" colour="20">
                                <block type="led"></block>
                                <block type="blink"></block>
                                <block type="turn_on_led"></block>
                                <block type="stop_led"></block>
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            },
            test_3: {
                code: `
                    <xml id="toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"></category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <block type="math_number">
                                    <field name="NUM"></field>
                                </block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Procedimientos" colour="100">
                                <category name="Crear Procedimiento" colour="100" custom="PROCEDURE">
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Interruptor" colour="0">
                                <block type="switch_new_block">
                                </block><block type="switch_open">
                                </block><block type="switch_close">
                                </block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Leds" colour="20">
                                <block type="led"></block>
                                <block type="blink"></block>
                                <block type="turn_on_led"></block>
                                <block type="stop_led"></block>
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;