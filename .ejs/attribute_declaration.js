const { getVisibility, getType} = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')

/**
 * create declaration for attribute
 * @param {type.Model} attr
 * @return {string}
 */
function declareAttribute(attr) {
  let declaration = [];
  declaration.push(getType(attr) + ' ' + attr.name + ';');
  return declaration;
}

/**
 * declare all attributes with the same type of visibility
 * @param {string} visibility
 * @return {string}
 */
function Attributes(visibility, attributes) {
  let declaration = [];
  let declaration_index = 0;

  attributes.forEach((attr, index, array) => {
    if (getVisibility(attr) == visibility) {
      declaration[declaration_index] = declareAttribute(attr);
      declaration_index++;
    }
  })
  declaration.push('\n\t');

  return declaration.join('\n\t');
}

exports.Attributes = Attributes;