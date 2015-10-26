import Trip from './trip'

export default class TripList extends React.Component {

  render() {
    return (
      <div>
        {this.props.trips.map( (t) => {
          return <Trip key={t.id} id={t.id} destination={t.destination} startDate={t.start_date} endDate={t.end_date} comment={t.comment} hideActions={this.props.hideActions}/>
        })}
      </div>
    )
  }

}
