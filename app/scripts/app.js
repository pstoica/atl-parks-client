'use strict';

var app = angular.module('parkFind', ['google-maps', 'ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "/views/park.list.html",
        controller: 'MainCtrl'
      })
      .when('/:parkId', {
        templateUrl: '/views/park.details.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.factory("Parks", function ($resource) {
  return $resource('http://localhost\\:3000/parks.json', {callback:'JSON_CALLBACK'}, {
    query: {
      method: 'JSONP',
      isArray: true
    }
  });
});

app.factory("Park", function ($resource) {
  return $resource('http://localhost\\:3000/parks/:parkId.json', {callback:'JSON_CALLBACK'}, {
    show: { method: 'JSONP' }
  });
});

function doSearch() {
  alert('hi');
}

app.controller('MainCtrl', function($scope, $resource, $location, $routeParams, Parks, Park) {
  $scope.showIntro = true;
  $scope.geolocationAvailable = navigator.geolocation ? true : false;
  $scope.center = {
    lat: 33.7489, // initial map center latitude
    lng: -84.3881, // initial map center longitude
  },
  $scope.zoom = 8; // the zoom level

  if ($routeParams.parkId) {
    $scope.showIntro = false;
    $scope.park = Park.show({parkId: $routeParams.parkId});
    $scope.parks = [];
  }

  $scope.doSearch = function() {
    alert('hi');
    $scope.showIntro = false;
    if ($location.path() !== "/") {
      $location.path("/");
    }

    $scope.parks = Parks.query({
      q: $scope.query
    });
    $scope.park = [];
  };

  $scope.findMe = function () {
    
    if ($scope.geolocationAvailable) {
      
      navigator.geolocation.getCurrentPosition(function (position) {
        
        $scope.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        $scope.$apply();
      }, function () {
        
      });
    } 
  };
});