'use strict';
 
App.factory('UserService', ['$http', '$q','$location', function($http, $q, $location){
 
    return {                                    
        
        signUp: function(user){
            console.log(user);
            return $http.post('signUp/', user)
            .then(
                function(response){
                    console.log(response);
                    return response.data;
                }, 
                function(errResponse){
                    console.error('Error while registering');
                    return errResponse;
                }
            );
        }
        
       
        
    };
}]);
