const Attribute = require('./attributeClass.js');

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

module.exports = Header;