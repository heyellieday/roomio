angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})


.controller('RoommateCtrl', function($scope, $stateParams) {
    
    $scope.roommate = { title: 'Ellie', id: 1, bio: "Awesomely Awesome", 
       profileImg: "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/t1.0-9/10153765_1403043279972803_7769249082470726667_n.jpg", status: "in" };
})

.controller('RoommatesCtrl', function($scope, $http) {
    $http.get('roommates.json').success(function(data) {
        $scope.roommates = data["roommates"];
    });
})