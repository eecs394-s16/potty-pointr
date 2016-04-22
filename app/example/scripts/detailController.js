angular
  .module('example')
  .controller('detailCtrl', function($scope, supersonic) {
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
  });
