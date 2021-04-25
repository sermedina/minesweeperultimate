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

    <title>Change password</title>

    <link href="${contextPath}/resources/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/common.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/appForm.css" rel="stylesheet">

    <script src="resources/js/validator/PasswordValidator.js"></script>
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <div class="generic-container">

        <spring:url value="/changePassword.htm" var="formUrl" />
        <spring:url value="/changePassword.json" var="formJsonUrl" />

        <form:form action="${formUrl}" modelAttribute="profileForm" class="forms-main" id="change-password-form">
            <fieldset>
                <h2 class="form-signin-heading">Change password</h2>

                <div class="control-group" id="user.currentPasswordControlGroup">
                    <label >Current password</label>
                    <form:input type="password" path="user.currentPassword" class="form-control" placeholder="Current password"
                                autofocus="true"></form:input>
                    <span class="help-inline"><form:errors path="user.currentPassword"/></span>
                </div>



                <div class="control-group" id="user.passwordControlGroup">
                    <label >New password</label>
                    <form:input type="password" path="user.password" class="form-control" placeholder="New password" 
                                autofocus="true"></form:input>
                    <span class="help-inline"><form:errors path="user.password"/></span>
                </div>



                <div class="control-group" id="user.passwordConfirmControlGroup">
                    <label >Confirm password</label>
                    <form:input type="password" path="user.passwordConfirm" class="form-control" placeholder="Confirm password"  
                                autofocus="true"></form:input>
                    <span class="help-inline"><form:errors path="user.passwordConfirm"/></span>
                </div>

                <div class="control-group">
                    <form:hidden  path="user.id" class="form-control" value="{{ctrl.profile.id}}"></form:hidden>
                    </div>

                    <div class="w3-right w3-margin-2">                    
                        <button class="w3-btn w3-ripple w3-green" type="submit">Submit</button>
                        <button class="w3-btn w3-ripple w3-red"  type="button" ng-click="ctrl.closeChangePassword()">Cancel</button>                       
                    </div>
                </fieldset>
        </form:form>

    </div>
                                 


<!-- /container -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="${contextPath}/resources/js/bootstrap/bootstrap.min.js"></script>
</body>
</html>
