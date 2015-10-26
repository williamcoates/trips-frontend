var Route = ReactRouter.Route
var NotFoundRoute = ReactRouter.NotFoundRoute
var config = require('js/config')
import Backend from './backend'
import Home from './components/home'
import Register from './components/register'
import TravelPlanner from './components/travel_planner'
import App from './components/app'
import RouteNotFound from './components/route_not_found'

export default (
  <Route path={config.ROOT_PATH} handler={App}>
    <Route handler={Home}/>
    <Route path="travel-planner" handler={TravelPlanner}/>
    <Route path="register" handler={Register}/>
    <NotFoundRoute handler={RouteNotFound}/>
  </Route>
)
