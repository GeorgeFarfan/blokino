"use strict";

/**
 * @author jorge Farfan Coaguila
 * @description Este módulo contiene datos de configuración.
 */

const programComponent = require("./blocks/app-blocks"),
  ledComponent = require("./blocks/led-blocks"),
  ledRGBComponent = require("./blocks/led-rgb-blocks"),
  buttonComponent = require("./blocks/button-blocks"),
  potentiometerComponent = require("./blocks/potentiometer-blocks"),
  functionsComponent = require("./blocks/function-blocks"),
  joystickComponent = require("./blocks/joystick-blocks"),
  buzzerComponent = require("./blocks/buzzer-blocks"),
  screenMatrixComponent = require("./blocks/matrix-blocks"),
  servoMotorComponent = require("./blocks/servomotor-blocks"),
  bumperComponent = require("./blocks/bumper-blocks"),
  proximityComponent = require("./blocks/proximity-blocks"),
  keypadComponent = require("./blocks/keypad-blocks"),
  switchComponent = require("./blocks/switch-blocks"),
  motionComponent = require("./blocks/motion-blocks"),
  microfonoComponent = require("./blocks/microphone-blocks"),
  lcdComponent = require("./blocks/lcd-blocks"),
  motorComponent = require("./blocks/motor-blocks"),
  LedMenu = require("../utils/menu/led-menu"),
  LedRGBMenu = require("../utils/menu/led-rgb-menu"),
  ButtonMenu = require("../utils/menu/button-menu"),
  LCDMenu = require("../utils/menu/lcd-menu"),
  JoystickMenu = require("../utils/menu/joystick-menu"),
  BuzzerMenu = require("../utils/menu/buzzer-menu"),
  VariableTypeDataMenu = require("../utils/menu/variable-type-menu"),
  ServomotorMenu = require("../utils/menu/servomotor-menu"),
  SensorProx = require("../utils/menu/proximity-menu"),
  PotentiometerMenu = require("../utils/menu/potentiometer-menu"),
  MatrixLEDsMenu = require("../utils/menu/matrix-menu"),
  SensorMotionMenu = require("../utils/menu/motion-menu"),
  ExpertMenu = require("../utils/menu/expert-menu"),
  KeyPadMenu = require("../utils/menu/keypad-menu"),
  MotorMenu = require("../utils/menu/motor-menu"),
  ProgramCodeBase = require("../utils/program/blokino-program"),
  { spawn } = require("child_process"),
  platform = require("../../resources/libs/config/platform"),
  { BrowserWindow } = require("electron"),
  shell = require("electron").shell,
  path = require("path");

let aboutPage,
  instanceHelpPage = 0;

let COLOURS = [
    "#FFFFFF",
    "#FF0000",
    "#008000",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#33A8FF",
    "#C907DC",
    "#6D1414",
    "#082975",
    "#F4C121",
  ],
  ZOOM = {
    controls: true,
    wheel: true,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    startScale: 1.3,
  },
  GRID = {
    spacing: 20,
    length: 5,
    colour: "#9E9E9E",
    snap: true,
  };

let PAGES = {
  blokino: "http://blokino-platform.com/blokino",
  documentation: "http://blokino-platform.com/get_started",
  frietzing: "http://fritzing.org/download/",
  nodebot: "https://nodebots.io/",
};

