angular.module('parkFind', ['ngResource']).
    factory('Park', function($resource) {
  return $resource('parks/:parkId', { parkId: '' }, {
    query: {
    	method:'GET',
    	params: { parkId: '' },
    	isArray: true
    }
  });
});