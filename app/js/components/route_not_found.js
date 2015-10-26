var Link = ReactRouter.Link
import routeHelper from '../utils/route_helper'

export default class RouteNotFound extends React.Component {

  render() {
    return (
      <div>
        <h1>Page not found</h1>
        <p>It seems that page does not exist. Head to the <Link to={routeHelper('')}>home</Link> page to find your bearings!</p>
      </div>
    )
  }
}
