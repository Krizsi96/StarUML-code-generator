const assert = require('assert');
const myAttribute = require('../src/attributeClass.js');

const VK_PUBLIC = 'public';
const VK_PROTECTED = 'protected';
const VK_PRIVATE = 'private';

type = {
    UMLModelElement: [
        VK_PUBLIC,
        VK_PROTECTED,
        VK_PRIVATE
    ]
}

UMLAttributeTest = {
    _type: "UMLAttribute",
    _id: "AAAAAAGIFeyfNd/nV44=",
    _parent: {
        "$ref": "AAAAAAGHfGkeHtiig5w="
    },
    name: "Time_",
    visibility: type.UMLModelElement.VK_PUBLIC,
    type: "TimeInterface*"
};

describe('Attribute Tests', function () {
    describe('constructor Tests', function () {
        it('should construct attribute with the right name', function () {
            const testAttribute = new myAttribute.Attribute(UMLAttributeTest);
            assert.equal(testAttribute.name, UMLAttributeTest.name);
        });
        it('should construct attribute with the right type', function () {
            const testAttribute = new myAttribute.Attribute(UMLAttributeTest);
            assert.equal(testAttribute.type, UMLAttributeTest.type);
        });
        it('should construct attribute with the right visibility', function () {
            const testAttribute = new myAttribute.Attribute(UMLAttributeTest);
            assert.equal(testAttribute.visibility, 'public');
        });
    });
    describe('getDeclaration Tests', function () {
        it('should return declaration for attribute', function () {
            const testAttribute = new myAttribute.Attribute(UMLAttributeTest);
            assert.equal(testAttribute.getDeclaration(), UMLAttributeTest.type + ' ' + UMLAttributeTest.name + ';');
        });
    });

    describe('getLog Tests', function () {
        it('should return log for attribute', function () {
            const testAttribute = new myAttribute.Attribute(UMLAttributeTest);
            testAttribute.getDeclaration();
            assert.equal(testAttribute.getLog(), '>> Attribute created: ' + UMLAttributeTest.name + '\n>> getDeclaration called for attribute: ' + UMLAttributeTest.name);
        });
    });
});