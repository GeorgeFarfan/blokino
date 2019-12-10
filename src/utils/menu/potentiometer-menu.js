"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío del POTENCIOMETRO
 */

let menuFunctions = {
    menu: () => {
        return {
            test_1: {
                code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270">
                            <sep gap="32"></sep>
                            <category name="Variables" custom="VARIABLE" colour="210">
                            </category>
                            <sep gap="32"></sep>
                            <category name="Tipos de datos" colour="120">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                                <sep gap="32"></sep>
                                <category name="Texto" colour="210">
                                    <block type="text"></block>
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="LEDS" colour="20">
                                <block type="led"></block>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Potenciometro" colour="240">
                                <block type="potentiometer" />
                                <block type="potentiometer_blink" />
                            </category>
                            <sep gap="32"></sep>
                        </category>
                    </xml>
                    `
            },
            test_2: {
                code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210">
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category> 
                                <category name="Texto" colour="210">
                                    <block type="text"></block>
                                </category>
                                <sep gap="32"></sep>
                            </category> 
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE">
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Servomotor" colour="180">
                                <block type="servo_motor"></block>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Potenciometro" colour="240">
                                <block type="potentiometer"/>
                                <block type="potentiometer_servo_movement"/>
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>
                `
            }
        };
    }
};

module.exports = menuFunctions;
