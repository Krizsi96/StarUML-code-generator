class Attribute {
    constructor(name, type, visibility) {
        this.name = name;
        this.type = type;
        this.visibility = visibility;
        this.log = [];
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