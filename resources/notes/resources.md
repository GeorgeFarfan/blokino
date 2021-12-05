# Blokino

### Repositorio

- El repositorio es: https://github.com/GeorgeFarfan/blokino-electron

### Electron

- Ejecutar child process en Electron: https://stackoverflow.com/questions/38172308/spawn-a-child-process-in-electron
- https://coursetro.com/posts/code/122/Electron-IPC-Tutorial---Communication-within-your-Electron-App
- https://electronjs.org/docs/api/ipc-main
- Solucion al cierre de electron con J5 :https://github.com/rwaldron/johnny-five/issues/1352
  http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn
- Darle permisos de super usuario : https://github.com/electron-userland/electron-packager/issues/647
- Configurar el Browser: https://electronjs.org/docs/api/browser-window
- Crear instalador: https://www.youtube.com/watch?v=GEXhlGH7ylE  
   https://enupal.com/blog/como-crear-un-instalador-multiplataforma-con-electron-para-windows-linux-y-mac
- Electron-packager: https://www.christianengvall.se/electron-packager-tutorial/
- Ejecutar Electron en la MAC: https://github.com/onmyway133/blog/issues/69

### Diseño

Con esta paleta de colores deberia definir los componentes y sus colores.
https://material.io/guidelines/style/color.html#color-color-palette

### El manejo de puertos

- Windows usando la terminal de git

      ```
      Step one:
      netstat -ano | findstr :8080
      Step two:
      taskkill //PID typeyourPIDhere //F
      ```

- Linux

  ```
  Step one:
    fuser -n tcp -k 9001
    sudo kill $(sudo lsof -t -i:9001)
  ```

### Links de ayuda

- Ejecutar en modo admin :
  https://stackoverflow.com/questions/39752351/executing-bash-command-with-root-access-inside-nodejs-app

- https://forum.vuejs.org/t/passing-data-back-to-parent/1201/2
- http://vitomd.com/blog/coding/deploy-a-javascript-node-app-to-heroku-in-20-minutes/
- https://devcenter.heroku.com/articles/node-best-practices
- https://forum.vuejs.org/t/passing-data-back-to-parent/1201
- https://jsfiddle.net/1s4vtk6k/20/
- https://azimi.me/2014/12/31/kill-child_process-node-js.html
- https://www.youtube.com/watch?v=ufRPz9oNmtc&t=321s
- https://github.com/wilmercampagna/Articulos/tree/master/IniciandoEnDesarrolloWeb
- https://www.christianengvall.se/ipcmain-and-ipcrenderer/
- https://stackoverflow.com/questions/35942754/how-to-save-username-and-password-in-git
- https://aprendiendoarduino.wordpress.com/category/pwm/
- Como crear componentes con JS: https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz
- Error de firmata https://github.com/lovell/sharp/issues/1384
- Uso de funciones sincronicas : https://codeburst.io/javascript-es-2017-learn-async-await-by-example-48acc58bad65
- Board - el manejo de las placas: http://johnny-five.io/api/board/
- Crear listado :http://jsfiddle.net/sunnysm/so7qfg9p/
- https://stackoverflow.com/questions/11351135/create-ul-and-li-elements-in-javascript
- ES10: https://medium.com/@js_tut/the-complete-guide-to-es10-features-f09a8c7be1bd
  http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn
- GORT librerias: http://gort.io/documentation/cli/arduino/
- Mas doc de child process: https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
- Para hacer referencia a los paths en Electron, hay que usar patj y join.
- Leds RGB
  - https://www.rapidtables.com/web/color/RGB_Color.html
  - https://www.quackit.com/css/css_color_codes.cfm
  - http://johnny-five.io/api/led.rgb/
- Configuración de Prettier
  ```
      {
          "workbench.iconTheme": "vscode-icons",
          "window.zoomLevel": -1,
          "nativescript.analytics.enabled": false,
          "vsicons.projectDetection.autoReload": true,
          "files.exclude": {
              "**/.git": true,
              "**/.svn": true,
              "**/.hg": true,
              "**/*.js": {
                  "when": "$(basename).ts"
              },
              "**/*.css": {
                  "when": "$(basename).scss"
              },
              "**/CVS": true,
              "**/.DS_Store": true
          },
          "search.exclude": {
              "**/node_modules": true,
              "**/platforms/**": true
          },
          "editor.formatOnPaste": true,
          "editor.formatOnSave": true,
          "editor.wordWrap": "on",
          "editor.snippetSuggestions": "top",
          "files.autoSave": "off",
          "terminal.integrated.rendererType": "dom",
          "typescript.updateImportsOnFileMove.enabled": "never",
          "editor.fontFamily": "Inconsolata for Powerline",
          "editor.fontSize": 14,
          "prettier.tabWidth": 4,
          "prettier.printWidth": 100,
          "prettier.disableLanguages": ["vue", "html"]
      }
  ```
