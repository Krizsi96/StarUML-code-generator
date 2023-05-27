class Header {
    constructor() {
        this.name = '';
        this.attributes = [];
        this.log = [];
    }

    CollectUMLAttributes(UMLelement) {
        this.log.push('>> CollectUMLAttributes called');
        UMLelement.attributes.forEach(sourceAttribute => {
            this.attributes.push(new Attribute(sourceAttribute.name, sourceAttribute.type, sourceAttribute.visibility));
        });
    }
}

class Attribute {
    constructor(name, type, visibility) {
        this.name = name;
        this.type = type;
        this.visibility = visibility;
    }

    getDeclaration() {
        return this.type + ' ' + this.name + ';';
    }
}
module.exports = {
    Header: Header
};