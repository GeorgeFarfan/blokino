"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los mensajes de todo Blokino.
 */
let messageFunctions = {
    variable: variable => {
        return {
            empty: {
                msg: `No se ingreso ningún nombre para la variable. Las variables deben tener un nombre válido, como por ejemplo: <strong><span class="badge badge-warning">mi_primer_led</span></strong>.`,
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
    },
    errors: () => {
        return {
            modal: {
                empty_block_code: `No hay bloques funcionales en tu programa. Agrega algunos y volvelo a intentar.`,
                syntax: `El programa tiene algún error.<strong> Consejo: revisar variables, bloques y funciones.</strong>`,
                nested_functions: `Se agruparon funciones con el mismo nombre. Para poder ejecutar el programa debe solucionar esto.`,
                johnny_five: `Se produjo un error con el Arduino conectado. <strong> Consejo: desconectar el Arduino y conectarlo en otro puerto. Esperar 5 segundos y volver a ejecutar el programa.</strong>`
            }
        };
    },
    help: device => {
        let device_available = device ? device : "Arduino";
        return {
            modal: {
                reboot_device: `Reiniciando la placa <span class="badge badge-secondary">${device_available}</span> ...`
            }
        };
    },
    success: () => {
        return {
            modal: {
                correct_validation: `<div><span>El programa se armó correctamente y se va a ejecutar en la placa Arduino que seleccionaste.</span></div>
                 <div class="mt-3"><span class="badge-alert p-2"><strong><i class="far fa-info-circle icon-link"></i></strong> Revisar que el circuito este correctamente armado.</span></div>`
            }
        };
    }
};

module.exports = messageFunctions;
