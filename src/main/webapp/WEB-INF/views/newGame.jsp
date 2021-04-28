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

    <title>New Game</title>

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
    

   <form ng-submit="ctrl.newGame()" name="gameForm"  class="forms-main" id="new-game-form"
          novalidate ng-class="{'form-error':submitted}">
        <fieldset>
        <h2 class="form-signin-heading">New Game</h2>
        <label>Number of rows</label> 
            <div class="control-group" >
                <select class="form-control" required ng-model="ctrl.formData.numberOfRows" ng-options="item for item in numberOfRowsList">
                    <option value="">-- Select --</option>
                </select>
            </div>
        
        <label>Number of columns</label> 
            <div class="control-group" >
                <select class="form-control" required ng-model="ctrl.formData.numberOfColumns" ng-options="item for item in numberOfColumnsList">
                    <option value="">-- Select --</option>
                </select>
            </div>
        
        <label>Number of mines</label> 
            <div class="control-group" id="planControlGroup">
                <select class="form-control" required ng-model="ctrl.formData.numberOfMines" ng-options="item for item in numberOfMinesList">
                    <option value="">-- Select --</option>
                </select>
            </div>
         <span ng-show="mineNumberValidation" class="error-messages">The number of mines is too big for this board!</span>
     
        <button class="btn btn-success" ng-disabled="gameForm.$invalid" type="submit" id="sendBtn">Start game</button>
        </fieldset>
    </form>
    
    

</div>
    
    <div ng-repeat="row in newBoard track by $index">
        <ul style="list-style-type: none;">
            <li style="">
                <div ng-repeat="cell in row track by $index">
                    <button style="float:left">{{ cell.mineNearby }}</button>
                </div>
                <br>
            </li>
        </ul>
    </div>
    

</body>
</html>
