'use strict';

var App = angular.module('myApp',['ngRoute','ngCookies','datatables']);

App.config(['$routeProvider', function($routeProvider) {
	$routeProvider
                                           
                .when('/profile', {
			templateUrl: '/profile',
			controller : "ProfileController as ctrl"
	
		})

                
                .when('/changePassword', {
			templateUrl: 'changePassword'
                
                })
                
                .when('/changePassword/:id', {
			templateUrl: 'changePassword',
                        controller : "ProfileController as ctrl"
			
	
		})
                
                .when('/accessDenied', {
			templateUrl: 'accessDenied'
                
                })
      
	
		.otherwise({redirectTo:'/'});
        

}]);

