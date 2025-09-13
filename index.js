require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();


const checker = /^(https?:\/\/)([a-zA-Z0-9-]+.)[a-zA-Z]{2,}.[a-z]{2,}/
var MEMORY = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:url',
	(req, res) => {
		res.redirect(MEMORY[req.params.url]['original_url']);
	}
);

app.post('/api/shorturl',
	(req, res) => {
		const url = req.body.url;
		if (!(checker.test(url))) {
			return res.json({'error': 'Invalid URL'});
		}
		var item = { original_url: url, short_url: MEMORY.length}
		MEMORY.push(item);
		res.json(item);
	}
);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
