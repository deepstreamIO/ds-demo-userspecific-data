const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const users = {
	'user-a': {
		password: 'user-a-pass',
		serverData: { role: 'user' }
	},
	'user-b': {
		password: 'user-b-pass',
		serverData: { role: 'user' }
	},
	'data-provider': {
		password: 'provider-pass',
		serverData: { role: 'provider' }
	}
}


app.use(bodyParser.json());

app.post('/authenticate-user', function (req, res) {
	console.log( 'received auth request for ' + req.body.authData.username );
	var user = users[ req.body.authData.username ];
	if( user && user.password === req.body.authData.password ) {
		res.status( 200 ).json({
			username: req.body.authData.username,
			serverData: user.serverData
		});
	} else {
		res.sendStatus( 403 );
	}
})

app.listen( port, function () {
  console.log( `listening on port ${port}` );
});