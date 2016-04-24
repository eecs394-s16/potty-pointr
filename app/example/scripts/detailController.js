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

      var index = $scope.sanitizedPayload.bathroomId;
      //index = string(index);
      index = parseInt(index);
      supersonic.logger.log("looking at bathroom " + index);

      var deferred = $q.defer();
      var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');
      var brref = ref.child(index.toString());
      var reviewref = brref.child("reviews");

      var review_text = $scope.reviewtext.replace(" ", "%20");

      var the_review = {
        name : index,
        rating : $scope.rating,
        review : review_text
      };
      reviewref.push(the_review);

      $scope.submitInfo = "Submitted successfully";

      supersonic.logger.log("Review " + $scope.reviewtext + " submitted for " + index);

    };
  });
