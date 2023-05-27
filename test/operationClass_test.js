const assert = require('assert');
const myOperation = require('../src/operationClass.js');

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

UMLOperationTest = {
    _type: "UMLOperation",
    _id: "AAAAAAGH0z3ybAoo5vM=",
    _parent: {
        $ref: "AAAAAAGHfGkeHtiig5w="
    },
    name: "createLog",
    parameters: [
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH0z52KQovPVM=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            type: "void",
            direction: "return"
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH0z69Xwoy8zI=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "log_type",
            type: {
                $ref: "AAAAAAGHkJ+aLgbKx/A="
            }
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH00AIlAo1bzE=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "file",
            type: "const char*"
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH00AIlQo2UOc=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "line",
            type: "int"
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH00AIlgo3+5k=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "message",
            type: "const char*"
        }
    ],
    visibility: type.UMLModelElement.VK_PUBLIC,
    getReturnParameter: function () {  return this.parameters[0]; }
};

describe('Operation Tests', function () {
    describe('constructor Tests', function () {
        it('should construct operation with the right name', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            assert.equal(testOperation.name, UMLOperationTest.name);
        });
        it('should construct operation with the right type', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            assert.equal(testOperation.returnType, UMLOperationTest.parameters[0].type);
        });
        it('should construct operation with the right visibility', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            assert.equal(testOperation.visibility, 'public');
        });
    });

    describe('getDeclaration Tests', function () {
        it('should return declaration for operation', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            let expectedDeclaration = 'void createLog( kLogType log_type, const char* file, int line, const char* message);';
            assert.equal(testOperation.getDeclaration(), expectedDeclaration);
        });
    });
});