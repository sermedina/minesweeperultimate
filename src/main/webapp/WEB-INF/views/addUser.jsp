<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sign Up</title>

    <link href="${contextPath}/resources/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/common.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/appForm.css" rel="stylesheet">
   
    
    

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    
<div class="generic-container">
    

   <form ng-submit="ctrl.addUser()" name="userForm"  class="forms-main" id="add-user-form"
          novalidate ng-class="{'form-error':submitted}">
        <fieldset>
        <h2 class="form-signin-heading">Sign Up</h2>
        
            <div class="control-group" id="usernameControlGroup">
                <input type="text" name="username" required ng-model="ctrl.formData.username" class="form-control" placeholder="Usuario"
                            autofocus="true">
            </div>
            <span ng-show="userForm.username.$dirty" class="error-messages">{{serverErrors['username']}}</span>
        
       
            <div class="control-group" id="passwordControlGroup">
                <input type="password" name="password" required ng-model="ctrl.formData.password" class="form-control" placeholder="Contraseña"
                            autofocus="true">
            </div>
             <span  ng-show="userForm.password.$dirty" class="error-messages">{{serverErrors['password']}}</span>
        
             
            <div class="control-group" id="passwordConfirmControlGroup">
                <input type="password" name="passwordConfirm" required ng-model="ctrl.formData.passwordConfirm" class="form-control" placeholder="Confirmar Contraseña"
                            autofocus="true">
            </div>
             
              <span ng-show="userForm.passwordConfirm.$dirty" class="error-messages">{{serverErrors['passwordConfirm']}}</span>
              
     
        <button class="btn btn-success" ng-disabled="userForm.$invalid" type="submit" id="sendBtn">Enviar</button>
        </fieldset>
    </form>
    
    <div id="addSuccessful" class="w3-modal " >
            <div class="w3-modal-content w3-small">
                <header class="w3-container w3-theme-gradient1"> 
                    <h2 class="w3-text-white">Success notification</h2>
                </header>
                <div class="w3-container w3-row-padding">
                    <div>
                        <h5>Register successful!</h5>
                    </div>
                    <div class="w3-right w3-margin-2">                    
                        <button class="w3-btn w3-ripple w3-green" ng-click="self.closeModal()">Ok</button>                      
                    </div>
                </div>                
            </div>
        </div>
    


</div>
    
    
    
    
    
<!-- /container -->

</body>
</html>
