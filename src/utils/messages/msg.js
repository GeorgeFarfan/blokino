"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los mensajes de todo Blokino.
 */
let messageFunctions = {
    variable: variable => {
        return {
            empty: {
                msg:
                    "No se ingreso ningún nombre para la variable. Las variables deben tener un nombre.",
                btn: "Volvelo a intentar"
            },
            error_expert: {
                msg: "El nombre de la variable es incorrecto. Prueba intentando con otro nombre.",
                btn: "Volvelo a intentar"
            },
            error: {
                msg:
                    "El nombre de la variable es incorrecto. Los nombres válidos estan definidos en las instrucciones.",
                btn: "Volvelo a intentar"
            },
            incorrect: {
                msg: `El nombre de la variable <strong>${variable}</strong> es incorrecto. Los nombres válidos estan definidos en las instrucciones.`,
                btn: "Volvelo a intentar"
            },
            duplicate: {
                msg: `Ya creaste una variable con el nombre <strong>${variable}</strong>. No es necesario que la crees de nuevo.`,
                btn: "Continuar"
            }
        };
    },
    devices: () => {
        return {
            not_found: {
                msg:
                    "No se seleccionó ningún dispositivo. Para ejecutar el programa se debe seleccionar un dispositivo.",
                msg_clean:
                    "No se seleccionó ningún dispositivo. Para ejecutar el reinicio, se debe seleccionar un dispositivo.",
                msg_config:
                    "No se seleccionó ningún dispositivo. Para ejecutar la configuración, se debe seleccionar un dispositivo.",
                btn: "Volvelo a intentar"
            }
        };
    },
    code: test => {
        return {
            execute_title: {
                msg:
                    "El programa no cumple con la consigna de la <strong>Prueba " +
                    test +
                    "</strong>.",
                btn: "Volve a intentarlo"
            },
            empty_execute: {
                msg:
                    "No hay código para ejecutar. Comienza a usar los bloques de Blokino y vuelve a intentarlo.",
                btn: "Volvelo a intentar"
            }
        };
    }
};

module.exports = messageFunctions;
