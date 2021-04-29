'use strict';

var App = angular.module('myApp',['ngRoute','ngCookies','datatables','ngToast']);

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
                
                
		.when('/game/currentgame/:id', {
			templateUrl: 'game/currentgame',
			controller : "GameController as ctrl"
			
		})
                
                 .when('/newGame', {
			templateUrl: 'game/newGame',
                	controller : "GameController as ctrl"
		})
                
      
	
		.otherwise({redirectTo:'/'});
        

}]);

App.config(['ngToastProvider', function(ngToastProvider) {
  ngToastProvider.configure({
    animation: 'fade' // or 'fade'
  });
}]);

