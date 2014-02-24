$(document).ready(function() {

var templateString = $('#instagram-template').html();
var templateFunction = Handlebars.compile(templateString);

	$('#user-search').on('submit',function(e) {
	 	e.preventDefault();

//pulls information about photos
	 var promise = $.ajax({
		url: 'fetch.php',
		type: 'get',
		dataType: 'json',
		data: {
			user: $('#insta-user').val()
		}

	  });

	promise.done(function(response) {
		console.log(response);
		$('#ajaxed-content').html("");

//for-loop for photos -- shows 16 most recent
	for (i=0; i < 16 /*response.data.length*/; i++) {
		var user = response.data[i]
		var htmlForUser = templateFunction(user);

		$('#ajaxed-content').append(htmlForUser);
	}

	});

//ajax .gif effect
	function showLoading() {
    $("#loading").show();
	}

	function hideLoading() {
    $("#loading").hide();
	}

	showLoading();
	$.get(function(){ 
    $("ajaxed-content").append();
    hideLoading();
	});

	});

});
