import Trips from './trips'
import Login from './login'
import backend from '../backend'
import actionHandler from '../action_handler'
import sessionStore from '../stores/session_store'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: sessionStore.sessionValid }
  }
  componentDidMount() {
    sessionStore.check()
    actionHandler.on('session-changed', () => {
      this.setState({loggedIn: sessionStore.sessionValid})
    })
  }
  render() {
    return (
      <div>
        {this.state.loggedIn ? <Trips/> : <Login/>}
      </div>
    )
  }
}
