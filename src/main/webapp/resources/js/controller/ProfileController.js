App.controller('ProfileController', ['$window','$scope','ProfileService','$route','$routeParams','$location','DTOptionsBuilder', 'DTColumnDefBuilder',
    function($window,$scope,ProfileService, $route,$routeParams,$location,DTOptionsBuilder,DTColumnDefBuilder) {   
        
        var self = this;
    
    self.getProfile = function(){
        ProfileService.getProfile()
             
        .then(
        
         function(d) {
                 self.profile = d;
             },
            function(errResponse){
                 console.error('Error while getting profile.');
            }

        );
    };
    
     self.updateProfile= function(id){        
        ProfileService.updateProfile(id)
        .then(            
            self.getProfileList, 
                function(errResponse){
                     console.error('Error while updating profile');
                }
        );
    };
    
    self.changePassword= function(id){        
        ProfileService.changePassword(id)
        .then(            
            self.getProfileList, 
                function(errResponse){
                     console.error('Error while changing password');
                }
        );
    };
    
    self.openChangePassword = function () {
        $("#changePassword").css('display','block');
    };
    
    
    self.closeChangePassword = function (){
        $("#changePassword").css('display','none');
    };
    
    self.parseRoleName= function (role) {
      var rolename;
      if (role==="ROLE_ADMIN")
          rolename="Administrador";
      else
          rolename="Usuario";
      return rolename;
        
    },
    



    self.getProfile();
 

    self.showUpdateProfileForm = function (id) {
            self.updateProfile(id);
            $location.path("/editProfile/"+id);
    };
    
        
        
     self.dtOptions = DTOptionsBuilder.newOptions()
               .withOption('bFilter', false)
               .withOption('paging', false)
               .withOption('bInfo', false),
           
            
    self.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1)
    ];
     
        
        
}]);