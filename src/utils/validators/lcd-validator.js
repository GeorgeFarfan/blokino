let validators = {
    createLCD: (programNodes, lcdName, typeName) => {
        programNodes.push({
            name: lcdName,
            type: typeName ? typeName : ""
        });
    },

    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createLCD(programNodes, variable.id.name, "LCD", null, null);
        });
    },

    lcd: (code, programNodes) => {
        programNodes = [];
        code.forEach(node => {
            // Declaracion de la variable
            if (node.type === "VariableDeclaration") {
                validators.addVariable(node, programNodes);
            }
        });
        return programNodes;
    }
};

module.exports = validators;
