export default class LoadingSubmit extends React.Component {
  render() {
    let copy = this.props.loading ? 'Loading...' : this.props.title
    let className = this.props.loading ? 'loading' : ''
    return <input type="submit" className={className} value={copy}/>
  }
}
