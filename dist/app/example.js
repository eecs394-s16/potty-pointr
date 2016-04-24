angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);

angular
  .module('example')
  .controller('detailCtrl', function($scope, $q, supersonic) {
    $scope.payload = steroids.view.params.payload;

    function convert() {
      var payload = $scope.payload;

      payload = payload.replace("%20", " ");
      payload = payload.split(",");

      var payloadObj = {};

      for (var i = 0; i < payload.length; i++) {
        var key = payload[i].split(":")[0];
        var val = payload[i].split(":")[1];
        payloadObj[key] = val;
      }
      $scope.sanitizedPayload = payloadObj;
    }

    $scope.$watch('payload', function(newValue, oldValue) {
      convert();
    });

    /* Reviews */

    $scope.reviewtext = "";
    $scope.rating = 3;
    $scope.submitInfo = "";

    $scope.giveRating = function(rating) {
      supersonic.logger.log("rating changed to " + rating);
      $scope.rating = rating;
    }

    $scope.giveReviews = function() {
      supersonic.logger.log("submit button is clicked!");

      var deferred = $q.defer();
      var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');
      //var brref = ref.child(index.toString());
      var reviewref = ref.child("reviews");

      var review_text = $scope.reviewtext.replace(" ", "%20");
      $scope.bathroom_id = 3;   // let's just do this for now

      var the_review = {
        name : $scope.bathroom_id,
        rating : $scope.rating,
        review : review_text
      };
      reviewref.push(the_review);

      $scope.submitInfo = "Submitted successfully";

      supersonic.logger.log("Review " + $scope.reviewtext + " submitted for " + $scope.bathroom_id);

    };
  });

angular
  .module('example')
  .controller('mainCtrl', function($scope, $q, supersonic) {

  google.maps.event.addDomListener(window, 'load', createMap);

  var locationPromise = getPosition();  // location data promise
  var dataPromise = getData();          // firebase data promise

  /*
   * FILTERING
   * Everything to do with filtering markers
   */
  // If true, show bathrooms of that gender
  $scope.config = {
    male: true,
    female: true
  };

  // Store list of male and female restrooms for filtering purposes
  $scope.malemarkers = [];
  $scope.femalemarkers = [];

  $scope.$watch('config.male', function(newValue, oldValue) {
    if (newValue != oldValue) {
      for (var i = 0; i < $scope.malemarkers.length; i++) {
        $scope.malemarkers[i].setVisible(newValue);
      }
    }
  });

  $scope.$watch('config.female', function(newValue, oldValue) {
    if (newValue != oldValue) {
      for (var i = 0; i < $scope.femalemarkers.length; i++) {
        $scope.femalemarkers[i].setVisible(newValue);
      }
    }
  });



  /*
   * MAP DRAWING
   * Everything to do with creating map and adding markers
   */
  function createMap() {
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
      // map.panTo(myCoordinates);

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
      var infowindow;
      angular.forEach($scope.data, function(bathroom) {

        var bathroomC = new google.maps.LatLng(bathroom.lat, bathroom.long);
        var marker;

        if (bathroom.gender == "F") {
          marker = new google.maps.Marker({
            position: bathroomC,
            icon: female
          });
          $scope.femalemarkers.push(marker);
        } else {
          marker = new google.maps.Marker({
            position: bathroomC,
            icon: male
          });
          $scope.malemarkers.push(marker);
        }
        marker.bathroomData = bathroom;

        marker.setMap(map);

        google.maps.event.addListener(marker, 'click', function() {
          if (infowindow) infowindow.close();

          var bathroomString = [];
          for (var key in marker.bathroomData) {
            if (marker.bathroomData.hasOwnProperty(key)) {
              var value = marker.bathroomData[key];
              bathroomString.push(key + ":" + value);
            }
          }

          bathroomString = bathroomString.toString();
          bathroomString = bathroomString.replace(/ /g, '%20');

          supersonic.logger.log(bathroomString);

          stars = "";
          for (var j=0; j<bathroom.rating; j++){
            stars+='&#9733';
          }

          var contentString =
            "<super-navigate view-id='example#detail?payload=" + bathroomString + "'>\
              <u>"+bathroom.room+"</u>\</super-navigate>\
            <div class='rating'>"+stars+"</div>";

          infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          infowindow.open(map, marker);
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
      // supersonic.logger.info("(Data) Success!");
      deferred.resolve("(Data) Success!");
    }, function (errorObject) {
      // supersonic.logger.info("The read failed: " + str(errorObject.code));
      deferred.reject("The read failed: " + str(errorObject.code));
    });

    // giveReviews(8, "Good");  // it works

    return deferred.promise;
  }

  function giveReviews(index, text) {
    var deferred = $q.defer();
    var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');

    var brref = ref.child(index.toString());
    var reviewref = brref.child("reviews");
    reviewref.push({
      review : text
    });
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
