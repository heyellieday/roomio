angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})


.controller('RoommateCtrl', function($rootScope, $stateParams) {
    $scope.roommate = $rootScope.roommates[id: $stateParams.roommateId]
})

.controller('RoommatesCtrl', function($scope, $rootScope) {
  $rootScope.roommates = [
      { title: 'Ellie', id: 1, bio: "Awesomely Awesome", 
       profileImg: "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/t1.0-9/10153765_1403043279972803_7769249082470726667_n.jpg", status: "in" },
    { title: 'Vijay', id: 2, bio: "Also Awesome", 
     profileImg: "https://lh4.googleusercontent.com/-k8mKIvx7y_o/Thm9E_mN5pI/AAAAAAAACYM/WLOXHeBQwKI/w268-h267-no/100_1606.JPG.jpg", status: "in" },
      { title: 'Kate', id: 3, bio: "Sister of Ellie, awesome as well.", 
       profileImg: "https://scontent-b.xx.fbcdn.net/hphotos-prn2/t1.0-9/p720x720/1175613_10201864662124380_658618106_n.jpg", status: "out" },

  ];
})