const deepstream = require( 'deepstream.io-client-js' );
const deepstreamUrl = 'localhost:6020';
const credentials = { username: 'data-provider', password: 'provider-pass' };
const ds = deepstream( deepstreamUrl );
const itemPrice = 100;
var count = 0;
const userdata = {
	'user-a': {
		discount: 0.1,
		personalData: {
			firstname: 'john',
			lastname: 'doe'
		}
	},
	'user-b': {
		discount: 0.3,
		personalData: {
			firstname: 'lisa',
			lastname: 'miller'
		}
	}
}

ds.login( credentials, ( success, error, errorMsg ) => {
	if( success ) {
		console.log( 'connected to ' + deepstreamUrl );
		provideRpc();
		createRecords();
		listenForEventSubscriptions();
	} else {
		console.log( `failed to connect to ${deepstreamUrl} with ${errorMsg}` );
	}
});

function provideRpc() {
	ds.rpc.provide( 'get-price', ( data, response ) => {
		console.log( 'received rpc for get-price with ', data );
		var discount = userdata[ data.username ].discount;
		var finalPrice = itemPrice - ( discount * itemPrice );
		response.send( finalPrice );
	});
}

function createRecords() {
	var username, record;
	for( username in userdata ) {
		record = ds.record.getRecord( 'user/' + username );
		//record.set( userdata[ username ].personalData );
		//record.discard();
	}
}

function listenForEventSubscriptions() {
	var intervals = {};

	ds.event.listen( 'user-updates/*', ( match, isSubscribed, response ) => {
		
		var username = match.replace( 'user-updates/', '' );
		console.log( 'found event subscription from ' + username );
		if( isSubscribed && typeof intervals[ username ] === 'undefined' ) {
			intervals[ username ] = setInterval( sendUserUpdateEvent.bind( this, username ), 500 );
		} else {
			clearInterval( intervals[ username ] );
			delete intervals[ username ];
		}
	})
}

function sendUserUpdateEvent( username ) {
	count++;
	var message = ( count % 2 === 0 ) ? 'Hey' : 'Ho';
	message += ' ' + userdata[ username ].personalData.firstname;
	ds.event.emit( 'user-updates/' + username, message );
}