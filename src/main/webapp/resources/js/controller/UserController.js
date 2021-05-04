App.controller('UserController', ['$rootScope','$scope', 'UserService', '$location','DTOptionsBuilder', 'DTColumnDefBuilder',
    function($rootScope,$scope, UserService, $location,DTOptionsBuilder,DTColumnDefBuilder) {            
    
    
    
    $scope.submitted = false;            
    
    clearValidationErrorMessages = function() {
    	$scope.formData.$setPristine(true);
    	$scope.serverErrors="";
    },
            
    $scope.formData = {};        
            
    
    $scope.signUp = function(){
            $scope.alreadyExists="";
            $scope.submitted = true;
            console.log($scope.formData);
            UserService.signUp($scope.formData)
              .then (function(response) {
                  console.log(response.status);
          
          if (response.status===500) {
                  $scope.userForm.username.$dirty = true;
                         $scope.alreadyExists = "User already exists";
          } else {
                  $scope.message = response.status;           
                  $scope.submitted = false;
                  $scope.formData=response.data;
                  $scope.addSuccessful();
              }
              },
              
              function (errors) {
                 console.log(errors);

            });
        
        
    },
            
    
    $scope.openRegisterModal = function () {
        $("#registerModal").css('display','block');  
    };
            
    $scope.addSuccessful = function () {
        $("#addSuccessful").css('display','block');  
    };        
    
    $scope.closeModal = function (){             
         $("#addSuccessful").css('display','none');
         $("#registerModal").css('display','none'); 
    };

        
  
}]);
