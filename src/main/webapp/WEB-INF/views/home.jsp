     
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE HTML>
<html ng-app="myApp">
<head>
<title>Home</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
 <!-- Bootstrap Core CSS -->

<!-- Custom CSS -->
<link href="resources/css/style.css" rel='stylesheet' type='text/css' />
<!--datatables-->
<link rel="stylesheet" href="resources/css/datatables.bootstrap.min.css"  type='text/html'  />
<link rel="stylesheet" href="resources/css/jquery.dataTables.min.css" />
<!-- Graph CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<!-- jQuery -->
<link href='//fonts.googleapis.com/css?family=Roboto:700,500,300,100italic,100,400' rel='stylesheet' type='text/css'>
<!-- lined-icons -->
<link rel="stylesheet" href="resources/css/icon-font.min.css" type='text/css' />
<!-- //lined-icons -->
<script src="resources/js/jquery/jquery-2.0.3.min.js"></script>
<script src="resources/js/jquery/jquery.dataTables.min.js"></script>

<!--Angular-->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-route.js"></script>
<script src="resources/js/angular/angular-cookies.min.js"></script>
<script src="resources/js/angular/angular-datatables.min.js"></script>
<script src="resources/js/angular/angular-datatables.buttons.min.js"></script>
<script src="resources/js/angular/angular-datatables.scroller.min.js"></script>
 <script type="text/javascript" src=" https://cdnjs.cloudflare.com/ajax/libs/checklist-model/1.0.0/checklist-model.min.js"></script>


<script src="resources/js/angular/app.js"></script>
<script src="resources/js/service/UserService.js"></script>
<script src="resources/js/service/ProfileService.js"></script>
<script src="resources/js/service/ClientService.js"></script>
<script src="resources/js/service/ResourceService.js"></script>

<script src="resources/js/controller/UserController.js"></script>
<script src="resources/js/controller/UserDetailsController.js"></script>
<script src="resources/js/controller/HomeController.js"></script>
<script src="resources/js/controller/ClientController.js"></script>
<script src="resources/js/controller/ClientDetailsController.js"></script>



<link rel="stylesheet" href="resources/css/bootstrap/bootstrap.css" />
<link rel="stylesheet" href="resources/css/w3.css" />
<link rel="stylesheet" href="resources/css/app.css" />



<!--//skycons-icons-->
</head> 
<body ng-controller="HomeController">
    <div class="page-container">
        <!--/content-inner-->
        <div class="left-content">
            <div class="inner-content">
                <!-- header-starts -->
                <div class="header-section">
                    <!--menu-right-->
                    <div class="top_menu">                       
                        <!--/profile_details-->

                        <div class="clearfix"></div>	
                        <!--//profile_details-->
                    </div>
                    <!--//menu-right-->
                    <div class="clearfix"></div>
                </div>
                <!-- //header-ends -->


                <div ng-view></div>

                <!--footer section start-->
                <footer>
                    <p>Minesweeper Ultimate</p>
                </footer>
                <!--footer section end-->
            </div>
        </div>
        <!--//content-inner-->
        <!--/sidebar-menu-->
        <div class="sidebar-menu">
            <header class="logo">
                <a  id="sidebarBtn" ng-href="{{link}}" ng-click="$event.preventDefault(); linkClicked(link)" class="sidebar-icon"> <span class="fa fa-bars"></span> </a> <a href="#"> <span id="logo"> <h1>Home</h1></span> 
                    <!--<img id="logo" src="" alt="Logo"/>--> 
                </a> 
            </header>
            <div style="border-top:1px solid rgba(69, 74, 84, 0.7)"></div>
            <!--/down-->
            <div class="down">	
                <a><img src="resources/img/minesweeper_logo.png"></a>
                <p><span class=" name-caret">${user}</span></p>

                <form id="logoutForm" method="POST" action="logout">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                </form>

                <ul>
                    <li><a class="tooltips" href="#/client/profile"><span>Profile</span><i class="lnr lnr-user"></i></a></li>
                    <li><a class="tooltips" href="#" onclick="document.forms['logoutForm'].submit()"><span>Log out</span><i class="lnr lnr-power-switch"></i></a></li>

                </ul>
            </div>
            <!--//down-->
            <div class="menu">
                <ul id="menu" >
                    <li id="menu-academico" ><a href="#"><i class="fa fa-bomb"></i> <span>New game</span> <span  style="float: right"></span></a>
                        <ul id="menu-academico-sub" >
                        </ul>
                    </li>
                    <li id="menu-academico" ><a href="#/games"><i class="fa fa-hourglass"></i> <span>Game history</span> <span  style="float: right"></span></a>

            </div>
        </div>	
    </div>
                        <script>
                        var toggle = true;
										
                        $(".sidebar-icon").click(function() {                
                          if (toggle)
                          {
                                $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
                                $("#menu span").css({"position":"absolute"});
                          }
                          else
                          {
                                $(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
                                setTimeout(function() {
                                  $("#menu span").css({"position":"relative"});
                                }, 400);
                                        }

                                        toggle = !toggle;
                                    });
                        </script>
                        <!--js -->


<!-- Bootstrap Core JavaScript -->
   <script src="resources/js/bootstrap/bootstrap.min.js"></script>
</body>
</html>