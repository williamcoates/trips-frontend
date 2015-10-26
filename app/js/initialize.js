import routes from './routes'
require('js/modernizr-custom')

// Allow jQuery to set cookies on cross domain ajax
$.ajaxPrefilter( ( options, originalOptions, jqXHR ) => {
  options.crossDomain ={
    crossDomain: true
  };
  options.xhrFields = {
    withCredentials: true
  }
})

// Mount React app on #app
document.addEventListener('DOMContentLoaded', () => {
  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'))
  })
}, false)
