angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {

    // $scope.navbarTitle = "Learn More";
    var myDataRef = new Firebase('https://scorching-fire-6140.firebaseio.com/');
    $('#messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
        var room = $('#roomInput').val();
        var text = $('#messageInput').val();
        myDataRef.push({room: room, text: text});
        $('#messageInput').val('');
      }
    });
    myDataRef.on('child_added', function(snapshot) {
      var message = snapshot.val();
      displayChatMessage(message.room, message.text);
    });
    function displayChatMessage(room, text) {
      $('<div/>').text(text).prepend($('<em/>').text(room+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }

  });
