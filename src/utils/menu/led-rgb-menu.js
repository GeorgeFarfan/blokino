'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío de los LEDs
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
                                <block type="math_number">
                                    <field name="NUM"></field>
                                </block>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE">
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="LEDS-RGB" colour="20">
                                <block type="led_rgb"></block>
                                <block type="color_led"></block>
                                <block type="blink"></block>
                            </category>
                            <sep gap="32"></sep>
                        </category>
                    </xml> `,
      },
      test_2: {
        code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270">  
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep>  
                            <category name="Tipos de datos" colour="210">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                                <sep gap="32"></sep>
                            </category>
                            <sep gap="32"></sep>  
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"/>
                                <sep gap="32"></sep>
                                <category name="Procedimientos útiles" colour="270">
                                    <block type="timer"/>
                                </category>
                            </category>
                            <sep gap="32"></sep>  
                            <category name="LEDS-RGB" colour="20">
                                <block type="led_rgb"></block>
                                <block type="blink"></block>
                                <block type = "color_led"></block>
                                <block type = "led_pwa_fade_out"></block>
                            </category>
                            <sep gap="32"></sep>  
                        </category>
                    </xml>`,
      },
    };
  },
};

module.exports = menuFunctions;
