// For touch devices the HTML5 input is a better choice as uses native controls.
export default class DateInput extends React.Component {
  render() {
    return (Modernizr.touchevents ?
      <input type="date" value={this.props.date ? this.props.date.format('YYYY-MM-DD') : this.props.date} placeholder={this.props.placeholder} onChange={this.props.onChange} required={this.props.required} /> :
      <DatePicker selected={this.props.date} placeholderText={this.props.placeholder} required={this.props.required} onChange={this.props.onChange} isClearable={this.props.isClearable}/>
    )
  }
}
