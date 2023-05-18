const { collectUMLEnumerations } = require('./enum_declaration.js');

let header = {
  CollectElements: function (UMLelement) {
    attributes = UMLelement.attributes;
    methods = UMLelement.methods;
    enumerations = collectUMLEnumerations(UMLelement);
  },
  attributes: [],
  methods: [],
  enumerations: []
};

function CodeGenerator(UMLelement) {
  header.CollectElements(UMLelement);
  return header;
}

exports.CodeGenerator = CodeGenerator;