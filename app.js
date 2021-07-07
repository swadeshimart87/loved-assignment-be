const express = require('express');
const app = express();
var yahooFinance = require('yahoo-finance');

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  const SYMBOLS = req.query && req.query.symbols && req.query.symbols.split(',');
  if(SYMBOLS) {
    yahooFinance.quote({
      symbols: SYMBOLS,
      modules: ['price']
    }, function(err, quotes) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(quotes)
      return;
    });
  } else {
    res.status(400).send({'Error': 'Send symbols'});
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
