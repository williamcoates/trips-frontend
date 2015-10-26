var Link = ReactRouter.Link
import LoadingSubmit from './loading_submit'
import errorHandler from '../utils/error_handler'
import actionHandler from '../action_handler'
import backend from '../backend'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }
  register() {
    this.setState({ loading: true })
    event.preventDefault()
    var credentials = {
      user: {
        email: this.refs.email.getDOMNode().value.trim(),
        password: this.refs.password.getDOMNode().value.trim(),
        password_confirmation: this.refs.password_confirmation.getDOMNode().value.trim()
      }
    }
    let router = this.context.router
    backend.post('/users', credentials).then( (res) => {
        router.transitionTo('/')
        actionHandler.emit('alert', { level: 'success', message: 'Please check your email and click the verification link.' })
        this.setState({ loading: false })
    }, (res) => {
      errorHandler({password_confirmation: "password confirmation"})(res)
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <div id="register">
        <h1>Register</h1>
        <form onSubmit={this.register.bind(this)}>
          <input type="email" ref="email" placeholder="Email" required/>
          <input type="password" ref="password" placeholder="Password" pattern=".{8,}" title="Minimum length 8" required/>
          <input type="password" ref="password_confirmation" placeholder="Confirm Password" pattern=".{8,}" title="Minimum length 8" required/>
          <LoadingSubmit loading={this.state.loading} title="Register"/>
        </form>
        <Link to="/">Already registered?</Link>
      </div>
    )
  }
}

Register.contextTypes = {
  router: React.PropTypes.func.isRequired
}
