const { collectUMLEnumerations } = require('./enum_declaration.js');


function CodeGenerator(UMLelement) {
  let header = {
    CollectElements: function (UMLelement) {
      attributes = UMLelement.attributes;
      methods = UMLelement.methods;
      enumerations = collectUMLEnumerations(UMLelement);
    },
    attributes: [],
    methods: [],
    enumerations: [],
    log: [],
    supers: [],
    extends: '',
  };

  header.supers = UMLelement.getGeneralElements();
  header.extends = header.supers.length > 0 ? ': public ' + header.supers[0].name : '';

  header.CollectElements(UMLelement);
  return header;
}

exports.CodeGenerator = CodeGenerator;