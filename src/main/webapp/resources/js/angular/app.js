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
                
                .when('/home/games', {
			templateUrl: 'home/games',
			controller : "GameController as ctrl"
	
		})
                
                
		.when('/game/gamedetails/:id', {
			templateUrl: 'game/gamedetails',
			controller : "GameDetailsController as ctrl"
			
		})
                
                 .when('/newGame', {
			templateUrl: 'game/newGame',
                	controller : "GameController as ctrl"
		})
      
	
		.otherwise({redirectTo:'/'});
        

}]);

