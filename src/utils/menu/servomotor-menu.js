"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío del SERVOMOTOR
 */
let menuFunctions = {
    menu: () => {
        return {
            test_1: {
                code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270">
                            <category name="Variables" custom="VARIABLE" colour="210">
                            </category>
                            <sep gap="32"></sep>
                            <category name="Tipos de datos" colour="120">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM">123</field>
                                    </block>
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"></category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Servomotor" colour="180">
                                <block type="servo_motor"></block>
                                <block type="servo_sweep"></block>
                                <block type="servo_sweep_to"></block>
                                <block type="servo_stop"></block>
                                <block type="servo_move"></block>
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
                            <category name="Variables" custom="VARIABLE" colour="210"></category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"/>
                                    </block>
                                </category>
                                <sep gap="32"/>
                            </category>
                            <sep gap="32"/> 
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"/>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Servomotor" colour="180">
                                <block type="servo_motor"/>
                                <block type="servo_sweep"/>
                            </category> 
                        </category>
                    </xml>`
            },
            test_3: {
                code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210">
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"/>
                                    </block></category>
                                    <sep gap="32"/>
                                </category>
                                <sep gap="32"/> 
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"/>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Servomotor" colour="180">
                                <block type="servo_motor"/>
                                <block type="servo_move"/>
                            </category> 
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;
