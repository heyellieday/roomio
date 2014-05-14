angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})


.controller('RoommateCtrl', function($scope, $stateParams, $http) {
    
    $http.get('roommates.json').success(function(data) {
        roommates = data["roommates"];
        $scope.roommate = roommates[$stateParams.roommateUsername];
    });
})

.controller('RoommatesCtrl', function($scope, $http) {
    $http.get('roommates.json').success(function(data) {
        $scope.roommates = data["roommates"];
    });
})

.controller('SignupCtrl', function($scope, $http, $state) {
    
    $scope.formInfo = {};
    $scope.saveData = function() {
        $scope.emailRequired = '';
        $scope.passwordRequired = '';

        if (!$scope.formInfo.Email) {
            $scope.emailRequired = 'Email Required';
          }

          if (!$scope.formInfo.Password) {
            $scope.passwordRequired = 'Password Required';
         }
        console.log($scope.formInfo);
        $state.transitionTo('app.roommates');
    };
    $http.get('roommates.json').success(function(data) {
        $scope.roommates = data["roommates"];
    });
})