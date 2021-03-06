angular.module('myApp.profile', [])

  .controller('ProfileCtrl', function ($state, $rootScope, $scope, $window, AuthFactory, ProfileFactory, $cookies, filepickerService) {
    $scope.changesSaved = false
    $scope.username = $cookies.get('username')
    $scope.init = function () {
      ProfileFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          $scope.display = data.data[0]
          $scope.prof = {activity: data.data[0].activitylvl,
            gym: data.data[0].gym || ''
          }
          $scope.image = data.data[0].image
          $scope.prof.interest = $scope.display.interest
        })
    }

    $scope.submitProfile = function () {
      if (!$scope.prof.gym) {
        $scope.prof.gym = $scope.prof.otherGym
      }
      ProfileFactory.submitProfile($cookies.get('username'), $scope.prof.weight, $scope.prof.bodyFat, $('input[name="prof.activity"]:checked').val(), $scope.prof.interest, $scope.prof.gym)
        .then(function () {
          $scope.changesSaved = true
        })
    }

    $scope.getGender = function (integer) {
      var gender = Number(integer)
      if (gender === 0) {
        return 'Male'
      } else {
        return 'Female'
      }
    }

    $scope.upload = function () {
      filepickerService.pick(
        {
          cropRatio: 4 / 4,
          mimetype: 'image/*',
          language: 'en',
          services: ['COMPUTER', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM', 'CONVERT'],
          conversions: ['crop', 'rotate', 'filter'],
          openTo: 'IMAGE_SEARCH'
        },
        function (Blob) {
          ProfileFactory.uploadPicture($scope.username, JSON.stringify(Blob))
            .then(function (data) {
              $scope.image = data
              $state.reload()
            })
        }
      )
    }

    $scope.init()
  })
  .directive('theGym2', function () {
    return {
      restrict: 'A',
      transclude: true,
      scope: true,
      link: function (scope, element, attrs) {
          element.bind('click', function() {
          scope.prof.gym = ''
          })
      }
    }
  })
