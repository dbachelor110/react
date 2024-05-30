const express = require('express')
const expressHandlebars = require('express-handlebars')

const contextMiddlware = require('./lib/middleware/FirstContext')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'firstDefaultLayout',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('FirstView'))

app.listen(port, () => {
  console.log( `Express started on http://localhost:${port}` +
    '; press Ctrl-C to terminate.' )
})