let settings = {
  urls: () => {
    return {
      blokino: "http://blokino-platform.com/blokino",
      documentation: "http://blokino-platform.com/get_started",
      frietzing: "http://fritzing.org/download/",
      nodebot: "https://nodebots.io/",
    };
  },
  createPageHelp: () => {
    return [
      {
        label: "Archivo",
        submenu: [
          {
            role: "minimize",
          },
          {
            role: "close",
          },
        ],
      },
      {
        label: "Editar",
        submenu: [
          {
            role: "undo",
          },
          {
            role: "redo",
          },
          {
            type: "separator",
          },
          {
            role: "cut",
          },
          {
            role: "copy",
          },
          {
            role: "paste",
          },
          {
            role: "pasteandmatchstyle",
          },
          {
            role: "delete",
          },
          {
            role: "selectall",
          },
        ],
      },

      {
        label: "Vista",
        submenu: [
          {
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload();
            },
          },
          {
            type: "separator",
          },
          {
            label: "Toggle Developer Tools",
            accelerator:
              process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.webContents.toggleDevTools();
            },
          },
          {
            type: "separator",
          },
          {
            role: "resetzoom",
          },
          {
            role: "zoomin",
          },
          {
            role: "zoomout",
          },
          {
            type: "separator",
          },
          {
            role: "togglefullscreen",
          },
        ],
      },
      {
        label: "Ayuda",
        submenu: [
          {
            label: "Acerca de Blokino",
            click() {
              settings.openPageHelp();
            },
          },
          {
            label: "Página web",
            click() {
              if (platform.arch().includes("win")) {
                shell.openExternal(PAGES.blokino);
              } else {
                spawn("chromium-browser", ["--no-sandbox", PAGES.blokino]);
              }
            },
          },
          {
            label: "Node-Bots",
            click() {
              if (platform.arch().includes("win")) {
                shell.openExternal(PAGES.nodebot);
              } else {
                spawn("chromium-browser", ["--no-sandbox", PAGES.nodebot]);
              }
            },
          },
          {
            label: "Frietzing",
            click() {
              if (platform.arch().includes("win")) {
                shell.openExternal(PAGES.frietzing);
              } else {
                spawn("chromium-browser", ["--no-sandbox", PAGES.frietzing]);
              }
            },
          },
        ],
      },
    ];
  },
  openPageHelp: () => {
    instanceHelpPage++;
    if (instanceHelpPage == 1) {
      aboutPage = new BrowserWindow({
        resizable: false,
        height: 400,
        width: 360,
        modal: true,
        icon: path.join(__dirname, "../images/blokino.png"),
      });
      aboutPage.setMenuBarVisibility(false);
      aboutPage.loadFile("./src/pages/help/help-about.html");
      aboutPage.on("closed", () => {
        instanceHelpPage = 0;
      });
    }
  },
  beautify: (code) => {
    return {
      indent_size: 4,
      space_in_empty_paren: true,
      end_with_newline: true,
      preserve_newlines: false,
    };
  },
  codeMirror: (code) => {
    return {
      value: code,
      mode: "javascript",
      lineNumbers: true,
      readOnly: true,
      tabSize: 4,
      theme: "dracula",
    };
  },
  blockly: (Blockly, typeToolBar) => {
    // Defino configuraciones globales para Blockly
    Blockly.FieldColour.COLOURS = COLOURS;
    Blockly.FieldColour.COLUMNS = 3;
    Blockly.HSV_SATURATION = 0.5;
    Blockly.HSV_VALUE = 0.7;

    return settings.selectToolBox(typeToolBar);
  },
  selectToolBox: (typeToolBar) => {
    switch (typeToolBar) {
      case "Expert":
        return {
          toolbox: ExpertMenu.menu().main.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
        };
        break;
      case "Led":
        return {
          toolbox: LedMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "LedRGB":
        return {
          toolbox: LedRGBMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "Buzzer":
        return {
          toolbox: BuzzerMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "Button":
        return {
          toolbox: ButtonMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "KeyPad":
        return {
          toolbox: KeyPadMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "Motors":
        return {
          toolbox: MotorMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "ScreenMatrix":
        return {
          toolbox: MatrixLEDsMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "SensorMov":
        return {
          toolbox: SensorMotionMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "SensorProx":
        return {
          toolbox: SensorProx.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "Servomotor":
        return {
          toolbox: ServomotorMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "LCD":
        return {
          toolbox: LCDMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "Joystick":
        return {
          toolbox: JoystickMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
      case "Potentiometer":
        return {
          toolbox: PotentiometerMenu.menu().test_1.code,
          zoom: ZOOM,
          grid: GRID,
          trashcan: true,
          comments: false,
        };
        break;
    }
  },
  challenges: (Blockly, test, challengeType) => {
    Blockly.FieldColour.COLOURS = COLOURS;
    Blockly.FieldColour.COLUMNS = 3;
    Blockly.HSV_SATURATION = 0.8;
    Blockly.HSV_VALUE = 0.8;
    switch (challengeType) {
      case "ChallengeLED":
        switch (test) {
          case "test_1":
            return {
              toolbox: LedMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
              comments: false,
            };
            break;
          case "test_2":
            return {
              toolbox: LedMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
              comments: false,
            };
            break;
          case "test_3":
            return {
              toolbox: LedMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
              comments: false,
            };
            break;
          case "test_4":
            return {
              toolbox: LedMenu.menu().test_4.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
              comments: false,
            };
            break;
        }
        break;
      case "ChallengeLEDRGB":
        switch (test) {
          case "test_1":
            return {
              toolbox: LedRGBMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: LedRGBMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeBUTTON":
        switch (test) {
          case "test_1":
            return {
              toolbox: ButtonMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: ButtonMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: ButtonMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeBUZZER":
        switch (test) {
          case "test_1":
            return {
              toolbox: BuzzerMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: BuzzerMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeLCD":
        switch (test) {
          case "test_1":
            return {
              toolbox: LCDMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: LCDMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: LCDMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeJOYSTICK":
        switch (test) {
          case "test_1":
            return {
              toolbox: JoystickMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeKEYPAD":
        switch (test) {
          case "test_1":
            return {
              toolbox: LedMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: LedMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: LedMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_4":
            return {
              toolbox: LedMenu.menu().test_4.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeMATRIXLEDS":
        switch (test) {
          case "test_1":
            return {
              toolbox: MatrixLEDsMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: MatrixLEDsMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: MatrixLEDsMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeSENSORMOTION":
        switch (test) {
          case "test_1":
            return {
              toolbox: SensorMotionMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeMOTORS":
        switch (test) {
          case "test_1":
            return {
              toolbox: LedMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: LedMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: LedMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_4":
            return {
              toolbox: LedMenu.menu().test_4.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengePOTENTIOMETER":
        switch (test) {
          case "test_1":
            return {
              toolbox: PotentiometerMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: PotentiometerMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengePROXIMITY":
        switch (test) {
          case "test_1":
            return {
              toolbox: LedMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: LedMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: LedMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_4":
            return {
              toolbox: LedMenu.menu().test_4.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
      case "ChallengeSERVOMOTORS":
        switch (test) {
          case "test_1":
            return {
              toolbox: ServomotorMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: ServomotorMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: ServomotorMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;

      case "ChallengeSWITCH":
        switch (test) {
          case "test_1":
            return {
              toolbox: LedMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: LedMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: LedMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_4":
            return {
              toolbox: LedMenu.menu().test_4.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;

      case "TutorialVariableTypeData":
        switch (test) {
          case "test_1":
            return {
              toolbox: VariableTypeDataMenu.menu().test_1.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_2":
            return {
              toolbox: VariableTypeDataMenu.menu().test_2.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_3":
            return {
              toolbox: VariableTypeDataMenu.menu().test_3.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
          case "test_4":
            return {
              toolbox: VariableTypeDataMenu.menu().test_4.code,
              zoom: ZOOM,
              grid: GRID,
              trashcan: true,
            };
            break;
        }
        break;
    }
  },
  cleanWorkspace: (Blockly, workspace) => {
    let xml = Blockly.Xml.textToDom(ProgramCodeBase.application().program);
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, workspace);
  },
  loadComponents: (Blockly) => {
    // Componentes cargados
    functionsComponent.block(Blockly);
    functionsComponent.code(Blockly);
    ledComponent.block(Blockly);
    ledComponent.code(Blockly);
    ledRGBComponent.block(Blockly);
    ledRGBComponent.code(Blockly);
    buttonComponent.block(Blockly);
    buttonComponent.code(Blockly);
    potentiometerComponent.block(Blockly);
    potentiometerComponent.code(Blockly);
    joystickComponent.block(Blockly);
    joystickComponent.code(Blockly);
    buzzerComponent.block(Blockly);
    buzzerComponent.code(Blockly);
    screenMatrixComponent.block(Blockly);
    screenMatrixComponent.code(Blockly);
    programComponent.block(Blockly);
    programComponent.code(Blockly);
    servoMotorComponent.block(Blockly);
    servoMotorComponent.code(Blockly);
    bumperComponent.block(Blockly);
    bumperComponent.code(Blockly);
    switchComponent.block(Blockly);
    switchComponent.code(Blockly);
    proximityComponent.block(Blockly);
    proximityComponent.code(Blockly);
    keypadComponent.block(Blockly);
    keypadComponent.code(Blockly);
    motionComponent.block(Blockly);
    motionComponent.code(Blockly);
    lcdComponent.block(Blockly);
    lcdComponent.code(Blockly);
    motorComponent.block(Blockly);
    motorComponent.code(Blockly);
    microfonoComponent.block(Blockly);
    microfonoComponent.code(Blockly);
  },
};
module.exports = settings;
