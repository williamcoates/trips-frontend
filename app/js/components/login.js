var Link = ReactRouter.Link
var config = require('js/config')
import LoadingSubmit from './loading_submit'
import formHelper from '../utils/form_helper'
import sessionStore from '../stores/session_store'
import actionHandler from '../action_handler'
import routeHelper from '../utils/route_helper'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loading: false }
    actionHandler.on('session-changed', () => this.state.loading = sessionStore.loading)
  }

  componentDidMount() {
    if (window.location.search.match(/verified/)) {
      actionHandler.emit('alert', { level: 'success', message: 'Email verified! Please login.' })
      this.context.router.transitionTo('/') // Make sure when they logout they dont get the above message again!
    }
  }

  signIn(event) {
    event.preventDefault()
    var credentials = {
      user: formHelper(this, ['email', 'password'])
    }
    sessionStore.authenticate(credentials)
  }

  render() {
    return (
      <div id="login">
        <h1>Login</h1>
        <form onSubmit={this.signIn.bind(this)}>
          <input type="email" ref="email" placeholder="Email" required/>
          <input type="password" ref="password" placeholder="Password" pattern=".{8,}" title="Minimum length 8" required/>
          <LoadingSubmit loading={this.state.loading} title="Login"/>
        </form>
        <Link to={routeHelper('register')}>Not yet registered?</Link>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}
