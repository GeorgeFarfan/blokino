'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene el menu del desafío del menu de sensores de proximidad
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
                                        <field name="NUM">123</field>
                                    </block>
                                </category>
                                <category name="Texto" colour="210">
                                    <block type="text"/>
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"></category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Sensor de proximidad" colour="150">
                                <block type="proximity_block"></block>
                                <block type="proximity_capture_distances"></block>
                                <block type="proximity_capture_very_close"></block>
                                <block type="proximity_capture_far"></block>
                            </category>
                            <sep gap="32"></sep>
                        </category>
                    </xml>
                `,
      },
    };
  },
};

module.exports = menuFunctions;
