angular
  .module('example')
  .controller('BathroomDetailsController', function($scope, $q, supersonic) {

    var bathroom_id = steroids.view.params.id;
    supersonic.logger.info(bathroom_id);

    var dataPromise = getData();          // firebase data promise

    /*
     * Guaranteed not to run until Firebase data is successfully received
     * $scope.data contains firebase data
     */
    dataPromise.then(function(message) {
      supersonic.logger.info($scope.data);

      for (var bath in $scope.data) {
        if (bath.room === bathroom_id) {
          $scope.currentBath = bath;
        }
      }
    }, function(reason) {
      // Something went wrong
      supersonic.logger.log("dataPromise: " + reason);
    }, null);

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

  });
