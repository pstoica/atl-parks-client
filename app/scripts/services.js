angular.module('parkFind', ['ngResource']).
    factory('Park', function($resource) {
  return $resource('parks/:parkId.json', {}, {
    query: {
    	method:'GET',
    	params: { parkId: '' },
    	isArray: true
    }
  });
});