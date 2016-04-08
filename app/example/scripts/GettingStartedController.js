angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    var myDataRef = new Firebase('https://scorching-fire-6140.firebaseio.com/');
    myDataRef.on("value", function(snapshot) {
      console.log(snapshot.val());
      $scope.data = snapshot.val();
      google.maps.event.addDomListener(window, 'load', initialize);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  });

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(42.057800, -87.676417),
    zoom:18,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
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

  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  // current geolocation
  supersonic.device.geolocation.getPosition().then( function(position) {
    supersonic.logger.log(
      "Latitude: " + position.coords.latitude + "\n" +
      "Longitude: " + position.coords.longitude + "\n" +
      "Timestamp: " + position.timestamp
    );
    var myCenter=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //var myCenter=new google.maps.LatLng(42.057800, -87.676417);
    var marker=new google.maps.Marker({
    position:myCenter
    });
    marker.setMap(map);
  });

  //bathroom
  angular.forEach($scope.data , function(value){

    var myC=new google.maps.LatLng(value.lat,value.long);
        if (value.gender=="F"){
            var mkr=new google.maps.Marker({
            position:myC,
            icon:female});}
        else{var mkr=new google.maps.Marker({
            position:myC,
            icon:male});}
        mkr.setMap(map);

    var contentString = '<div class="mainContent">'+ value.room + ' | ' + value.gender +
        '</div><div class="rating">&#9734&#9734&#9734&#9734&#9734</div>';

    var infowindow = new google.maps.InfoWindow({
        content:contentString
    });
    google.maps.event.addListener(mkr, 'click', function() {
        infowindow.open(map,mkr);
        var view = new supersonic.ui.View("example#learn-more");
        supersonic.ui.layers.push(view);
    });
    });
}



}
);//close controller
