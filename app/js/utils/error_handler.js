import actionHandler from '../action_handler'

export default (keyMappings) => {
  return (res) => {
    let json = res.responseJSON
    let errorDetails = { level: 'error' }
    if (json) {
      if (json.error) {
        errorDetails.message = json.error
      } else {
        let errorKeys = Object.keys(json.errors)
        let message = errorKeys.map( (key) => {
          return `${keyMappings[key] || key} ${json.errors[key][0].toLowerCase()}`
        }).join(' & ')
        errorDetails.message = `Sorry: ${message}`
      }
    } else {
      errorDetails.message = 'Unknown error :('
    }

    actionHandler.emit('alert', errorDetails)
  }
}
