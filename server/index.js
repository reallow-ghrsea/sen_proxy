const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('newrelic');

const app = express();
const port = process.env.PORT || 3000;



console.log(__dirname);

app.use('/:houseId', express.static(path.resolve(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/houseId", cors(), (req, res) => {
  // let houseId = req.params.houseId;
  axios
    .get(`http://localhost:8081/houseId/properties/${req.params.houseId}`)
    .then(data => {
      res.send(data.data);
    })
    .catch(e => {
      console.log(e);
    });
});


app.listen(port, () => {
  console.log(`Proxy Server running at port ${port}`)
});