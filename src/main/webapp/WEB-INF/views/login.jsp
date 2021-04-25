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

    <title>Minesweeper Ultimate login</title>

    <link href="${contextPath}/resources/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/common.css" rel="stylesheet">
    <link rel="stylesheet" href="resources/css/style2.css">
    <link rel="stylesheet"  href="resources/css/app.css">
    <link rel="stylesheet" href="resources/css/w3.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

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
                                            <input name="username" type="text" class="w3-input w3-border w3-margin-bottom" placeholder="Usuario"/>
                                        </div>
                                        <div>
                                            <input name="password" type="password" class="w3-input w3-border w3-margin-bottom" placeholder="Contraseña"/>
                                        </div>
                                        <span>${error}</span>
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                        <div >
                                            <input type="submit" class="w3-btn w3-btn-block w3-green w3-section" value="Log in">
                                        </div>
                                    </div>

                                </form>
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
<!-- /container -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="${contextPath}/resources/js/bootstrap/bootstrap.min.js"></script>
</body>
</html>