
	//finding location of user visiting site -- pop up via firefox
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 4,
	center: new google.maps.LatLng(38.048091, -94.670906), //possible to move to first center that shows up?
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

//finds current location of user
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var currentLatLng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    var address;

    geocoder.geocode({
      location: currentLatLng
    }, function(data) {
      console.log(data);

    });

   console.log(lat, lng);

   var marker = new google.maps.Marker({
      title: 'You are here', 
      position: currentLatLng,
      map: map,
      icon: 'images/cam_icon.png',
      draggable: true
    });

       marker.setMap(map);

       google.maps.event.addListener(marker, 'click', function(event) {

      var infowindow = new google.maps.InfoWindow({
        title: 'Current location',
        position: currentLatLng
      });

      infowindow.open(map);

       });

  });

	$('#user-search').on('submit',function(e) {
	 	e.preventDefault();

  var searchUser = $(this).find('.instagram-search').val();
  //searchUser = searchUser.replace(/ /g, '+');

  var script = document.createElement('script');
  script.src = ("https://api.instagram.com/v1/users/"+searchUser+"/media/recent/?access_token=17177217.f59def8.d29629c1eb264661958417cfde80b3bf&callback=processJSONP");
  document.getElementsByTagName('head')[0].appendChild(script);

});

//will pull data from geotagged locations and place on map
  var processJSONP = function(json) {

  for (var i=0; i< json.data.length; i++) {
    var gram = json.data[i].location;
    var heart = json.data[i].likes;

    if (gram) {
      var lat = gram.latitude; 
      var lng = gram.longitude;
      var name = gram.name;
      var likeCount = heart.count;

      var marker = new google.maps.Marker({
          title: name, 
          position: new google.maps.LatLng(lat, lng),
          map: map,
          icon: "images/cam_icon.png"
        });  

        marker.setMap(map);
        bindInfowindow(marker, name, lat, lng, likeCount);
    }
     

  }

//info window of places listing name of place and number of likes the photo has received
  function bindInfowindow(marker, name, lat, lng, likeCount) {
    google.maps.event.addListener(marker, 'click', function(event) {

      //contains content of infowindow
        var contentString ='<div id="bodyContent">'+
      '<p>This is <b>' + name + '</b>.</p>'  +
      '<p><img src="images/heart_icon.png">' + likeCount + '   people like this.'
      '</div>';

      //this sets up the infowindow. hurrah!
      var infowindow = new google.maps.InfoWindow({
        title: name,
        content: contentString,
        map:map,
        position: new google.maps.LatLng(lat, lng)
      });

      infowindow.open(map);

       });
  }

  var mapOptions = {
  center: new google.maps.LatLng(lat, lng),
  zoom: 5
  };

  };
