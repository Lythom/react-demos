module.exports = config:
  server: path: 'app/server/startServer.js'
  files:
    javascripts: joinTo:
      'app.js': /^app(\/|\\)(?!(server))/
    stylesheets: joinTo: 'app.css'
    templates: joinTo: 'app.js'
  plugins:
    postcss:
      processors: [
        require('autoprefixer')(['last 8 versions']),
        require('csswring')
      ]