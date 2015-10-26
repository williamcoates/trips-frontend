exports.config =
  paths:
    watched: [
      'app',
      'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.min.js'
    ]
  files:
    javascripts:
      joinTo:
        'javascripts/vendor.js': /^(?!app)/
        'javascripts/app.js': /^app/
      order:
        before: [
          'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.min.js'
          'bower_components/react/react.js'
        ]
        after: [
          'bower_components/react-date-picker/dist/react-datepicker.js'
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': [
            /main/,
            'bower_components/react-date-picker/dist/react-datepicker.min.css'
        ]
        'stylesheets/desktop.css': /desktop/

  npm:
    enabled: true
