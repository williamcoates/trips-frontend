export default (form, keys) => {
  let formParams = {}
  for (let key of keys) {
    formParams[key] = form.refs[key].getDOMNode().value.trim()
  }
  return formParams
}
