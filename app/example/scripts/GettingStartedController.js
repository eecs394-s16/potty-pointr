angular
.module('example')
.controller('GettingStartedController', function($scope, $q, supersonic) {

  /*
   * Fetch data from Firebase
   */
  function getData() {
    var deferred = $q.defer();
    var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');

    ref.on("value", function(snapshot) {
      $scope.data = snapshot.val();
      deferred.resolve("Success!");
    }, function (errorObject) {
      deferred.reject("The read failed: " + str(errorObject.code));
    });

    return deferred.promise;
  }

  function initialize() {
    // Gender icons
    var female = new google.maps.MarkerImage(
      '/img/woman-512.png',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(35, 35)
    );
    var male = new google.maps.MarkerImage(
      '/img/man-512.png',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(35, 35)
    );

    // Instantiate the map with properties
    var mapProp = {
      center: new google.maps.LatLng(42.057800, -87.676417),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // Get current location and add to map
    supersonic.device.geolocation.getPosition().then(function(position) {
      // supersonic.logger.log(
      //   "Latitude: " + position.coords.latitude + "\n" +
      //   "Longitude: " + position.coords.longitude + "\n" +
      //   "Timestamp: " + position.timestamp
      // );
      var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var marker = new google.maps.Marker({
        position: myCenter
      });
      marker.setMap(map);

    });

    // Get bathrooms from firebase and add to map
    $scope.promise.then(function(greeting) {

      angular.forEach($scope.data, function(value) {
        var myC = new google.maps.LatLng(value.lat, value.long);
        var mkr;

        if (value.gender == "F"){
          mkr = new google.maps.Marker({
            position: myC,
            icon: female
          });
        } else {
          mkr = new google.maps.Marker({
            position: myC,
            icon: male
          });
        }
        mkr.setMap(map);

        var contentString = '<div class="mainContent">'+ value.room + ' | ' + value.gender +
        '</div><div class="rating">&#9734&#9734&#9734&#9734&#9734</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(mkr, 'click', function() {
          infowindow.open(map,mkr);
          var view = new supersonic.ui.View("example#learn-more");
          supersonic.ui.layers.push(view);
        });
      });
    }, function(reason) {
      supersonic.logger.info(reason);
    },
    null);
  }

  $scope.promise = getData();
  google.maps.event.addDomListener(window, 'load', initialize);

}); //close controller
