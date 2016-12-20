class ViewModel{
	constructor() {
		this.ds = null;
		this.username = ko.observable( 'user-a' );
		this.password = ko.observable( 'user-a-pass' );
		this.firstname = ko.observable();
		this.lastname = ko.observable();
		this.eventMessage = ko.observable();
		this.isLoggedIn = ko.observable( false );
		this.rpcresult = ko.observable( '-' );
	}

	login() {
		this.ds = deepstream( 'localhost:6020' ).login({
			username: this.username(),
			password: this.password()
		}, this._onLogin.bind( this ))
	}

	_onLogin( success, errorCode, errorMessage ) {
		if( success ) {
			this._init();
		} else {
			alert( errorMessage );
		}
	}

	makeRpc() {
		this.ds.rpc.make( 'get-price', { username: this.username() }, this._onRpcResponse.bind( this ) );
	}

	_onRpcResponse( error, result ) {
		if( error ) {
			alert( error );
		} else {
			this.rpcresult( result );
		}
	}

	_init() {
		this.isLoggedIn( true );
		this.ds.record.getRecord( 'user/' + this.username() ).whenReady( this._getRecordData.bind( this ) );
		this.ds.event.subscribe( 'user-updates/' + this.username(), this._onEvent.bind( this ) );
	}

	_getRecordData( record ) {
		this.firstname( record.get( 'firstname' ) );
		this.lastname( record.get( 'lastname' ) );
	}

	_onEvent( message ) {
		this.eventMessage( message );
	}
}

window.onload = function() {
	ko.applyBindings( new ViewModel() );
}
