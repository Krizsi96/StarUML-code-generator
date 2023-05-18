const { getVisibility, getType} = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')

/**
 * declare all attributes with the same type of visibility
 * @param {string} visibility
 * @return {string}
 */
function Attributes(visibility, attributes) {
  let declaration = [];
  attributes.forEach((attribute) => {
    if (getVisibility(attribute) == visibility)
      declaration.push(declareAttribute(attribute));
  })
  return declaration.join('\n\t');
}
exports.Attributes = Attributes;

/**
 * create declaration for attribute
 * @param {type.Model} attribute
 * @return {string}
 */
function declareAttribute(attribute) {
  let declaration = [];
  declaration.push(getType(attribute) + ' ' + attribute.name + ';');
  return declaration;
}