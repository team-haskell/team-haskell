angular.module('myApp.signin', [])

  .controller('SigninCtrl', function ($scope, $state, AuthFactory, $uibModalInstance, $uibModal, $cookies, $rootScope) {
    $scope.animationsEnabled = true
    $scope.noInput = false
    $scope.userDoesNotExist = null
    $scope.goSignup = function () {
      $state.go('signup')
    }

    $scope.signin = function () {
      AuthFactory.signIn($scope.user.name, $scope.user.password)
        .then(function (data) {
          if (!data.data.success) {
            $state.reload()
            $scope.userDoesNotExist = true
          } else {
            $uibModalInstance.dismiss('cancel')
            $cookies.put('username', data.config.data.username)
            $cookies.put('token', data.data.token)
            AuthFactory.getProfile($cookies.get('username'))
              .then(function(data) {
                AuthFactory.userData = data.data[0]
                $state.go('dashboard')
              })
          }
        })
    }

    $scope.signup = function () {
      $uibModalInstance.dismiss('cancel')
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          items: function () {
            return $scope.items
          }
        }
      })

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem
      }, function () {
      })
    }
  })
