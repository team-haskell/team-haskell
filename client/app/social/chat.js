  angular.module('chatModule', ['myApp.socialFactoryModule', 'luegg.directives'])

  .controller('chatCtrl', function ($scope, socket, $cookies) {
    $scope.name = $cookies.get('username')
    $scope.messages = []
    $scope.chattingWith
    socket.on('messenger', function (message) {
      $scope.messages.push(message)
    })
    socket.on('roomNumber', function (data) {
      $scope.roomNumber = data.roomNumber
    })
    socket.on('chatHistory', function (messages) {
      $scope.messages = JSON.parse(messages.messages[0].message)
    })
    socket.on('notification', function(message){
      notifications(message.username, message.message, message.image[0].image)
    })
    $scope.sendMessage = function () {
      socket.emit('send:message', {
        roomNumber: $scope.roomNumber,
        username: $scope.name,
        message: $scope.message
      })
      // Add the message to our model locally
      $scope.messages.push({
        username: $scope.name,
        message: $scope.message
      })
      $scope.message = ''
    }
    function notifications (user, message, img) {
      if (!('Notification' in window)) {
        alert('Browser has no notification functionality')
      } else if (Notification.permission === 'granted') {
        var options = {
          body: message,
          icon: img,
          dir : 'ltr'
        }
        var notification = new Notification(user + ' wrote: ', options)
      } else if (Notification.permission !== 'denied') {

        Notification.requestPermission(function (permission) {
          if (!('permission' in Notification)) {
            Notification.permission = permission;
          }
          if (permission === 'granted') {
            var options = {
                    body: message,
                    icon: img,
                    dir : 'ltr'
            }
            var notification = new Notification(user + ' wrote: ', options)
          }
        })
      }
    }
  })
  .directive('scroll', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        scope.$watchCollection(attr.scroll, function (newVal) {
          $timeout(function () {
            element[0].scrollTop = element[0].scrollHeight
          })
        })
      }
    }
  })
