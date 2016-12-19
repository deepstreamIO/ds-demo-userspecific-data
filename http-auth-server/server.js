const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const users = {
	'user-a': {
		password: 'user-a-pass',
		discount: 0.05,
	},
	'user-b': {
		password: 'user-b-pass',
		discount: 0.1
	}
}

app.use(bodyParser.json());

app.post('/authenticate-user', function (req, res) {

	var userdata = users[ req.body.authData.username ];

	if( userdata && userdata.password === req.body.authData.password ) {
		res.send({
			serverData;
			discount: userdata.discount
		})
	} else {
		res.sendStatus( 403 );
	}
})

app.listen( port, function () {
  console.log( `listening on port ${port}` );
});