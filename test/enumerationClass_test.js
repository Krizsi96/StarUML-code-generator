const assert = require('assert');
const myEnumeration = require('../src/enumerationClass.js');

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

UMLEnumerationTest = {
    _type: "UMLEnumeration",
    _id: "AAAAAAGHkJ+aLgbKx/A=",
    _parent: {
        $ref: "AAAAAAGHfGkeHtiig5w="
    },
    name: "kLogType",
    literals: [
        {
            _type: "UMLEnumerationLiteral",
            _id: "AAAAAAGHkLR2BggexpI=",
            _parent: {
                $ref: "AAAAAAGHkJ+aLgbKx/A="
            },
            name: "kInfo"
        },
        {
            _type: "UMLEnumerationLiteral",
            _id: "AAAAAAGHkRoedgiWJ7s=",
            _parent: {
                $ref: "AAAAAAGHkJ+aLgbKx/A="
            },
            name: "kWarning"
        },
        {
            _type: "UMLEnumerationLiteral",
            _id: "AAAAAAGHkRpOLwi14JQ=",
            _parent: {
                $ref: "AAAAAAGHkJ+aLgbKx/A="
            },
            name: "kError"
        },
        {
            _type: "UMLEnumerationLiteral",
            _id: "AAAAAAGHkRp8YgjUydU=",
            _parent: {
                $ref: "AAAAAAGHkJ+aLgbKx/A="
            },
            name: "kDebug"
        }
    ],
    visibility: type.UMLModelElement.VK_PUBLIC
};

describe('Enumeration Tests', function () {
    describe('Constructor Tests', function () {
        it('should construct enumeration with the right name', function () {
            const testEnumeration = new myEnumeration.Enumeration(UMLEnumerationTest);
            assert.equal(testEnumeration.name, 'kLogType');
        });
        it('should construct enumeration with the right visibility', function () {
            const testEnumeration = new myEnumeration.Enumeration(UMLEnumerationTest);
            assert.equal(testEnumeration.visibility, 'public');
        });
        it('should construct enumeration with the right literals', function () {
            const testEnumeration = new myEnumeration.Enumeration(UMLEnumerationTest);
            assert.equal(testEnumeration.literals[0], 'kInfo');
            assert.equal(testEnumeration.literals[1], 'kWarning');
            assert.equal(testEnumeration.literals[2], 'kError');
            assert.equal(testEnumeration.literals[3], 'kDebug');
        });
    });

    describe('getDeclaration Tests', function () {
        it('should return declaration for enumeration', function () {
            const testEnumeration = new myEnumeration.Enumeration(UMLEnumerationTest);
            let expectedDeclaration = 'enum ' + UMLEnumerationTest.name + '\n{\n\tkInfo, kWarning, kError, kDebug\n};';
            assert.equal(testEnumeration.getDeclaration(), expectedDeclaration);
        });
    });

    describe('getLog Tests', function () {
        it('should return log for enumeration', function () {
            const testEnumeration = new myEnumeration.Enumeration(UMLEnumerationTest);
            testEnumeration.getDeclaration();
            let expectedLog = '>> Enumeration created: ' + UMLEnumerationTest.name + '\n>> getDeclaration called for enumeration: ' + UMLEnumerationTest.name;
            assert.equal(testEnumeration.getLog(), expectedLog);
        });
    });
});