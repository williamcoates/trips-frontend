export default (object, properties) => {
  for (let property of properties) {
    object[`${property}Changed`] = (type, value) => {
      if (!value._isAMomentObject) {
        value = value.target.value
      }
      if (value && type === 'date') {
        value = moment(value)
      }
      object.setState({ [property]: value })
    }
  }
}
