// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setRouter = require('./routers');
const db = require('./config/mongodb.config.js');
const useSecret = require('./config/secret.config.js');

const port = process.env.PORT || 3000;

// mongoose connect
db.connect();

// app.use(express.static())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
useSecret.init(app, [/^\/auth/]);
setRouter(app);

app.listen(port, () => {
	console.log('server ok' + ' http://localhost:' + port);
});
