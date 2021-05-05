



<div class="generic-container">
    <div class="graph">
	    <div class="dataTables_wrapper">
                <div class="panel-heading"><span class="lead">Games</span></div>
	    	<table datatable="ng" id="gametable" 
                        dt-options="ctrl.dtOptions" dt-column-defs="ctrl.dtColumnDefs"
                        class="display nowrap dataTable dtr-inline collapsed" style="width: 100%;" role="grid">
	            <thead>
	                <tr>
	                    <th>ID</th>
                            <!--<th>Moves left</th>-->
                            <th>Finished</th>
                            <th>Last time played</th>
                            <th>Total time played</th>

	                </tr>
	            </thead>
                    <tbody>
                        <tr ng-repeat="game in ctrl.gamesForList">            
                            <td ng-click="ctrl.showDetail(game.id)"><a href="" >{{ game.id }}</a></td>
                            <!--<td>{{ game.movesLeft }}</td>-->
                            <td ng-click="ctrl.showDetail(game.id)">{{ true == game.finished ? 'Yes' : 'No' }}</td>
                            <td ng-click="ctrl.showDetail(game.id)">{{ game.lastTimePlayed | date:'MM/dd/yyyy  h:mma'  }}</td>
                            <td ng-click="ctrl.showDetail(game.id)">{{ game.totalTimePlayed | abs }} seconds</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</div>
    <script>
        $(document).ready(function() {
                    $('#gametable').DataTable();
        });
    </script>


