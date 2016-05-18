angular.module('myApp.strengthModal', [])
  .controller('StrengthModalCtrl', function ($scope, AuthFactory, StrengthFactory, $cookies, ProfileFactory, $state, $uibModal, $uibModalInstance) {

    $scope.format = 'dd-MMMM-yyyy'

    $scope.open1 = function () {
      $scope.popup1.opened = true
    }

    $scope.clear = function () {
      $scope.dt = null
    }

    $scope.popup1 = {
      opened: false
    }

    $scope.user = $cookies.get('username')
    $scope.animationsEnabled = true
    $scope.noInput = false

    // Submit Button: Save information to database
    $scope.submitStrength = function () {
      if ($scope.dt === undefined || $scope.str.type === undefined || $scope.str.weight === undefined || $scope.str.sets === undefined || $scope.str.reps === undefined) {
        $scope.noInput = true
      } else {
        $uibModalInstance.dismiss('cancel')
        StrengthFactory.submitStrength(
          $scope.user,
          $scope.dt,
          $scope.str.type,
          $scope.str.sets,
          $scope.str.intensity,
          $scope.str.duration,
          $scope.str.weight,
          $scope.str.reps
        )
          .then(function (data) {
            $state.reload()
          })
      }
    }

    // Converting inches to feet and inches
    $scope.convert_feet = function (inches) {
      var feet = Math.floor(inches / 12)
      var inch = inches - feet * 12
      var tall = feet + "'" + inch
      return tall
    }
  })
  .directive('datetimepickerNeutralTimezone', function () {
    return {
      restrict: 'A',
      priority: 1,
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$formatters.push(function (value) {
          var date = new Date(Date.parse(value))
          date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()))
          return date
        })

        ctrl.$parsers.push(function (value) {
          var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()))
          return date
        })
      }
    }
  })
