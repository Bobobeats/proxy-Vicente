const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3005;

const address = {
  comments: 'http://18.237.91.1:4001',
  relatedTracks: 'http://52.10.168.93:1000',
  player: 'http://34.217.131.190:3002',
};

app.use(cors());

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.get('/:component/bundle', (req, res) => {
  const { component } =  req.params;
  console.log('attempting to get bundle:', component);
  axios.get(`${address[component]}/${component}_bundle`)
    .then(bundleStream => {
      console.log("Bundle received:", component, bundleStream.hasOwnProperty('data'));
      res.status(200).send(bundleStream.data);
    })
    .catch(err => {
      console.log('Error receiving bundle:', component);
      console.log(err);
      res.status(500).send('Failed retrieving src')
    });
});

app.get('/api/:component/songs/:songId', (req, res) => {
  const { component, songId } =  req.params;
  const targetAddress = `${address[component]}/api/${component}/songs/${songId}`;
  console.log('Attempting to get at:', targetAddress);
  axios.get(targetAddress)
    .then(dataStream => {
      console.log("Data received:", component);
      console.log(dataStream);
      res.send(dataStream.data);
    })
    .catch(err => {
      console.log("Error receiving data:", component);
      res.status(500).send('Failed retrieving data')
    });;
});

app.listen(port, () => console.log(`Listening on port: ${port}`));