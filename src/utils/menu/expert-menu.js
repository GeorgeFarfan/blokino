"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío de los LEDs
 */

let menuFunctions = {
    menu: () => {
        return {
            main: {
                code: `<xml id="toolbox">
                                  <category name="Bloques" colour="270">
                                    <category name="Variables" custom="VARIABLE" colour="315">
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Tipos de datos" colour="120">
                                        <category name="Número" colour="210">
                                            <block type="math_number">
                                                <field name="NUM">123</field>
                                            </block>
                                            <block type="math_arithmetic">
                                                <value name="A">
                                                    <shadow type="math_number">
                                                        <field name="NUM">1</field>
                                                    </shadow>
                                                </value>
                                                <value name="B">
                                                    <shadow type="math_number">
                                                        <field name="NUM">1</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="math_random_int">
                                                <value name="FROM">
                                                    <shadow type="math_number">
                                                        <field name="NUM">1</field>
                                                    </shadow>
                                                </value>
                                                <value name="TO">
                                                    <shadow type="math_number">
                                                        <field name="NUM">100</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Texto" colour="135">
                                            <block type="text"></block>
                                            <block type="text_changeCase">
                                                <value name="TEXT">
                                                    <shadow type="text">
                                                        <field name="TEXT">abc</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="text_trim">
                                                <value name="TEXT">
                                                    <shadow type="text">
                                                        <field name="TEXT">abc</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="text_append">
                                                <value name="TEXT">
                                                    <shadow type="text"></shadow>
                                                </value>
                                            </block>
                                            <block type="text_length">
                                                <value name="VALUE">
                                                    <shadow type="text">
                                                        <field name="TEXT">abc</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="text_isEmpty">
                                                <value name="VALUE">
                                                    <shadow type="text">
                                                        <field name="TEXT">abc</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Lista" colour="255">
                                            <block type="lists_create_empty"></block>
                                            <block type="lists_create_with"></block>
                                            <block type="lists_length"></block>
                                            <block type="lists_isEmpty"></block>
                                        </category>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Estructuras de Control" colour="290">
                                        <category name="Condiciones lógicas" colour="210">
                                            <block type="logic_compare"></block>
                                            <block type="logic_operation"></block>
                                            <block type="logic_negate"></block>
                                            <block type="logic_boolean"></block>
                                            <block type="logic_null"></block>
                                            <block type="logic_ternary"></block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Decisiones" colour="210">
                                            <block type="controls_if"></block>
                                            <block type="controls_if">
                                                <mutation else="1"></mutation>
                                            </block>
                                            <block type="controls_if">
                                                <mutation elseif="1" else="1"></mutation>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Bucles" colour="100">
                                            <block type="controls_repeat_ext">
                                                <value name="TIMES">
                                                    <block type="math_number">
                                                        <field name="NUM">10</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="controls_whileUntil"></block>
                                            <block type="controls_for">
                                                <field name="VAR">i</field>
                                                <value name="FROM">
                                                    <block type="math_number">
                                                        <field name="NUM">1</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="controls_for">
                                                <field name="VAR">i</field>
                                                <value name="FROM">
                                                    <block type="math_number">
                                                        <field name="NUM">1</field>
                                                    </block>
                                                </value>
                                                <value name="TO">
                                                    <block type="math_number">
                                                        <field name="NUM">10</field>
                                                    </block>
                                                </value>
                                                <value name="BY">
                                                    <block type="math_number">
                                                        <field name="NUM">1</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="controls_forEach"></block>
                                            <block type="controls_flow_statements"></block>
                                        </category>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Procedimientos" colour="100">
                                        <category name="Crear Procedimiento" colour="300" custom="PROCEDURE"></category>
                                        <sep gap="32"></sep>
                                        <category name="Procedimientos útiles" colour="345">
                                            <block type="timer"></block>
                                            <block type="interval_time"></block>
                                        </category>
                                        <category name="Mensajes de ayuda" colour="60">
                                            <block type="block_message"></block>
                                        </category>
                                        <category name="Fechas" colour="30">
                                            <block type="getDay"></block>
                                            <block type="getMonth"></block>
                                            <block type="getYear"></block>
                                            <block type="getDate"></block>
                                        </category>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Leds" colour="20">
                                        <block type="led">
                                            <value name="led_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">13</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="led_rgb">
                                            <value name="pin_red">
                                                <shadow type="math_number">
                                                    <field name="NUM">6</field>
                                                </shadow>
                                            </value>
                                            <value name="pin_green">
                                                <shadow type="math_number">
                                                    <field name="NUM">5</field>
                                                </shadow>
                                            </value>
                                            <value name="pin_blue">
                                                <shadow type="math_number">
                                                    <field name="NUM">3</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="color_led"></block>
                                        <block type="blink"></block>
                                        <block type="turn_on_led"></block>
                                        <block type="stop_led"></block>
                                        <block type="turn_off_led"></block>
                                        <block type="brightness_led"></block>
                                        <block type="led_pwa_fade_out"></block>
                                        <block type="led_pwa_fade_in"></block>
                                        <block type="led_pwa_pulse"></block>
                                        <block type="led_pwa_pulse_time">
                                            <value name="current_time">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                            </value>
                                        </block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Botones" colour="315">
                                        <block type="button">
                                            <value name="button_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="button_press"></block>
                                        <block type="button_hold"></block>
                                        <block type="button_up"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Pulsadores" colour="0">
                                        <block type="button_bumper">
                                            <value name="bumper_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="button_bump_press"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Interruptor" colour="330">
                                        <block type="switch_new_block">
                                            <value name="switch_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="switch_open"></block>
                                        <block type="switch_close"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Joystick" colour="150">
                                        <category name="Crear Joystick" colour="150">
                                            <block type="joystick">
                                                <value name="joy_x">
                                                    <shadow type="text">
                                                        <field name="TEXT">A1</field>
                                                    </shadow>
                                                </value>
                                                <value name="joy_y">
                                                    <shadow type="text">
                                                        <field name="TEXT">A2</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <category name="Movimientos" colour="150">
                                            <block type="joy_detected_movement"></block>
                                            <block type="joy_movement_up"></block>
                                            <block type="joy_movement_down"></block>
                                            <block type="joy_movement_left"></block>
                                            <block type="joy_movement_right"></block>
                                            <block type="joy_movement_up_left"></block>
                                            <block type="joy_movement_up_right"></block>
                                            <block type="joy_movement_down_left"></block>
                                            <block type="joy_movement_down_right"></block>
                                        </category>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Potenciometro" colour="240">
                                        <block type="potentiometer">
                                            <value name="potentiometer_pin">
                                                <shadow type="text">
                                                    <field name="TEXT">A3</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="potentiometer_blink"></block>
                                        <block type="potentiometer_brightness"></block>
                                        <block type="potentiometer_servo_movement"></block>
                                        <block type="potentiometer_blink_list">
                                            <value name="current_list_leds">
                                                <block type="variables_get">
                                                    <field name="VAR">Leds</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="potentiometer_brightness_list">
                                            <value name="current_list_leds">
                                                <block type="variables_get">
                                                    <field name="VAR">Leds</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="potentiometer_servo_list_mov">
                                            <value name="current_list_servos">
                                                <block type="variables_get">
                                                    <field name="VAR">Servomotores</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Matrix-Leds" colour="15">
                                        <category name="Crear Matrix-Leds" colour="15">
                                            <block type="matrix">
                                                <value name="pin_cs">
                                                    <shadow type="math_number">
                                                        <field name="NUM">2</field>
                                                    </shadow>
                                                </value>
                                                <value name="pin_din">
                                                    <shadow type="math_number">
                                                        <field name="NUM">3</field>
                                                    </shadow>
                                                </value>
                                                <value name="pin_clk">
                                                    <shadow type="math_number">
                                                        <field name="NUM">4</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Mensajes" colour="15">
                                            <block type="message_screen">
                                                <value name="current_screen_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Gestos" colour="15">
                                            <block type="print_screen"></block>
                                            <block type="matrix_paint"></block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Acciones" colour="15">
                                            <block type="screen_on"></block>
                                            <block type="screen_off"></block>
                                            <block type="screen_clear"></block>
                                            <block type="blink_screen"></block>
                                        </category>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Zumbador" colour="345">
                                        <block type="buzzer">
                                            <value name="buzzer_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">2</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="buzzer_new_note"></block>
                                        <block type="buzzer_new_note_mute"></block>
                                        <block type="buzzer_play_with_notes">
                                            <value name="current_list_notes">
                                                <block type="variables_get">
                                                    <field name="VAR">Notas</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="buzzer_play_with_sound"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Servomotor" colour="180">
                                        <block type="servo_motor">
                                            <value name="servo_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">5</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="servo_motor_continuos">
                                            <value name="pin_servo_continuos">
                                                <shadow type="math_number">
                                                    <field name="NUM">7</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="servo_motor_with_position">
                                            <value name="servo_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">5</field>
                                                </shadow>
                                            </value>
                                            <value name="servo_position">
                                                <shadow type="math_number">
                                                    <field name="NUM">90</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="servo_sweep"></block>
                                        <block type="servo_sweep_with_speed"></block>
                                        <block type="servo_sweep_to_from_with_speed"></block>
                                        <block type="servo_sweep_to"></block>
                                        <block type="servo_stop"></block>
                                        <block type="servo_move">
                                            <value name="value_grade">
                                                <shadow type="math_number">
                                                    <field name="NUM">90</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="servo_center"></block>
                                        <block type="servo_extreme_min"></block>
                                        <block type="servo_extreme_max"></block>
                                        <block type="servo_move_home"></block>
                                        <block type="servo_continuos_forward"></block>
                                        <block type="servo_continuos_backwards"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Sensor de proximidad" colour="150">
                                        <block type="proximity_block">
                                            <value name="sensor_prox_pin">
                                                <shadow type="text">
                                                    <field name="TEXT">A0</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="proximity_block_with_freq">
                                            <value name="sensor_prox_pin">
                                                <shadow type="text">
                                                    <field name="TEXT">A0</field>
                                                </shadow>
                                            </value>
                                            <value name="frecuency">
                                                <shadow type="math_number">
                                                    <field name="NUM">10</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="proximity_capture_distances"></block>
                                        <block type="proximity_capture_very_close"></block>
                                        <block type="proximity_capture_near"></block>
                                        <block type="proximity_capture_far"></block>
                                        <block type="proximity_capture_far_away"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Teclado" colour="345">
                                        <block type="keypad_block"></block>
                                        <block type="keypad_press"></block>
                                        <block type="keypad_press_key"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Sensor de Movimiento" colour="90">
                                        <block type="motion_sensor_block">
                                            <value name="sensor_mov_pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="motion_sensor_fire"></block>
                                        <block type="motion_sensor_out_fire"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Consola de mensajes" colour="75">
                                        <category name="Consola con 2 filas" colour="75">
                                            <block type="lcd_create_two_rows"></block>
                                            <block type="lcd_two_rows_no_scroll">
                                                <value name="msg_first_row">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la primer fila ...</field>
                                                    </shadow>
                                                </value>
                                                <value name="msg_second_row">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la segunda fila ...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="lcd_two_rows_scroll">
                                                <value name="first_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la primer fila ...</field>
                                                    </shadow>
                                                </value>
                                                <value name="second_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la segunda fila ...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="lcd_two_rows_switch">
                                                <value name="message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje ...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Consola con 4 filas" colour="90">
                                            <block type="lcd_create_four_rows"></block>
                                            <block type="lcd_four_rows_no_scroll">
                                                <value name="first_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la primer fila ...</field>
                                                    </shadow>
                                                </value>
                                                <value name="second_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la segunda fila ...</field>
                                                    </shadow>
                                                </value>

                                                <value name="third_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la tercer fila ...</field>
                                                    </shadow>
                                                </value>

                                                <value name="fourth_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la cuarta fila ...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="lcd_four_rows_switch">
                                                <value name="message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la primer fila ...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                            <block type="lcd_four_rows_scroll">
                                                <value name="first_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la primer fila ...</field>
                                                    </shadow>
                                                </value>
                                                <value name="second_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la segunda fila ...</field>
                                                    </shadow>
                                                </value>

                                                <value name="third_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la tercera fila ...</field>
                                                    </shadow>
                                                </value>

                                                <value name="fourth_message">
                                                    <shadow type="text">
                                                        <field name="TEXT">Mensaje de la cuarta fila ...</field>
                                                    </shadow>
                                                </value>
                                            </block>
                                        </category>
                                        <sep gap="32"></sep>
                                        <category name="Otros bloques" colour="60">
                                            <block type="lcd_clean"></block>
                                            <block type="lcd_off"></block>
                                            <block type="lcd_on"></block>
                                        </category>
                                    </category>
                                    <sep gap="32"></sep>
                                    <category name="Motores" colour="225">
                                        <block type="motor_new">
                                            <value name="pin">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                            </value>
                                        </block>
                                        <block type="motor_spin"></block>
                                        <block type="motor_spin_code"></block>
                                        <block type="motor_stop"></block>
                                        <block type="motor_stop_code"></block>
                                        <block type="motor_spin_verify"></block>
                                    </category>
                                    <sep gap="32"></sep>
                                </category>
                        </xml>`
            }
        };
    }
};

module.exports = menuFunctions;
