const express = require('express');
const app = express();
const predictRoute = require('./routes/predict');
const historiesRoute = require('./routes/histories');

app.use('/predict', predictRoute);
app.use('/predict', historiesRoute);

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
