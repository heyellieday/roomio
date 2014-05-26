angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.factory('gps', function() {
        return gps = {
            GPSWatchId : null,
            gpsErrorCount : 0,

            homeLatitude : null,
            homeLongitude : null,

            memberLatitude : null,
            memberLongitude : null,

            init : function() {
                gps.initToggleListener();
                gps.start();
            },
            initToggleListener : function() {
                /*$('#locationToggle').bind("change", function(event, ui) {
                    if (this.value == "true") {
                        gps.start();
                    } else {
                        gps.stop();
                    }
                });
            */
            },
            start : function() {
                var gpsOptions = {
                    enableHighAccuracy : false,
                    timeout : 1000 * 60 * 4,
                    maximumAge : 1 * 1000
                };
                gps.GPSWatchId = navigator.geolocation.watchPosition(gps.onSuccess,
                        gps.onError, gpsOptions);
            },
            stop : function() {
                navigator.geolocation.clearWatch(gps.GPSWatchId);
            },
            onSuccess : function(position) {
                // reset error counter
                gpsErrorCount = 0;
                alert("We have your location!" + ' Latitude: ' + position.coords.latitude.toFixed(3) + ' Longitude: ' + position.coords.longitude.toFixed(3));
                gps.memberLatitude = position.coords.latitude.toFixed(3);
                gps.memberLongitude = position.coords.longitude.toFixed(3);
                gps.isHome(position);

            },
            onError : function(error) {
                gps.gpsErrorCount++;

                if (gps.gpsErrorCount > 3) {
                    elem = document.getElementById('locationInfo');
                    $(elem).removeClass("success");
                    $(elem).addClass("fail");
                    elem.innerHTML = ('There is an error, restarting GPS. '
                             + error.message);
                    console.log('error with GPS: error.code: ' + error.code
                            + ' Message: ' + error.message);

                    // Restart GPS listener, fixes most issues.
                    gps.stop();
                    gps.start();
                }
            },
            isHome : function(position){
                if (position.coords.latitude.toFixed(3) == gps.homeLatitude && position.coords.longitude.toFixed(3) == gps.homeLongitude) {
                    console.log("true");
                    return true;
                } else {
                    console.log("false");
                    return false;
                }
            }
        };
})


.controller('MemberCtrl', function($scope, $stateParams, $http) {
})

.controller('GroupCtrl', ['$scope', '$http', '$stateParams', 'gps', function($scope, $http, $stateParams, gps) {
    $http.get('groups.json').success(function(data) {
       if ($stateParams.groupId == "") {
       
       }else{
            var currentUser = "heyellieday";
            $scope.groups = data["groups"];
            $scope.group = $scope.groups[$stateParams.groupId]; 
            $scope.members = $scope.group["members"];
            
            currentUser = $scope.members["heyellieday"];
            console.log(currentUser);
            homeLatitude =  $scope.group["homeLatitude"];
            gps.homeLatitude = homeLatitude;

            homeLongitude =  $scope.group["homeLongitude"];
            gps.homeLongitude = homeLongitude;

            
            gps.init();

            for (var member in $scope.members) {
                    member = $scope.members[member];
                    if (member["latitude"] == gps.homeLatitude) {
                        member["status"] = "in";
                        console.log(member.status);
                    }else {
                        member["status"] = "out";
                        console.log(member.status);
                    } 
            }    
       }
    });
}])

.controller('MenuCtrl', function($scope, $http, $stateParams) {
    $http.get('groups.json').success(function(data) {
        $scope.groups = data["groups"];
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
        $state.transitionTo('app.userInfo');
    };
})

.controller('UserInfoCtrl', function($scope, $http, $state) {
    
    $scope.formInfo = {};
    $scope.startGroup = function() {
        $scope.nameRequired = '';

        if (!$scope.formInfo.Name) {
            $scope.emailName = 'Name Required';
          }

        console.log($scope.formInfo);
        $state.transitionTo('app.startGroup');
    };
    $scope.joinGroup = function() {
        $scope.nameRequired = '';

        if (!$scope.formInfo.Name) {
            $scope.emailName = 'Name Required';
          }

        console.log($scope.formInfo);
        $state.transitionTo('app.joinGroup');
    };
})
.controller('StartGroupCtrl', function($scope, $http, $state) {
    var geocoder = new GClientGeocoder();

    function showAddress(address) {
      geocoder.getLatLng(
        address,
        function(point) {
          if (!point) {
            alert(address + " not found");
          } else {
            map.setCenter(point, 13);
            var marker = new GMarker(point);
            map.addOverlay(marker);

            // As this is user-generated content, we display it as
            // text rather than HTML to reduce XSS vulnerabilities.
            marker.openInfoWindow(document.createTextNode(address));
          }
        }
      );
    }


    $scope.formInfo = {};
    $scope.sendInvites = function() {
        $scope.nameRequired = '';

        if (!$scope.formInfo.Name) {
            $scope.nameRequired = 'Name Required';
          }

        console.log($scope.formInfo);
        $state.transitionTo('app.group');
    };
})
.controller('JoinGroupCtrl', function($scope, $http, $state) {
    
    $scope.formInfo = {};
    $scope.addToGroup = function() {
        $scope.pinRequired = '';

        if (!$scope.formInfo.Pin) {
            $scope.pinRequired = 'Pin Required';
          }

        console.log($scope.formInfo);
        $state.transitionTo('app.group');
    };
})