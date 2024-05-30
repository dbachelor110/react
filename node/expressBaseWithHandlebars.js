import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine(
    {
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}
));
app.set('view engine', 'handlebars');
app.set('views', './views');

// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.listen(3000);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(weatherMiddlware);

app.get('/', handlers.home);
app.get('/section-test', handlers.sectionTest);

app.use(handlers.notFound);
app.use(handlers.serverError);

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}