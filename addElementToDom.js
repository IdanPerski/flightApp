/* create HTML elments functions */

export function createElementAndAppend(
  fatherElement,
  tag,
  attribute,
  attValue
) {
  const childElement = document.createElement(tag);
  childElement.setAttribute(attribute, attValue);
  return fatherElement.appendChild(childElement);
}

export function addDataToHtmlElement(element, AddTag, text, data) {
  element.innerHTML += `<${AddTag}>${text} ${data}</${AddTag}>`;
}
