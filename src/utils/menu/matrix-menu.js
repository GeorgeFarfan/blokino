"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Matrix-LEDs Menu.
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
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                                <category name="Texto" colour="210">
                                    <block type="text"/>
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Funciones" colour="100">
                                <category name="Crear Procedimiento" colour="100" custom="PROCEDURE"></category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Matrix LEDs" colour="15">
                                <block type="matrix"></block>
                                <block type="message_screen"></block>
                            </category>
                            <sep gap="32"></sep>
                        </category>
                    </xml>
                    `
            },
            test_2: {
                code: ` 
                    <xml>
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210">
                                <category name="Texto" colour="210">
                                    <block type="text"/>
                                </category>
                                <sep gap="32"/>
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Procedimientos" colour="100">
                                <category name="Crear Procedimiento" colour="100" custom="PROCEDURE">
                                </category>
                            </category> 
                            <category name="Matrix LEDs" colour="15">
                                <block type="matrix"/>
                                <block type="print_screen"/>
                            </category> 
                            <sep gap="32">< /sep>
                        </category>
                    </xml>`
            },
            test_3: {
                code: ` 
                    <xml>
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210">
                                <category name="Texto" colour="210">
                                    <block type="text"/></category>
                                    <sep gap="32"/>
                                    <category name="Número" colour="210">
                                        <block type="math_number">
                                            <field name="NUM"></field>
                                        </block>
                                    </category>
                                </category>
                                <sep gap="32"></sep> 
                            <category name="Procedimientos" colour="100">
                                <category name="Crear Procedimiento" colour="100" custom="PROCEDURE">
                                </category>
                            </category> 
                            <category name="Matrix LEDs" colour="15">
                                <block type="matrix"/>
                                <block type="matrix_paint"/>
                            </category>
                            <sep gap="32"></sep>
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;