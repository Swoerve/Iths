export function removeChildren(element) {
  while(element.lastChild){
    element.removeChild(element.lastChild)
  }
}