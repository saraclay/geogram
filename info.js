$(document).ready(function() {

var templateString = $('#user-template').html();
var templateFunction = Handlebars.compile(templateString);

	$('#user-search').on('submit',function(e) {
	 	e.preventDefault();

//pulls user data information
	 var promise = $.ajax({
		url: 'fetch-info.php',
		type: 'get',
		dataType: 'json',
		data: {
			info: $('#insta-user').val()
		}

	  });

	promise.done(function(data) {
		console.log(data);
		$('#ajaxed-userinfo').html("");
	
		var info = data.data;
		console.log(info);

		var htmlForInfo = templateFunction(info);
		
//outputs user data information on web page
		$('#ajaxed-userinfo').append(htmlForInfo);
	

	});

	});

});

//should show info from here:
//https://api.instagram.com/v1/users/14265757/?access_token=17177217.f59def8.d29629c1eb264661958417cfde80b3bf