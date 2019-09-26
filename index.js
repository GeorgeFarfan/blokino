require("popper.js");
require("bootstrap");
let $ = require("jquery"),
    utils = require("./src/utils/functions");

$("#option-challenges").click(() => {
    window.location.href = "./src/pages/challenges.html";
});

$("#option-open-blokino").click(event => {
    window.location.href = "./src/pages/expert/expert.html";
});

$("#option-open-web-page").click(event => {
    event.preventDefault();
    utils.openURL("projects");
});

$("#open-doc").click(event => {
    event.preventDefault();
    utils.openURL("main");
});

$("#open-frietzing").click(event => {
    event.preventDefault();
    utils.openURL("main");
});

$("#open-projects").click(event => {
    window.location.href = "./src/pages/projects/projects.html";
});
