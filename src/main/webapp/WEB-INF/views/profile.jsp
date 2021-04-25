<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div class="generic-container">
    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading"><span class="lead">Profile</span></div>
        <div class="tablecontainer">
            <table datatable="ng" 
                   dt-options="ctrl.dtOptions" dt-column-defs="ctrl.dtColumnDefs"
                   class="w3-table w3-bordered table-responsive table-bordered w3-hoverable w3-small">       
                <tr><th>Username</th><td>{{ctrl.profile.username}}</td></tr>

                <a class="btn btn-success"  ng-click="ctrl.openChangePassword()" id="sendBtn">Change password</a> 
        </div>
    </div>

    <div id="changePassword" class="w3-modal " >
        <div class="w3-modal-content w3-small" id="confirmLockContent">
            <header class="w3-container w3-theme-gradient1"> 
                <span ng-click="ctrl.closeChangePassword()" class="w3-closebtn w3-text-black">&times;</span>
            </header>

            <div ng-include="'changePassword'"></div>                                                   
        </div>            
    </div>    