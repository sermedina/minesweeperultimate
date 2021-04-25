App.controller('HomeController', ['$rootScope','$scope', '$timeout','$location','ResourceService',
  function HomeController($rootScope,$scope, $timeout, $location,ResourceService) {

    var self = this; 
  
    var suc= $('#suc').html();
    $scope.linkClicked = function(link){

    $location.path(link);
    
    };
    
    
    $scope.showSuccess = true;
    
    $scope.l = suc;
    
    $timeout(function(){
      $scope.doFade = true;
    }, 2500);
    
    
     self.getResourceList = function(){        
        ResourceService.getResourceList()
        .then(
            function(d) {
                 $rootScope.resources = d.data;                                                  
                 self.wait = false;
            },
            function(errResponse){
                console.error('Error while fetching Resource List',errResponse);
                self.showMessageError('Error while fetching Resource List', errResponse);                
            }            
        );
    };
    
    self.getResourceList();
    
}]);

