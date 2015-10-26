import Home from './home'
import Login from './login'
import TravelPlans from './travel_plans'

export default class TravelPlanner extends Home {

  componentDidMount() {
    super.componentDidMount()
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? <TravelPlans/> : <Login/>}
      </div>
    )
  }

}
