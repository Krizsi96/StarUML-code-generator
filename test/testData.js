const { Test } = require("mocha");

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

TestUMLAttribute = {
    _type: "UMLAttribute",
    _id: "AAAAAAGIFeyfNd/nV44=",
    _parent: {
        "$ref": "AAAAAAGHfGkeHtiig5w="
    },
    name: "Time_",
    visibility: type.UMLModelElement.VK_PUBLIC,
    type: "TimeInterface*"
};

TestUMLEnumeration = {
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

class UMLEnumeration {
    constructor() {
        this._type = "UMLEnumeration";
        this.name = 'kLogType';
    }
}

TestUMLOperationWithEnumParameter = {
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
            type: new UMLEnumeration()
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
    getReturnParameter: function () {  return this.parameters[0]; },
    getNonReturnParameters: function () { return this.parameters.slice(1); },
};

module.exports = {
    TestUMLAttribute: TestUMLAttribute,
    TestUMLEnumeration: TestUMLEnumeration,
    TestUMLOperationWithEnumParameter: TestUMLOperationWithEnumParameter
}