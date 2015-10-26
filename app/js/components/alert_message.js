import actionHandler from '../action_handler'

export default class AlertMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false}
  }
  // FIXME actionHandler shouldn't be so tightly coupled with AlertMessage
  componentDidMount() {
    actionHandler.on('alert', (alertInfo) => {
      this.setState({
        visible: true,
        level: alertInfo.level,
        message: alertInfo.message
      })
    })
  }
  componentDidUpdate(){
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    if (this.state.visible) {
      this.timeoutId = setTimeout(() => {
        this.setState({visible: false})
      }, this.props.delay)
    }
  }
  render() {
    var classes = `alert ${this.state.level}`
    return this.state.visible ? <div className={classes}>{this.state.message}</div> : <span/>
  }
}