- Código de como ejecutar un child-proccess:
  ```
      let serverProc = require('child_process').fork(
          require.resolve('./server.js'),
          ['--key', 'value'], // pass to process.argv into child
          {
              // options
          }
      )
      serverProc.on('exit', (code, sig) => {
      // finishing
      })
      serverProc.on('error', (error) => {
      // error handling
      })
  ```
- Ejemplo de Firebase+J5+NodeJs: https://medium.com/code-zen/intro-to-iot-with-arduino-firebase-and-angular-js-ea08c70f41ef
- Multiples boards: https://stackoverflow.com/questions/25235318/multiple-arduino-boards-using-johnny-five
- Leds:
  - https://www.instructables.com/id/Controlling-Multiple-LEDs-With-an-Arduino-Uno/
  - https://www.instructables.com/id/Multiple-LEDs-Breadboards-With-Arduino-in-Tinkerca/
- Como usar Potenciometros: https://programarfacil.com/blog/el-potenciometro-y-arduino/
- LCD: https://www.sitepoint.com/web-apis-on-arduino-lcd/
- Teclado Matricial:https://www.luisllamas.es/arduino-teclado-matricial/
- Botones: https://www.instructables.com/id/How-to-use-a-Push-Button-Arduino-Tutorial/
- https://www.bouvet.no/bouvet-deler/utbrudd/learning-javascript-and-arduino-programming-with-johnny-five
- Motors: https://www.sitepoint.com/controlling-a-motorbot-using-arduino-and-node-js/
- Ejecutar scripts: https://tutorialedge.net/javascript/nodejs/executing-shell-scripts-with-nodejs/
- Darle colores a la consola: https://www.npmjs.com/package/chalk.
- El plugin para controlar el internet: https://ourcodeworld.com/articles/read/454/how-to-check-if-there-is-an-active-internet-connection-in-node-js
- Patrones para controlar caracteres:
  https://stackoverflow.com/questions/3617797/regex-to-match-only-letters
  https://www.w3resource.com/javascript/form/all-letters-field.php
- Como asociar un dominio para Blokino: https://programacionymas.com/blog/como-enlazar-dominio-hosting-namecheap-digitalocean
- Como deployar una app VUE + Nginx: https://medium.com/@Web_Bailey/deploy-a-vuejs-app-with-digitalocean-fd6e7af07e40
- Colores pastel: https://colorhunt.co/palettes/pastel
- LocalStorage: https://stackoverflow.com/questions/13702100/localstorage-array-of-objects-handling
- Rita: https://github.com/vaybar/RITA/tree/master/RITA
- Frietzing: http://fritzing.org/home/
- Ejemplo de las imagenes del Carousel: https://geekytheory.com/simular-arduino-con-123d-circuits
- info:https://programarfacil.com/podcast/26-arduino-entradas-y-salidas/
- Ubuntu-error: https://askubuntu.com/questions/575505/glibcxx-3-4-20-not-found-how-to-fix-this-error
- https://stackoverflow.com/questions/21304690/node-js-open-chrome-in-full-screen

### Blockly

- Info: https://www.aprendeprogramando.es/cursos-online/blockly/variables-y-tipos-de-datos/que-es-una-variable
- Blockly, como importar y exportar:https://developers.google.com/blockly/guides/get-started/web#configuration

### Botones

- http://johnny-five.io/examples/button-pullup/
- http://johnny-five.io/examples/button-bumper/
- http://johnny-five.io/examples/toggle-switch/

### PIEZO

- Como usar el PIEZO: https://www.youtube.com/watch?v=IAYFVUpeEnU
- http://tangiblejs.com/posts/nw-js-johnny-five-arduino-wicked-trio
- https://github.com/julianduque/j5-songs
- https://github.com/nelsinhofrugeri/JSRobot/tree/master/songs_list

### WIFI

