<!-- Stats -->
      <div class="container">
        <div class="row">
					<div class="panel-body">
						<p class="small text-muted pull-right">Updated: <span id="stats_lastUpdated">N/A</span></p>
					</div>
				</div>

        <div class="row">

          <div class="col-xs-6 col-md-4">  <!-- column -->      
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><strong>Contracts Pending</strong></h3>
              </div>
              <div class="panel-body">
                <p align="center" width="100%" style="font-size:350%;" id="stats_pendingCount">N/A</p>
            	</div>
						</div>
          </div> <!-- column -->

          <div class="col-xs-6 col-md-4"> <!-- column -->      
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><strong>Contracts In Progress</strong></h3>
              </div>
              <div class="panel-body">
                <p align="center" width="100%" style="font-size:350%;" id="stats_progressCount">N/A</p>
            	</div>
						</div>
          </div> <!-- column -->

          <div class="col-xs-6 col-md-4"> <!-- column -->      
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><strong>Average Completion Time (7d)</strong></h3>
              </div>
              <div class="panel-body">
                <p align="center" width="100%" style="font-size:350%;" id="stats_completedWindowAverage">N/A</p>
            	</div>
						</div>
          </div> <!-- column -->

        </div>

        <div class="row" id="cc">
					<h3 align="center"><span style="color: #F3D24F;">Created</span> vs <span style="color: #91F34F;">Completed</span></h3>
					<canvas id="stats-history-chart"></canvas>
        </div>

      </div>

<!-- Stats -->

