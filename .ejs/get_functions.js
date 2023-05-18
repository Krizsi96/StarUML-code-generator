/**
 * Return visibility
 * @param {type.Model} elem
 * @return {string}
 */
function getVisibility(elem) {
  switch (elem.visibility) {
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
* @param {type.Model} elem
* @return {Array.<string>}
*/
function getModifiers(elem) {
  let modifiers = [];
  let visibility = this.getVisibility(elem);
  if (visibility) {
    modifiers.push(visibility);
  }
  if (elem.isStatic === true) {
    modifiers.push('static');
  }
  if (elem.isAbstract === true) {
    modifiers.push('abstract');
  }
  if (elem.isFinalSpecialization === true || elem.isLeaf === true) {
    modifiers.push('final');
  }
  if (elem.concurrency === type.UMLBehavioralFeature.CCK_CONCURRENT) {
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
 *  @param {type.Model} elem
 *  @param {Array.<String>} imports Used to collect import declarations
 *  @return {string}
 */
function getType(elem) {
  let _type = 'not found';

  // type name
  if (elem instanceof type.UMLAttribute) {
    if ((typeof elem.type === 'string') && elem.type.length > 0) {
      _type = elem.type;
    }
  } else if (elem instanceof type.UMLOperation) {
    let return_parameter = elem.getReturnParameter();
    if (return_parameter === null) {
      if(elem.stereotype == 'constructor')
      _type = 'constructor';
      else if (elem.stereotype == 'destructor')
      _type = 'destructor';
    }
    else {
      _type = return_parameter.type;
    }
  }
  return _type;
}

exports.getType = getType;