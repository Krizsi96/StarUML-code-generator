const assert = require('assert');
const myAttribute = require('../src/attributeClass.js');
const testData = require('./testData.js');
const TestUMLAttribute = testData.TestUMLAttribute;

describe('Attribute Tests', function () {
    describe('constructor Tests', function () {
        it('should construct attribute with the right name', function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.name, TestUMLAttribute.name);
        });
        it('should construct attribute with the right type', function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.type, TestUMLAttribute.type);
        });
        it('should construct attribute with the right visibility', function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.visibility, 'public');
        });
    });
    describe('getDeclaration Tests', function () {
        it('should return declaration for attribute', function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.getDeclaration(), TestUMLAttribute.type + ' ' + TestUMLAttribute.name + ';');
        });
    });

    describe('getLog Tests', function () {
        it('should return log for attribute', function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            testAttribute.getDeclaration();
            assert.equal(testAttribute.getLog(), '>> Attribute created: ' + TestUMLAttribute.name + '\n>> getDeclaration called for attribute: ' + TestUMLAttribute.name);
        });
    });
});