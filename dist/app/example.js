angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);

angular.module('example').controller('GettingStartedController', function($scope, $q, supersonic) {

  var dataPromise = getData();
  var locationPromise = getPosition();

  google.maps.event.addDomListener(window, 'load', createMap);

  function createMap() {
    /*
     * Guaranteed not to run unless Firebase AND GPS data is successfully received
     * $scope.data contains firebase data
     * $scope.position contains GPS data
     */
    $q.all([dataPromise, locationPromise]).then(function(value) {
      var myCoordinates = new google.maps.LatLng(
        $scope.position.coords.latitude,
        $scope.position.coords.longitude
      );

      var map = new google.maps.Map(document.getElementById("googleMap"), {
        center: myCoordinates,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker = new google.maps.Marker({
        position: myCoordinates
      });
      marker.setMap(map);

      // Get bathrooms from firebase and add to map
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
      // Something went wrong
      supersonic.logger.info(reason);
    });
  }

  /*
   * Retrieve data from Firebase - asynchronous deferred/promise schema used
   */
  function getData() {
    var deferred = $q.defer();
    var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');

    ref.on("value", function(snapshot) {
      $scope.data = snapshot.val();
      deferred.resolve("(Data) Success!");
    }, function (errorObject) {
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

      return deferred.promise;
    });
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
