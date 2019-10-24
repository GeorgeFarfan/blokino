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
                            </category>
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"></category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="LEDs" colour="20">
                                <block type="led"></block>
                                <block type="blink"></block>
                                <block type="stop_led"></block>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Sensor de Movimiento" colour="60">
                                <block type="motion_sensor_block"></block>
                                <block type="motion_sensor_fire"></block>
                                <block type="motion_sensor_out_fire"></block>
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
