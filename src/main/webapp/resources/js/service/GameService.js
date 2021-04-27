'use strict';
 
App.factory('GameService', ['$http', '$q','$location', function($http, $q, $location){
 
    return {                                

        getGame: function(id){
            return $http.get('game/gamedetails/'+id)
            .then(
                function(response){                    
                    return response.data;                    
                }, 
                function(errResponse){
                    console.error('Error while getting game ');
                    return $q.reject(errResponse);
                }
            );
        },
        
        getGameList: function(){
            return $http.get('game/games/')
            .then(
                function(response){
                    return response.data;                    
                }, 
                function(errResponse){
                    console.error('Error while getting game list ');
                    return $q.reject(errResponse);
                }
            );
        },
        
        newGame: function(game){
            return $http.post('game/newGame/', game)
            .then(
                function(response){
                    return response.data;
                }, 
                function(errResponse){
                    console.error('Error while creating new game');
                    return $q.reject(errResponse);
                }
            );
        },
        
        
    };
}]);
