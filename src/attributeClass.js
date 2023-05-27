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
        return this.type + ' ' + this.name + ';';
    }
}

module.exports =  {
    Attribute: Attribute
};