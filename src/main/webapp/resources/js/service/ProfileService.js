'use strict';
 
App.factory('ProfileService', ['$http', '$q','$location', function($http, $q, $location){
 
    return {                                

        
         getProfile: function(){
            return $http.get('item/profile')
            .then(
                function(response){                    
                    return response.data;                    
                }, 
                function(errResponse){
                    console.error('Error while getting profile ');
                    return $q.reject(errResponse);
                }
            );
        },
        
        updateProfile: function(id){
            return $http.get('editProfile/'+ id)
            .then(
                function(response){
                    return response.data;
                }, 
                function(errResponse){
                    console.error('Error while updating profile');
                    return $q.reject(errResponse);
                }
            );
        },
        
        changePassword: function(id){
            return $http.get('changePassword/'+ id)
            .then(
                function(response){
                    return response.data;
                }, 
                function(errResponse){
                    console.error('Error while changing password');
                    return $q.reject(errResponse);
                }
            );
        }
        
  
        

    };
}]);
