<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home</title>
        
        <link rel="stylesheet" href="resources/css/bootstrap.min.css">
        <link rel="stylesheet" href="resources/css/w3.css">
        <link rel="stylesheet" href="resources/css/style2.css"> 
        
    </head>
    
    
    <body>
          
         <header class="w3-container  w3-margin-bottom">
            <img src="resources/img/minesweeper_main_logo.png">                        
        </header>
        <div id="loginModal" class="w3-modal ">
        <div id="loginContainer" class="w3-modal-content w3-card-24 w3-animate-zoom w3-theme-gradient" >
            <div class="w3-row">            
                <div class="w3-container w3-center w3-half">
                    <div class="w3-container w3-center">
                    </div>                                                                                
                </div>
                        <div class="w3-container w3-half" >
                            <div class="w3-section">             
                 
                     <c:if test="${pageContext.request.userPrincipal.name != null}">
        <form id="logoutForm" method="POST" action="logout">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        </form>

                        <h2>Access denied </h2>

    </c:if>
                            </div>
                        </div>
                    </div>
                   
                        <div class="w3-container w3-padding-4 w3-border-top">                    
                        </div>        
                    </div>
                </div>
    </body>
</html>