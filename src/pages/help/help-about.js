let $ = require("jquery");
require("popper.js");
require("bootstrap");
const utils = require("../../utils/functions");
$("#open-updates").click(event => {
    event.preventDefault();
    utils.openURL("main");
});
