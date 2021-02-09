const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// caso eu va colocar imagens
// app.use('/images', express.static('images'));

app.post('/login', )

app.listen(port, () => console.log(`app - Listening on port ${port}`));
