$(function(){
	var ds;

	$('form').on( 'submit', function( e ){
		e.preventDefault();
		var user = $( '[name="username"]').val();
		var pass = $( '[name="password"]').val();
		ds = deepstream( 'localhost:6020' ).login({
			username: user,
			password: pass
		}, function( success, errorCode, errorMessage ){
			console.log( arguments );
		})
	})
})