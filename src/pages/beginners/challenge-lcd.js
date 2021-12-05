'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene toda la configuracion, que necesita el desafío del DISPLAY.
 */

let validate_result_code = [[], [], []],
  current_test = 'test_1',
  variables = [],
  conditions = {
    test_1: false,
    test_2: false,
  },
  currentCallback = null,
  validator = require('../../utils/validators/lcd-validator');

$('#modal-new-variable').on('hidden.bs.modal', () => {
  let new_variable = $('#new-variable').val().replace(/\s/g, '');
  if (new_variable === 'CONSOLA_MENSAJES') {
    if (!variables.includes(new_variable)) {
      if (utils.allLetters(new_variable)) {
        currentCallback(new_variable);
        variables.push(new_variable);
        $('#new-variable').val('');
      } else {
        utils.setModalError(
          '',
          messages.variable(new_variable).error.msg,
          messages.variable(new_variable).error.btn,
        );
      }
    } else {
      utils.setModalError(
        '',
        messages.variable(new_variable).duplicate.msg,
        messages.variable(new_variable).duplicate.btn,
      );
    }
  } else {
    if (new_variable.length == 0) {
      utils.setModalError(
        '',
        messages.variable(new_variable).empty.msg,
        messages.variable(new_variable).empty.btn,
      );
    } else {
      utils.setModalError(
        '',
        messages.variable(new_variable).incorrect.msg,
        messages.variable(new_variable).incorrect.btn,
      );
    }
  }
});

// Modal para eliminar variables.
Blockly.confirm = (object, callback) => {
  currentCallback = callback;
  if (object.type === 'delete_variable') {
    variables = variables.filter(
      (var_blocks) => var_blocks !== object.variable,
    );
    $('#modal-variable-remove').modal();
    $('#removeVariableTitle').html(`<h2>${object.message}</h2>`);
  }
};

document
  .getElementById('executeCode')
  .addEventListener('click', (event) => {
    let code = utils.formatExecuteCode(
      Blockly.JavaScript.workspaceToCode(workspace),
    );
    let device = $('input:radio[name=radios]:checked').val();
    if (device !== undefined) {
      if (current_test == 'test_1') {
        let validate_code = utils.esprimaValidation(code);
        if (validate_code !== 'Error') {
          validate_result_code = validator.lcd(
            validate_code.body,
            validate_result_code,
          );
          let validate_result = validate_result_code.filter(
            (led_filter) =>
              led_filter['type'] === 'LCD' &&
              led_filter['name'] === 'CONSOLA_MENSAJES',
          );
          if (validate_result.length == 1) {
            conditions[current_test] = true;
            utils.openModalWaiting('Verificando el programa ...');
            ipcRenderer.send('execute', {
              code: code,
              device: device,
              validate_code: {
                variable: [`CONSOLA_MENSAJES`],
              },
              channel: 'channel_one',
            });
            ipcRenderer.on('channel_one', (event, result) => {
              if (
                result == 'ErrorCallBack' ||
                result == 'Error' ||
                result == 'ErrorJ5'
              ) {
                modalChallenges(
                  result,
                  current_test,
                  2,
                  conditions.test_1 && conditions.test_2,
                );
              } else {
                let data = JSON.parse(result);
                if (
                  data.variables_status.controller == 'PCF8574A' &&
                  data.variables_status.custom.messages.first_row ==
                    'Hola mundo !!!' &&
                  data.variables_status.custom.messages.second_row ==
                    'Desde Blokino !!!'
                ) {
                  modalChallenges(
                    data.status,
                    current_test,
                    2,
                    conditions.test_1 && conditions.test_2,
                  );
                } else {
                  modalChallenges(
                    'Error',
                    current_test,
                    2,
                    conditions.test_1 && conditions.test_2,
                  );
                }
              }
            });
          } else {
            utils.setModalError(
              '',
              messages.code(1).execute_title.msg,
              messages.code().btn,
            );
            log(chalk.white.bgRed.bold(logs_msg.code().dont_work));
          }
        } else {
          modalErrorSyntax(
            'Error',
            current_test,
            2,
            conditions.test_1 && conditions.test_2,
          );
        }
      }

      if (current_test == 'test_2') {
        let validate_code = utils.esprimaValidation(code);
        if (validate_code !== 'Error') {
          validate_result_code = validator.lcd(
            validate_code.body,
            validate_result_code,
          );

          let validate_result = validate_result_code.filter(
            (led_filter) =>
              led_filter['type'] === 'LCD' &&
              led_filter['name'] === 'CONSOLA_MENSAJES',
          );

          if (validate_result.length == 1) {
            conditions[current_test] = true;
            utils.openModalWaiting('Verificando el programa ...');
            ipcRenderer.send('execute', {
              code: code,
              device: device,
              validate_code: {
                variable: [`CONSOLA_MENSAJES`],
              },
              channel: 'channel_two',
            });
            ipcRenderer.on('channel_two', (event, result) => {
              if (
                result == 'ErrorCallBack' ||
                result == 'Error' ||
                result == 'ErrorJ5'
              ) {
                modalChallenges(
                  result,
                  current_test,
                  2,
                  conditions.test_1 && conditions.test_2,
                );
              } else {
                let data = JSON.parse(result);
                if (
                  data.variables_status.custom.scroll &&
                  data.variables_status.controller == 'PCF8574A' &&
                  data.variables_status.custom.messages.first_row ==
                    'Hola mundo de nuevo !!!' &&
                  data.variables_status.custom.messages.second_row ==
                    'Probando el desplazamiento !!!'
                ) {
                  modalChallenges(
                    data.status,
                    current_test,
                    2,
                    conditions.test_1 && conditions.test_2,
                  );
                } else {
                  modalChallenges(
                    'Error',
                    current_test,
                    2,
                    conditions.test_1 && conditions.test_2,
                  );
                }
              }
            });
          } else {
            utils.setModalError(
              '',
              messages.code(2).execute_title.msg,
              messages.code().btn,
            );
            log(chalk.white.bgRed.bold(logs_msg.code().dont_work));
          }
        } else {
          modalErrorSyntax(
            'Error',
            current_test,
            2,
            conditions.test_1 && conditions.test_2,
          );
        }
      }
    } else {
      log(chalk.black.bgRed.bold(logs_msg.devices().dont_selected));
      utils.setModalError(
        '',
        messages.devices().empty_execute.not_found.msg,
        messages.devices().empty_execute.not_found.btn,
      );
    }
  });

document
  .getElementById('btn-execute-code')
  .addEventListener('click', (event) => {
    let code = utils.formatExecuteCode(
      Blockly.JavaScript.workspaceToCode(workspace),
    );
    let result = utils.esprimaValidation(code);
    if (result !== 'Error') {
      if (result.body.length == 0) {
        log(
          chalk.black.bgRed.bold('No hay código para ejecutar ...'),
        );
        utils.setModalError(
          '',
          'No hay código para ejecutar. Comienza a usar los bloques de Blokino y vuelve a intentarlo.',
          'Volvelo a intentar',
        );
      } else {
        childProcess.devices(createSetupDevices);
      }
    } else {
      modalErrorSyntax(
        'Error',
        current_test,
        2,
        conditions.test_1 && conditions.test_2,
      );
    }
  });

$('#carousel-test').bind('slide.bs.carousel', (event) => {
  if (
    event.relatedTarget.dataset.pos === 'test_1' ||
    event.relatedTarget.dataset.pos === 'test_2'
  ) {
    variables = [];
    current_test = event.relatedTarget.dataset.pos;
    clearScene(event.relatedTarget.dataset.pos, 'ChallengeLCD');
  }
});
