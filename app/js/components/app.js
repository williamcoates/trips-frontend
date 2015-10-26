import AlertMessage from './alert_message'
var RouteHandler = ReactRouter.RouteHandler

export default class App extends React.Component {
  render() {
    return (
        <div>
          <AlertMessage delay={5000}/>
          <RouteHandler/>
        </div>
    )
  }
}
