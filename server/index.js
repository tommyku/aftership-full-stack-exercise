const app = require('express')();

app.get('/', (req, res) => {
  res.send('Wrong castle');
});

app.listen(3000, () => console.log('Server running'));
