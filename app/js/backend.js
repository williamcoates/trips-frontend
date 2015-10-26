var config = require('js/config')
class Backend {

  constructor() {
    for (let method of ['get', 'put', 'post', 'delete']) {
      this[method] = (path, params={}) => {
        return this.call(path, params, method)
      }
    }
  }

  call(path, params={}, method='get') {
    method = method.toUpperCase()
    // we need to hack DELETE/PUT since browsers and jQuery do not support it natively
    if (method === 'DELETE' || method === 'PUT') {
        params['_method'] = method
        method = 'POST'
    }
    return $.ajax(`${this.endpoint()}${path}.json`, { data: params, method: method })
  }

  endpoint() {
    return config.BACKEND
  }

}

export default new Backend
