var Link = ReactRouter.Link

export default class RouteNotFound extends React.Component {

  render() {
    return (
      <div>
        <h1>Page not found</h1>
        <p>It seems that page does not exist. Head to the <Link to="/">home</Link> page to find your bearings!</p>
      </div>
    )
  }
}
