const assert = require('assert');
const myAttribute = require('../src/attributeClass.js');

describe('Attribute Tests', function () {
    describe('getDeclaration Tests', function () {
        it('should return declaration for attribute', function () {
            const testAttribute = new myAttribute.Attribute('attribute1', 'int', 'public');
            assert.equal(testAttribute.getDeclaration(), 'int attribute1;');
        });
    });
});