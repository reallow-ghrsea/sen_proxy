const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('newrelic');

const app = express();

app.use(express.static(__dirname + '/../public/'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/houseId/*", cors(), (req, res) => {
  console.log(req.params.houseId)
  axios
    .get(`http://ec2-54-244-76-221.us-west-2.compute.amazonaws.com:8081${req.originalUrl}`)

    .then(data => {
      res.send(data.data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.use('*', express.static(__dirname + '/../public/index.html'));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Proxy Server running at port ${port}`)
});