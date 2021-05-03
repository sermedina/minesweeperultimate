

<div class="generic-container">
	<div class="graph">
		<!-- Default panel contents -->
	    <div class="panel-heading"><span class="lead">Games</span></div>
	    <div class="tables">
	    	<table datatable="ng" 
                        dt-options="ctrl.dtOptions" dt-column-defs="ctrl.dtColumnDefs"
                        class="w3-table w3-bordered table-responsive table-bordered w3-hoverable w3-small">
	            <thead>
	                <tr class="active">
	                    <th>ID</th>
                            <th>Moves left</th>
                            <th>Finished</th>
                            <th>Last time played</th>
                            <th>Total time played</th>

	                </tr>
	            </thead>
                    <tbody>
                        <tr ng-repeat="game in ctrl.gamesForList">            
                            <td><a href="" ng-click="ctrl.showDetail(game.id)">{{ game.id }}</a></td>

                            <td>{{ game.movesLeft }}</td>
                            <td>{{ true == game.finished ? 'Yes' : 'No' }}</td>
                            <td>{{ game.lastTimePlayed | date:'MM/dd/yyyy  h:mma'  }}</td>
                            <td>{{ game.totalTimePlayed | abs }} seconds</td>


                        </tr>

                    </tbody>
                </table>
                
		</div>
	</div>
</div>

