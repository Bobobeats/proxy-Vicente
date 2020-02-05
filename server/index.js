const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(cors());

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.listen(port, () => console.log(`Listening on port: ${port}`));