angular
  .module('example')
  .controller('detailCtrl', function($scope, supersonic) {
    // $scope.example = steroids.view.params.data;
    supersonic.logger.log("#1");

    $scope.data = angular.fromJson(steroids.view.params.data);
    supersonic.logger.log("#2");

    document.getElementById("test").innerHTML = "whatever";
  });
