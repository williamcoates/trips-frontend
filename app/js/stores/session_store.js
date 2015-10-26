import actionHandler from '../action_handler'
import backend from '../backend'

class SessionStore {

  constructor() {
    this._sessionValid = false
    this.loading = false
  }

  check() {
    backend.get('/sessions/valid').then( (res) => {
      this.sessionValid = res.session_valid
    })
  }

  authenticate(credentials) {
    this.loading = true
    this.changed()
    backend.post('/users/sign_in', credentials).then( (res) => {
        this.sessionValid = true
        actionHandler.emit('alert', { level: 'success', message: 'Logged in.' })
    }, (res) => {
        actionHandler.emit('alert', { level: 'error', message: res.responseJSON ? res.responseJSON.error : 'Unable to login, please check your network connection.'})
        this.loading = false
        this.changed()
    })
  }

  logOut() {
    this.sessionValid = false
    actionHandler.emit('alert', { level: 'success', message: 'Logged out.' })
    // TODO handle error when signing out
    backend.delete('/users/sign_out')
  }

  get sessionValid() {
    return this._sessionValid
  }

  set sessionValid(isValid) {
    if (this._sessionValid !== isValid) {
      this._sessionValid = isValid
      this.changed()
    }
  }

  changed() {
    actionHandler.emit('session-changed')
  }
}

export default new SessionStore
