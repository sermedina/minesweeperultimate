App.controller('UserController', ['$rootScope','$scope', 'UserService', '$location','DTOptionsBuilder', 'DTColumnDefBuilder',
    function($rootScope,$scope, UserService, $location,DTOptionsBuilder,DTColumnDefBuilder) {            
    
    
    
    $scope.submitted = false;            
    
    clearValidationErrorMessages = function() {
    	$scope.formData.$setPristine(true);
    	$scope.serverErrors="";
    },
            
    $scope.formData = {};        
            
    
    $scope.signUp = function(){
            $scope.submitted = true;
            console.log($scope.formData);
            UserService.signUp($scope.formData)
              .then (function(response) {
                  console.log(response.status);
                  $scope.message = response.status;           
                  $scope.submitted = false;
                  $scope.formData=response.data;
                  $scope.addSuccessful();
              },
              
              function (errors) {
                 
                    $scope.serverErrors=errors.data;
                    console.log(errors.data);
                    for (var errorKey in errors.data) {
                    //console.log(errorKey + ':' + errors.data[errorKey]);
                    $scope.userForm[errorKey].$dirty = true;
                    }                 
                  
               
            });
        
        
    },
            
    
    $scope.openRegisterModal = function () {
        $("#registerModal").css('display','block');  
    };
            
    $scope.addSuccessful = function () {
        $("#addSuccessful").css('display','block');  
    };        
    
    $scope.closeModal = function (){             
        document.getElementById('addSuccessful').style.display='none';
    };

        
  
}]);
