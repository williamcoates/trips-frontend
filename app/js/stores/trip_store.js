import actionHandler from '../action_handler'
import backend from '../backend'

class TripStore {

  constructor() {
    this._trips = []
  }

  populate() {
    backend.get('/trips').then( (trips) => {
      this._trips = trips
      this.changed()
    }, () => {
      actionHandler.emit('alert', { level: 'error', message: 'An error occurred loading your trips, please check your network connection' })
    })
  }

  filter(options) {
    this._filter = options
    this.changed()
  }

  addTrip(trip) {
    if (this.tripValid(trip)) {
      let id = uuid.v4()
      trip.id = id
      this._trips.push(trip)
      this.changed()
      backend.post('/trips', { trip: trip }).then( (res) => {
        actionHandler.emit('trip-added')
        actionHandler.emit('alert', { level: 'success', message: 'Trip added ok!' })
      }, (error) => {
        actionHandler.emit('alert', { level: 'error', message: 'Problem creating trip :( Please check your network connection' })
        this.destroy(id, true)
      })
    }
  }

  tripValid(trip) {
    if (moment(trip.start_date).isAfter(trip.end_date)) {
      actionHandler.emit('alert', { level: 'error', message: "Make sure your trip start date is before or equal to your trip end date!" })
      return false
    }
    return true
  }

  destroy(id, silent=false) {
    let [deletedTrip, deletedIndex] = this.getTripAndIndex(id)
    this._trips.splice(deletedIndex, 1)
    this.changed()
    if (!silent) {
      backend.delete(`/trips/${id}`).then( (res) => {
        actionHandler.emit('alert', { level: 'success', message: 'Trip deleted!' })
      }, (error) => {
        actionHandler.emit('alert', { level: 'error', message: 'Problem deleting trip :( Please check your network connection' })
        this._trips.push(deletedTrip)
        this.changed()
      })
    }
  }

  save(id, params) {
    let [trip, index] = this.getTripAndIndex(id)
    let updatedTrip = params
    updatedTrip.id = id
    this._trips[index] = updatedTrip
    this.changed()
    backend.put(`/trips/${id}`, { trip: params } ).then( (res) => {
      actionHandler.emit('alert', { level: 'success', message: 'Trip updated!' })
    }, (error) => {
      actionHandler.emit('alert', { level: 'error', message: 'Problem updating trip :( Please check your network connection' })
      this._trips[index] = trip
      this.changed()
    })
  }

  getTripAndIndex(id) {
    let index = this._trips.findIndex( trip => trip.id === id )
    let trip = this._trips[index]
    return [trip, index]
  }

  changed() {
    actionHandler.emit('trips-changed')
  }

  get trips() {
    let { keyword, from, to } = this._filter || {}
    let keywordRegexp = new RegExp(keyword, 'i')
    let filteredTrips = this._trips.filter( (trip) => {
      let keywordValid = !keyword || trip.destination.match(keywordRegexp) || trip.comment.match(keywordRegexp)
      let fromValid = !from || moment(trip.start_date) >= from
      let toValid = !to || moment(trip.end_date) <= to
      return keywordValid && fromValid && toValid
    })
    return filteredTrips.sort( (a, b) => {
      return a.start_date.localeCompare(b.start_date)
    })
  }

  get nextMonthsTrips() {
    let startOfNextMonth = moment().add(1, 'months').startOf('month')
    let endOfNextMonth = startOfNextMonth.clone().endOf('month')
    return this._trips.filter( (trip) => {
      let startDate = moment(trip.start_date)
      return startDate >= startOfNextMonth && startDate <= endOfNextMonth
    })
  }
}

export default new TripStore
