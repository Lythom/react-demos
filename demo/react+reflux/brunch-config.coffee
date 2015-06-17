module.exports = config:
  files:
    javascripts: joinTo:
      'vendors.js': /^bower_components/
      'app.js': /^app/
    stylesheets: joinTo: 'app.css'
    templates: joinTo: 'app.js'
  plugins:
    postcss:
      processors: [
        require('autoprefixer')(['last 8 versions']),
        require('csswring')
      ]