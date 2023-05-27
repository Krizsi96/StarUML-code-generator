/**
 * Return visibility
 * @param {type.Model} element
 * @return {string}
 */
function getVisibility(element) {
  switch (element.visibility) {
    case type.UMLModelElement.VK_PUBLIC:
      return 'public';
    case type.UMLModelElement.VK_PROTECTED:
      return 'protected';
    case type.UMLModelElement.VK_PRIVATE:
      return 'private';
    default:
      return null
  }
}
exports.getVisibility = getVisibility;

/** TODO: Test it
* Collect modifiers of a given element.
* @param {type.Model} element
* @return {Array.<string>}
*/
function getModifiers(element) {
  let modifiers = [];
  let visibility = this.getVisibility(element);
  if (visibility) {
    modifiers.push(visibility);
  }
  if (element.isStatic === true) {
    modifiers.push('static');
  }
  if (element.isAbstract === true) {
    modifiers.push('abstract');
  }
  if (element.isFinalSpecialization === true || element.isLeaf === true) {
    modifiers.push('final');
  }
  if (element.concurrency === type.UMLBehavioralFeature.CCK_CONCURRENT) {
    modifiers.push('synchronized');
  }
  // transient
  // strictfp
  // const
  // native
  return modifiers;
}
exports.getModifiers = getModifiers;

/**
 *  Return type expression
 *  @param {type.Model} element
 *  @param {Array.<String>} imports Used to collect import declarations
 *  @return {string}
 */
function getType(element) {
  let _type = 'not found';
  if (element instanceof type.UMLAttribute) {
    _type = getTypeForAttribute(element);
  } else if (element instanceof type.UMLOperation) {
    _type = getTypeForOperation(element);
  }
  return _type;
}
exports.getType = getType;

function getTypeForOperation(operation) {
  let _type = 'not found';
  let return_parameter = operation.getReturnParameter();
  if (return_parameter === null) {
    if(operation.stereotype == 'constructor')
    _type = 'constructor';
    else if (operation.stereotype == 'destructor')
    _type = 'destructor';
  } else {
    _type = return_parameter.type;
  }
  return _type;
}

function getTypeForAttribute(attribute) {
  let _type = 'not found';
  if ((typeof attribute.type === 'string') && attribute.type.length > 0) {
    _type = attribute.type;
  } else if ((typeof attribute.type.name === 'string') && attribute.type.name.length > 0) {
    _type = attribute.type.name;
  }
  return _type;
}