'use strict';
 
App.factory('ResourceService', ['$http', '$q','$location', function($http, $q, $location){
 
    return {                                       
        
        getResourceList: function(){
            return  $http({
                url: "resourceList",
                method: 'GET'                
            });            
        }        
         
    };
 
}]);
