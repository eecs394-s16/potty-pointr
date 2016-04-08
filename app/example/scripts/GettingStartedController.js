angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {

    $scope.data = [
      {
        "bldg": "Technological Institute",
        "room": "F128",
        "floor": 1,
        "lat": 42.057561,
        "long": -87.67649,
        "gender": "M",
        "numStalls": 4,
        "numUrinals": 4,
        "numSinks": 4,
        "automation": "Toilets,urinals",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "M131",
        "floor": 1,
        "lat": 42.058026,
        "long": -87.67559,
        "gender": "M",
        "numStalls": 2,
        "numUrinals": 2,
        "numSinks": 2,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 0,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "Opposite L167",
        "floor": 1,
        "lat": 42.0579137,
        "long": -87.6760758,
        "gender": "M",
        "numStalls": 1,
        "numUrinals": 3,
        "numSinks": 3,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 0,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "E147",
        "floor": 1,
        "lat": 42.0582249,
        "long": -87.6750736,
        "gender": "M",
        "numStalls": 3,
        "numUrinals": 3,
        "numSinks": 3,
        "automation": "Toilets",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "K139",
        "floor": 1,
        "lat": 42.0572974,
        "long": -87.6750673,
        "gender": "M",
        "numStalls": 3,
        "numUrinals": 3,
        "numSinks": 3,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "Near A143",
        "floor": 1,
        "lat": 42.0582301,
        "long": -87.676636,
        "gender": "M",
        "numStalls": 3,
        "numUrinals": 2,
        "numSinks": 4,
        "automation": "Toilets",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "Near LR3",
        "floor": 1,
        "lat": 42.0577065,
        "long": -87.6760274,
        "gender": "F",
        "numStalls": 4,
        "numUrinals": 0,
        "numSinks": 3,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 1
      },
      {
        "bldg": "Technological Institute",
        "room": "M161",
        "floor": 1,
        "lat": 42.0577397,
        "long": -87.6757578,
        "gender": "F",
        "numStalls": 10,
        "numUrinals": 0,
        "numSinks": 4,
        "automation": "None",
        "numHandicap": 2,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 1
      },
      {
        "bldg": "Technological Institute",
        "room": "Near M166",
        "floor": 1,
        "lat": 42.0575819,
        "long": -87.6756037,
        "gender": "F",
        "numStalls": 3,
        "numUrinals": 0,
        "numSinks": 3,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 1
      },
      {
        "bldg": "Technological Institute",
        "room": "Near K126",
        "floor": 1,
        "lat": 42.057456,
        "long": -87.6751029,
        "gender": "F",
        "numStalls": 3,
        "numUrinals": 0,
        "numSinks": 3,
        "automation": "None",
        "numHandicap": 0,
        "numChemShowers": 0,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 0
      },
      {
        "bldg": "Technological Institute",
        "room": "Near Tech Express",
        "floor": 1,
        "lat": 42.0579337,
        "long": -87.6757963,
        "gender": "F",
        "numStalls": 9,
        "numUrinals": 0,
        "numSinks": 4,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 1
      },
      {
        "bldg": "Technological Institute",
        "room": "Near E129",
        "floor": 1,
        "lat": 42.0581249,
        "long": -87.6750736,
        "gender": "F",
        "numStalls": 3,
        "numUrinals": 0,
        "numSinks": 3,
        "automation": "None",
        "numHandicap": 1,
        "numChemShowers": 1,
        "numShowers": 0,
        "numStations": 0,
        "dryingOptions": "Towels",
        "numNapkinMachines": 1
      }
    ];
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

    var infowindow = new google.maps.InfoWindow({
        content:value.room
    });
    google.maps.event.addListener(mkr, 'click', function() {
        infowindow.open(map,mkr);
    });
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

}
);//close controller
