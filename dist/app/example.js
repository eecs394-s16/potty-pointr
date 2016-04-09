angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);

angular.module('example').controller('GettingStartedController', function($scope, $q, supersonic) {

  google.maps.event.addDomListener(window, 'load', createMap);

  var locationPromise = getPosition();  // location data promise
  var dataPromise = getData();          // firebase data promise

  function createMap() {
    // instantiate map with default location
    var map = new google.maps.Map(document.getElementById("googleMap"), {
      center: new google.maps.LatLng(42.057810, -87.675877),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    /*
     * Guaranteed not to run until GPS data is successfully received
     * $scope.position contains GPS data
     */
    locationPromise.then(function(message) {

      var myCoordinates = new google.maps.LatLng(
        $scope.position.coords.latitude,
        $scope.position.coords.longitude
      );

      var marker = new google.maps.Marker({
        position: myCoordinates
      });
      marker.setMap(map);

      map.panTo(myCoordinates);

    }, function(reason) {
      // Something went wrong
      supersonic.logger.info("locationPromise: " + reason);
    }, null);

    /*
     * Guaranteed not to run until Firebase data is successfully received
     * $scope.data contains firebase data
     */
    dataPromise.then(function(message) {

      var female = new google.maps.MarkerImage('/img/woman-512.png',
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

      angular.forEach($scope.data, function(bathroom) {

        var bathroomC = new google.maps.LatLng(bathroom.lat, bathroom.long);
        var marker;

        if (bathroom.gender == "F") {
          marker = new google.maps.Marker({
            position: bathroomC,
            icon: female
          });
        } else {
          marker = new google.maps.Marker({
            position: bathroomC,
            icon: male
          });
        }
        marker.setMap(map);

        var contentString = '<div class="mainContent">'+ bathroom.room + ' | ' + bathroom.gender +
        '</div><div class="rating">&#9734&#9734&#9734&#9734&#9734</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
          var view = new supersonic.ui.View("example#learn-more");
          supersonic.ui.layers.push(view);
        });

      });

    }, function(reason) {
      // Something went wrong
      supersonic.logger.log("dataPromise: " + reason);
    }, null);
  }

  /*
   * Retrieve data from Firebase - asynchronous deferred/promise schema used
   */
  function getData() {
    var deferred = $q.defer();
    var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');

    ref.on("value", function(snapshot) {
      $scope.data = snapshot.val();
      supersonic.logger.info("(Data) Success!");
      deferred.resolve("(Data) Success!");
    }, function (errorObject) {
      supersonic.logger.info("The read failed: " + str(errorObject.code));
      deferred.reject("The read failed: " + str(errorObject.code));
    });

    return deferred.promise;
  }

  /*
   *  Retrieve GPS data using supersonic - asynchronous deferred/promise schema used
   */
  function getPosition() {
    var deferred = $q.defer();

    supersonic.device.geolocation.getPosition().then(function(position) {
      // supersonic.logger.log(
      //   "Latitude: " + position.coords.latitude + "\n" +
      //   "Longitude: " + position.coords.longitude + "\n" +
      //   "Timestamp: " + position.timestamp
      // );

      $scope.position = position;
      deferred.resolve("(Position) Success!");
    });

    return deferred.promise;
  }

}); //close controller

angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";

  });

angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
  });
