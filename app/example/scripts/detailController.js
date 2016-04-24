angular
  .module('example')
  .controller('detailCtrl', function($scope, $q, supersonic) {
    $scope.payload = steroids.view.params.payload;

    $scope.reviews = [];


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
      supersonic.logger.log($scope.sanitizedPayload.reviews.toString());

      getReviews();
    }

    $scope.$watch('payload', function(newValue, oldValue) {
      convert();
    });

    /* Reviews */



    function getReviews () {
      var index = $scope.sanitizedPayload.bathroomId;
      index = parseInt(index);
      var deferred = $q.defer();
      var ref = new Firebase('https://scorching-fire-6140.firebaseio.com/');
      var brref = ref.child(index.toString());
      var reviewref = brref.child("reviews");

      //get review data
      reviewref.on("value", function(snapshot) {
        $scope.reviews = snapshot.val();
          // var everything = snapshot.val();
          // supersonic.logger.log(everything.toString());
          // for (var r in everything) {
          //   supersonic.logger.log(r.review.toString());
          //   r.review = r.review.split("%20").join(" ");
          //   $scope.reviews.push(r);
          // }
          // supersonic.logger.info("(Data) Success!");
           deferred.resolve("(Data) Success!");
        }, function (errorObject) {
          // supersonic.logger.info("The read failed: " + str(errorObject.code));
          deferred.reject("The read failed: " + str(errorObject.code));
        });

      return deferred.promise;

    }





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

      var review_text = $scope.reviewtext.split(' ').join("%20");

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
