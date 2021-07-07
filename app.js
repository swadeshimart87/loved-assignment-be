const express = require('express');
const app = express();
var yahooFinance = require('yahoo-finance');

const port = 3001

app.get('/app', (req, res) => {
  const SYMBOLS = req.query && req.query.symbols && req.query.symbols.split(',');
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
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
