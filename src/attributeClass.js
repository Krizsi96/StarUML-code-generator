const { getVisibility } = require('./get_functions.js')

class Attribute {
    constructor(UMLAttribute) {
        this.name = UMLAttribute.name;
        this.type = UMLAttribute.type;
        this.visibility = getVisibility(UMLAttribute);
        this.log = [];
        this.log.push('>> Attribute created: ' + this.name);
    }

    /**
     * create declaration for attribute
     * @returns {string} declaration of attribute
     */
    getDeclaration() {
        this.log.push('>> getDeclaration called for attribute: ' + this.name);
        return this.type + ' ' + this.name + ';';
    }

    /**
     * get log of running enumeration methods
     * @returns {string} log of enumeration
     */
    getLog() {
        return this.log.join('\n');
    }
}

module.exports = {
    Attribute: Attribute
};