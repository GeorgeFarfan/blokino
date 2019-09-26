const utils = require("../../utils/functions");
$("#open-updates").click(event => {
    event.preventDefault();
    utils.openURL("main");
});
