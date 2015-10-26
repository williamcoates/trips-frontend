var Link = ReactRouter.Link
import actionHandler from '../action_handler'
import TripList from './trip_list'
import DateInput from './date_input'
import tripStore from '../stores/trip_store'
import sessionStore from '../stores/session_store'
import tripProperties from '../constants/trip_properties'
import onChangeSetup from '../utils/on_change_setup'
import routeHelper from '../utils/route_helper'

export default class Trips extends React.Component {

  setupFilters(filters) {
    for (let filter of filters) {
      this[`filterBy${filter[0].toUpperCase()}${filter.substring(1)}`] = (type, value) => {
        if (value && !value._isAMomentObject) {
          value = value.target.value
        }
        if (value && type === 'date') {
          value = moment(value)
        }
        tripStore.filter({ [filter]: value })
        this.setState({[filter]: value})
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      trips: tripStore.trips,
      keyword: '',
      from: null,
      to: null,
      destination: '',
      start_date: null,
      end_date: null,
      comment: ''
    }
    this.setupFilters(['keyword', 'from', 'to'])
    onChangeSetup(this, tripProperties)
  }

  componentDidMount() {
    actionHandler.on('trips-changed', this.updateTrips.bind(this))
    actionHandler.on('trip-added', this.clearForm.bind(this))
    tripStore.populate()
  }

  signOut() {
    sessionStore.logOut()
  }

  updateTrips() {
    this.setState({ trips: tripStore.trips })
  }

  addTrip(event) {
    event.preventDefault()
    tripStore.addTrip({
      destination: this.state.destination.trim(),
      start_date: this.state.start_date.toJSON(),
      end_date: this.state.end_date.toJSON(),
      comment: this.state.comment.trim()
    })
  }

  clearForm() {
    this.setState( {
      destination: '',
      start_date: '',
      end_date: '',
      comment: ''
    })
  }

  render() {
    return (
      <div id="trips">
        <h1>My Trips
          <span id="logout" className="button" onClick={this.signOut}>Log out</span>
        </h1>
        <Link className="travel-planner" to={routeHelper('travel-planner')}>See next months trips...</Link>
        <div>
          <input type="text" placeholder="Filter by keyword" onChange={this.filterByKeyword.bind(this, 'string')} />
          <label>Filter trips starting on or after:</label>
          <DateInput placeholder="From" date={this.state.from} onChange={this.filterByFrom.bind(this, 'date')} isClearable={true}/>
          <label>Filter trips starting on or before:</label>
          <DateInput placeholder="To" date={this.state.to} onChange={this.filterByTo.bind(this, 'date')} isClearable={true}/>
        </div>
        <TripList trips={this.state.trips} />
        <h2>Add a new Trip</h2>
        <form onSubmit={this.addTrip.bind(this)}>
          <input type="text" placeholder="Destination" value={this.state.destination} onChange={this.destinationChanged.bind(this, 'string')} required/>
          <DateInput placeholder="Trip start" date={this.state.start_date} required={true} onChange={this.start_dateChanged.bind(this, 'date')}/>
          <DateInput placeholder="Trip end" date={this.state.end_date}  required={true} onChange={this.end_dateChanged.bind(this, 'date')}/>
          <textarea onChange={this.commentChanged.bind(this, 'string')} value={this.state.comment}></textarea>
          <input type="submit" value="Add Trip"/>
        </form>
      </div>
    )
  }
}