- https://medium.com/@anaganisk/connecting-johnny-five-arduino-raspberry-pi-etc-over-wifi-to-the-pc-using-esp8266-a10348fdb300

### LCD

- https://www.youtube.com/watch?v=oddmyHi2ObE
- http://johnny-five.io/examples/lcd-i2c-PCF8574/

### MOTION

- http://johnny-five.io/api/motion/

## BLUETOTH

- https://github.com/rwaldron/johnny-five/wiki/Getting-Started-with-Johnny-Five-and-HC-05-Bluetooth-Serial-Port-Module
- https://pofay.github.io/2018/11/08/setup-wireless-tethering-for-johnny-five-in-arduino-using-hc05-BT.html
- http://ferclaverino.com/2016/11/arduino-johnny-five-bluetooth/
- https://github.com/rwaldron/johnny-five/wiki/Getting-Started-with-Johnny-Five-and-JY-MCU-Bluetooth-Serial-Port-Module
- https://github.com/rwaldron/johnny-five/blob/master/docs/board-with-port.md
- https://pofay.github.io/2018/11/08/setup-wireless-tethering-for-johnny-five-in-arduino-using-hc05-BT.html

## OTHERS

- https://boneskull.com/how-to-use-an-esp8266-with-johnny-five/
- https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework
- https://medium.com/tht-things-hackers-team/trabalhando-com-iot-usando-javascript-b51fea370f64
- https://hackernoon.com/electron-the-bad-parts-2b710c491547
- https://www.makeuseof.com/tag/control-arduino-using-javascript/
- https://www.pubnub.com/blog/2016-05-25-howcreate-a-smart-device-with-arduino-and-node-js-using-johnny-five/
- https://trybotics.com/project/safe-city-a-device-to-keep-you-safe-c456e0

## Remote IO

- https://www.youtube.com/watch?v=chlin--UViw
- https://github.com/monteslu/remote-io
- https://github.com/monteslu/remotepi

## Estructura de ROBOT

- http://proyectosconarduino.com/robots/otto-diy/
- https://www.youtube.com/watch?v=JPui6sxIf7A
- https://www.youtube.com/watch?v=whGfy0R2L4w
- https://www.youtube.com/watch?v=C2LEHSZ7gEY

## AVR

- Condicion para ejecutar GORT en Windows, instalar NODEJS y luego el AVR. Despues se debe ejecutar ese comando.
- https://sourceforge.net/projects/winavr/
- Commands en Windows:
  - .\gort.exe arduino upload firmata COM4

## OPEN APPLICATION INSIDE ELECTRON

`var childProcess = require('child_process'); var path = require("path"); var directories = ["c:", "arduino","libraries","Firmata","examples","StandardFirmata","StandardFirmata.ino"]; var directory = directories.join(path.sep); console.log("Path: ",directory) childProcess.exec('start '+directory, function (err, stdout, stderr) { if (err) { console.error(err); return; } })`

## WINDOWS

- Para ejecutar la aplicacion se debe tener:
  - node 8.12.0
  - https://github.com/brianmcd/contextify/issues/55
  - Setear las variables de entorno del MSI_BUILD.

## Motors with a dual H-bridge

- https://www.youtube.com/watch?v=kZ1p60ewsEw
- http://johnny-five.io/examples/motor-hbridge/
- https://www.tutorialspoint.com/arduino/arduino_dc_motor.htm

## Windows - Arduino

- Como instalar los drivers de Arduino: https://www.arduino.cc/en/Guide/DriverInstallation

## DOC - ELECTRON - PWA

- https://felixrieseberg.com/progressive-web-apps-electron/
- https://medium.com/dailyjs/goodbye-electron-hello-desktop-pwas-f316b8f39882

## Devices

- GORT - NANO
- FIRMATA_PARTY - UNO,MEGA

## Alternativas

- https://www.youtube.com/watch?v=Dv248eC9y3s
- https://www.npmjs.com/package/firmata-party

## Raspberry

- https://github.com/rwaldron/johnny-five/issues/893
- https://www.hackster.io/IainIsCreative/setting-up-the-raspberry-pi-and-johnny-five-56d60f

## OLED

- https://p5js.org/

## TOOLS

- https://github.com/pierceray/generator-johnny-five
- https://p5js.org/
- https://www.youtube.com/watch?v=cnrV3xJf4po
- https://learn.adafruit.com/adafruit-gfx-graphics-library/graphics-primitives
