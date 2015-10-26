import TripList from './trip_list'
var Link = ReactRouter.Link
import tripStore from '../stores/trip_store'
import actionHandler from '../action_handler'

export default class TravelPlans extends React.Component {

  constructor(props) {
    super(props)
    this.state = { trips: tripStore.trips }
  }

  componentDidMount() {
    actionHandler.on('trips-changed', () => {
      this.setState({ trips: tripStore.nextMonthsTrips })
    })
    tripStore.populate()
  }

  render() {
    return (
      <div id="travel-planner">
        <h1>Next months' trips</h1>
        <TripList trips={this.state.trips} hideActions={true}/>
        <button onClick={window.print}>Print</button>
        <Link className="button" to="/">Back</Link>
      </div>
    )
  }
}
