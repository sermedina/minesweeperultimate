<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Minesweeper Ultimate login</title>

    <link href="${contextPath}/resources/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/common.css" rel="stylesheet">
    <link rel="stylesheet" href="resources/css/style2.css">
    <link rel="stylesheet"  href="resources/css/app.css">
    <link rel="stylesheet" href="resources/css/w3.css">
    
<!-- jQuery -->
<link href='//fonts.googleapis.com/css?family=Roboto:700,500,300,100italic,100,400' rel='stylesheet' type='text/css'>
<!-- lined-icons -->
<link rel="stylesheet" href="resources/css/icon-font.min.css" type='text/css' />
<!-- //lined-icons -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="resources/js/jquery/jquery.dataTables.min.js"></script>


<script src="${contextPath}/resources/js/bootstrap/bootstrap.min.js"></script>

    <!--Angular-->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-route.js"></script>
    <script src="resources/js/angular/angular-cookies.min.js"></script>
    <script src="resources/js/angular/angular-datatables.min.js"></script>
    <script src="resources/js/angular/angular-datatables.buttons.min.js"></script>
    <script src="resources/js/angular/angular-datatables.scroller.min.js"></script>
    <script type="text/javascript" src=" https://cdnjs.cloudflare.com/ajax/libs/checklist-model/1.0.0/checklist-model.min.js"></script>
     <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.5.7/angular-sanitize.min.js"></script>
     <script type="text/javascript" src="http://www.cdn.der.rj.gov.br/AngularJS/1.5.7/angular-animate.min.js"></script>
     <!--<script type="text/javascript" src=" https://cdn.jsdelivr.net/npm/angularjs-toast@latest/angularjs-toast.min.js"></script>-->
     <script src="resources/js/angular/ngToast.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/angularjs-toast@latest/angularjs-toast.min.css" rel="stylesheet">
    
    <script src="resources/js/angular/app.js"></script>
    <script src="resources/js/service/UserService.js"></script>
    <script src="resources/js/controller/UserController.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body ng-controller="UserController">

    <header class="w3-container  w3-margin-bottom">
           <!-- <img src="resources/img/minesweeper_main_logo.png">          -->              
    </header>
    <div id="loginModal" class="w3-modal ">
        <div id="loginContainer" class="w3-modal-content w3-card-24 w3-animate-zoom w3-theme-gradient" >
            <div class="w3-row"> 
                <div class="w3-container w3-left w3-half">
                    <div class="w3-container w3-center">
                        <img src="resources/img/minesweeper_main_logo.png" class="w3-margin-top w3-margin-bottom">
                    </div>                                                                                
                </div>
                <div class="w3-container w3-half" >
                    <div class="w3-section">                 
                        <div class="login-card">
                            <div class="w3-section">

                                <form method="POST" action="${contextPath}/login" class="form-horizontal">
                                    <div class="w3-section ${error != null ? 'has-error' : ''}">
                                        <!--#set($value = "#if($error!=null)'has-error'{else}''#end")-->
                                        <span>${message}</span>
                                        <div>
                                            <input name="username" type="text" class="w3-input w3-border w3-margin-bottom" placeholder="Username"/>
                                        </div>
                                        <div>
                                            <input name="password" type="password" class="w3-input w3-border w3-margin-bottom" placeholder="Password"/>
                                        </div>
                                        <span>${error}</span>
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                        <div >
                                            <input type="submit" class="w3-btn w3-btn-block w3-green w3-section" value="Log in">
                                        </div>
                                    </div>

                                </form>

                                         <button class="btn btn-success"  ng-click="openRegisterModal()" >Create account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w3-container w3-padding-4 w3-border-top">                    
                <div class="w3-right">
                    Powered By
                    <img class="w3-margin-0" src="resources/img/powerlogo.png"/>
                </div>
            </div>        
        </div>
    </div>
                                        
    <div id="registerModal" class="w3-modal " >
            <div class="w3-modal-content w3-small">
                <header class="w3-container w3-theme-gradient1"> 
                    <h2 class="w3-text-white">Sign Up</h2>
                </header>
                 <form ng-submit="signUp()" name="userForm"  class="forms-main" id="add-user-form"
          novalidate ng-class="{'form-error':submitted}">
        <fieldset>
        <h2 class="form-signin-heading">Sign Up</h2>
        
            <div class="control-group" id="usernameControlGroup">
                <input type="text" name="username" required ng-model="formData.username" class="form-control" placeholder="Username"
                            autofocus="true">
            </div>
            <span ng-show="userForm.username.$dirty" class="error-messages">{{alreadyExists}}</span>
        
       
            <div class="control-group" id="passwordControlGroup">
                <input type="password" name="password" required ng-model="formData.password" class="form-control" placeholder="Password"
                            autofocus="true">
            </div>
             <span  ng-show="userForm.password.$dirty" class="error-messages">{{serverErrors['password']}}</span>
             <br>
             <br>
        
     
        <button class="btn btn-success" ng-disabled="userForm.$invalid" type="submit" id="sendBtn">Submit</button>
        <button class="btn btn-success" type="button" ng-click="closeModal()">Cancel</button> 
        </fieldset>
    </form>
            </div>
        </div>
                                        
        <div id="addSuccessful" class="w3-modal " >
            <div class="w3-modal-content w3-small">
                <header class="w3-container w3-theme-gradient1"> 
                    <h2 class="w3-text-white">Success notification</h2>
                </header>
                <div class="w3-container w3-row-padding">
                    <div>
                        <h5>{{message}}</h5>
                    </div>
                    <div class="w3-right w3-margin-2">                    
                        <button class="w3-btn w3-ripple w3-green" ng-click="closeModal()">Ok</button>                      
                    </div>
                </div>                
            </div>
        </div>
            
<!-- /container -->
</body>
</html>