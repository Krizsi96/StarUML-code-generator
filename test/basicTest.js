var assert = require('assert');
const myModule = require('../src/header.js');

BasicUMLelement = {
    attributes: [
        {
            name: 'attribute1',
            type: 'int',
            visibility: 'public'
        },
        {
            name: 'attribute2',
            type: 'string',
            visibility: 'private'
        }
    ]
}

UmlAttributeWithReferenceType = {
    attributes: [
        {
            _type: "UMLAttribute",
            _id: "AAAAAAGIL+G10vtXRlM=",
            _parent: {
                "$ref": "AAAAAAGIFgbDxuCaTk4="
            },
            name: "Serial",
            type: {
                _type: "UMLClass",
                _id: "AAAAAAGIMDDPegvgF30=",
                _parent: {
                    "$ref": "AAAAAAGGrrbpl8SVKtE="
                },
                name: "ArduinoSerialInterface",
            }
        }
    ]
}

describe('Header Tests', function () {
    describe('CollectUMLAttributes Tests', function () {
        it('should collect all attributes from UMLelement', function () {
            const testHeader = new myModule.Header();
            testHeader.CollectUMLAttributes(BasicUMLelement);
            assert.equal(testHeader.attributes.length, 2);
        });
    });
});