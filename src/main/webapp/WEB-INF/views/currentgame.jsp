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

    <title>Current Game</title>

    <link href="${contextPath}/resources/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/common.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/appForm.css" rel="stylesheet">
   
    
    

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
        <toast></toast>
<body>
    <div class="generic-container">

        <span class="label label-success lb-md"><i class="fas fa-arrow-right"></i> Moves left</span>
        <span></span>
        <p class="lb-bold">{{ ctrl.game.movesLeft }}</p>
        <span></span>
        <span class="label label-warning lb-md"><i class="fas fa-bomb"></i> Number of mines</span>       
        <p class="lb-bold">{{ ctrl.game.numberOfMines }}</p>
        
        <span ng-show="!ctrl.game.finished" class="label label-info lb-md"><i class="fas fa-clock"></i> Elapsed Time:</span>
        <strong ng-show="!ctrl.game.finished">{{ctrl.getElapsedMs()}} seconds</strong>
        <span ng-show="ctrl.game.finished" class="label label-info lb-md"><i class="fas fa-tag"></i> Play Time:</span> 
        <strong ng-show="ctrl.game.finished">{{ctrl.game.totalTimePlayed | abs}} seconds</strong>
        <br>
        <br>
  

        <div ng-repeat="row in ctrl.parseBoard track by $index">
            <ul style="list-style-type: none;">
                <li style="">
                    <div ng-repeat="cell in row track by $index">
                        <button ng-class="{largeHeight: !cell.isDiscovered || cell.mineNearby===0 || cell.mineNearby===-1, 
                                'fa fa-flag no-color': cell.isFlag, 'fa fa-bomb w3-red': cell.mineNearby===-1 && cell.isDiscovered,
                                'w3-green': cell.mineNearby===0 && cell.isDiscovered,
                                'text-primary': cell.mineNearby===1 && cell.isDiscovered,
                                'text-info': cell.mineNearby===2 && cell.isDiscovered,
                                'text-success.pull-right': cell.mineNearby===3 && cell.isDiscovered,
                                'text-warning': cell.mineNearby===4 && cell.isDiscovered,
                                'text-danger': cell.mineNearby===5 && cell.isDiscovered}" 
                                style="float:left" ng-click="ctrl.discoverCell($parent.$index,$index)">
                            <div ng-show="cell.isDiscovered && cell.mineNearby!==-1 && cell.mineNearby!==0">{{ cell.mineNearby }}</div></button>
                    </div>
                    <br>
                </li>
            </ul>
        </div>
          <button class="btn" 
            ng-class="{'fa fa-flag w3-red': !ctrl.flagMode, 'fa fa-eye w3-green': ctrl.flagMode}" 
            ng-if="!ctrl.game.finished" ng-click="ctrl.changeMode()">{{ctrl.gameMode}}</button>
        
            
    <button class="btn w3-green" 
            ng-if="ctrl.game.finished" ng-click="ctrl.newGame()">Try again</button>
    </div>                                   
</body>

</html>
