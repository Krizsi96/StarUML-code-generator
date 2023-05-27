const { getVisibility } = require('./get_functions.js')

class Enumeration {
    constructor(UMLenumeration) {
        this.name = UMLenumeration.name;
        this.visibility = getVisibility(UMLenumeration);
        this.literals = [];
        this.log = [];
        UMLenumeration.literals.forEach(sourceLiteral => {
            this.literals.push(sourceLiteral.name);
        });
        this.log.push('>> Enumeration created: ' + this.name);
    }

    /**
     * create declaration for enumeration
     * @returns {string} declaration of enumeration
     */
    getDeclaration() {
        this.log.push('>> getDeclaration called for enumeration: ' + this.name);
        let declaration = [];
        declaration.push('enum ' + this.name);
        declaration.push('{');
        declaration.push('\t'+ this.literals.join(', '));
        declaration.push('};');
        return declaration.join('\n');
    }

    /**
     * get log of running enumeration methods
     * @returns {string} log of enumeration
     */
    getLog() {
        return this.log.join('\n');
    }
}

module.exports =  {
    Enumeration: Enumeration
};