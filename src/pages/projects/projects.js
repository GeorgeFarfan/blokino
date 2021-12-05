'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene las funcionalidades de la sección de Robots.
 */

require('popper.js');
require('bootstrap');
const $ = require('jquery'),
  utils = require('../../utils/functions');

$('#back-button-challenge').click(function () {
  window.history.back();
});

function openLinkTinkercad(event, url) {
  event.preventDefault();
  utils.openURL(url);
}
