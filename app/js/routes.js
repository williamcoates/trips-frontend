var Route = ReactRouter.Route
var NotFoundRoute = ReactRouter.NotFoundRoute
import Backend from './backend'
import Home from './components/home'
import Register from './components/register'
import TravelPlanner from './components/travel_planner'
import App from './components/app'
import RouteNotFound from './components/route_not_found'

export default (
  <Route handler={App}>
    <Route path="/" handler={Home}/>
    <Route path="/travel-planner" handler={TravelPlanner}/>
    <Route path="/register" handler={Register}/>
    <NotFoundRoute handler={RouteNotFound}/>
  </Route>
)
