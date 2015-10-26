import DateInput from './date_input'
import tripStore from '../stores/trip_store'
import tripProperties from '../constants/trip_properties'
import onChangeSetup from '../utils/on_change_setup'

export default class Trip extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      destination: (this.props.destination || ''),
      startDate: moment(this.props.startDate),
      endDate: moment(this.props.endDate),
      comment: (this.props.comment || '')
    }
    onChangeSetup(this, ['destination', 'startDate', 'endDate', 'comment'])
  }

  duration() {
    return `${moment(this.props.startDate).format('MMMM Do YYYY')} - ${moment(this.props.endDate).format('MMMM Do YYYY')}`
  }

  daysTo() {
    return moment().startOf('day').to(moment(this.props.startDate))
  }

  inFuture() {
    return moment(this.props.startDate).toDate() > new Date()
  }

  destroy() {
    tripStore.destroy(this.props.id)
  }

  toggleEditing() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  save(event) {
    event.preventDefault()
    let trip = {
      destination: this.state.destination.trim(),
      start_date: this.state.startDate.toJSON(),
      end_date: this.state.endDate.toJSON(),
      comment: this.state.comment.trim()
    }
    if (tripStore.tripValid(trip)) {
      tripStore.save(this.props.id, trip)
      this.toggleEditing()
    }
  }

  render() {
    let startingIn = this.inFuture() ? <span className="days">(Starting {this.daysTo()})</span> : null
    let readView = (
      <div>
        <h2 className="destination">{this.props.destination} {startingIn}</h2>
        <div className="duration">{this.duration()}</div>
        <div className="comment">{this.props.comment}</div>
        <div className="buttons">
          {this.props.hideActions ? null : <div className="col"><button onClick={this.toggleEditing.bind(this)}>Edit</button></div>}
          {this.props.hideActions ? null : <div className="col"><button onClick={this.destroy.bind(this)}>Delete</button></div>}
        </div>
      </div>
    )
    // TODO allow update by hitting return key
    let writeView = (
      <div>
        <input type="text" value={this.state.destination} onChange={this.destinationChanged.bind(this, 'string')} required/>
        <DateInput date={this.state.startDate} required={true} onChange={this.startDateChanged.bind(this, 'date')}/>
        <DateInput date={this.state.endDate} required={true} onChange={this.endDateChanged.bind(this, 'date')}/>
        <textarea value={this.state.comment} onChange={this.commentChanged.bind(this, 'string')} required/>
        <div className="buttons">
          <div className="col"><button onClick={this.save.bind(this)}>Save</button></div>
          <div className="col"><button onClick={this.toggleEditing.bind(this)}>Cancel</button></div>
        </div>
      </div>
    )
    return (
      <div className="trip">
        {this.state.isEditing ? writeView : readView}
      </div>
    )
  }

}
