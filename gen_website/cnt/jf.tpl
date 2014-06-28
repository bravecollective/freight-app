<!-- Flexible Rates -->
      <div class="container">
        <table class="table table-striped">                      
          <thead>                          
            <tr>                              
              <th>Type</th>                              
              <th class="text-right">Max Cargo</th>                              
              <th class="text-right">Max Collateral</th>
              <th class="text-right">Expire</th>   
              <th class="text-right">Complete</th>   
            </tr>                      
          </thead>                      

          <tbody>                          

             <tr>
              <td>Jump Freighter</td>
              <td class="text-right">320<span id="fsep"></span>000 m&sup3;</td>
              <td class="text-right">3<span id="fsep"></span>000M ISK</td>
              <td class="text-right">7 days</td>
              <td class="text-right">3 days</td>
            </tr>

          </tbody>                  
        </table>  
      </div>      
<!-- Flexible Rates -->

<br>

<!-- Calculate -->
			
      <div class="container">
        <div class="row">

          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><strong>Contract</strong></h3>
              </div>
              <div class="panel-body">
                <p>
                  <label>From&nbsp;&nbsp;<a href="#" class="small" onmouseover="popStations($(this), hubs, 'calc-input-from-value');">[Preferred Hubs]</a> <span class="text-danger small" id="calc-input-from-error"></span></label>
                  <div class="input-group form-control" id="calc-input-from-form" style="padding: 0; border: none;">   
                    <input type="text" class="form-control text-right typeahead" placeholder="Enter name or select from list" id="calc-input-from-value">          
                  </div>
                </p>
                <p>
                  <label>To&nbsp;&nbsp;<a href="#" class="small" onmouseover="popStations($(this), hubs, 'calc-input-to-value');">[Preferred Hubs]</a>&nbsp;&nbsp;<a href="#" class="small" onmouseover="popStations($(this), exports, 'calc-input-to-value');">[Export]</a> <span class="text-danger small" id="calc-input-to-error"></span></label>
                  <div class="input-group form-control" id="calc-input-to-form" style="padding: 0; border: none;">   
                    <input type="text" class="form-control text-right typeahead" placeholder="Enter name or select from list" id="calc-input-to-value">          
                  </div>
                </p>

                <p>
                  <label>Cargo size <span class="text-muted">(m&sup3;)</span> <span class="text-danger small" id="calc-input-cargo-error"></span></label>
                  <div class="input-group" id="calc-input-cargo-form">   
                    <input type="text" class="form-control text-right" placeholder="Cargo size" id="calc-input-cargo-value">          
                    <span class="input-group-addon"><span id="fdec"></span>00</span>
                  </div>
                </p>
                <p>
                  <label>Collateral <span class="text-muted">(ISK)</span> <span class="text-danger small" id="calc-input-collateral-error"></span></label>
                  <div class="input-group" id="calc-input-collateral-form">
                    <input type="text" class="form-control text-right" placeholder="Collateral" id="calc-input-collateral-value">
                    <span class="input-group-addon"><span id="fdec"></span>00</span>
                  </div>
                </p>
              </div>
            </div>
          </div>
   
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
									<strong>Invoice</strong>

                  <label data-html="true" data-original-title="<b>Fees</b>" class="popover-reward text-info" data-toggle="popover" data-content="
                    <span>
											<p>The <b>Setup fee</b> is a constant value applied to all contracts.</p>
											<p>The <b>Freight fee</b> depends on the number of midpoints (jumps) required to fulfil the contract and gets modified based on cargo size and collateral value.</p>
											<p>The <b>Freight export discount</b> is applicable to contracts <i>exporting</i> to high-sec.</p>
											<p>The <b>Non-hub penalty</b> is due for any station not being listed as a <i>preferred hub</i>.</p>
                    </span>">[?]</label>
								</h3>
              </div>
              <div class="panel-body">

                <p id="calc-output-setup-row">Setup fee <span class="pull-right" id="calc-output-setup-value"></span></p>
                <p id="calc-output-freight-row">Freight fee <span class="pull-right"><span class="text-muted" id="calc-output-freight-info"></span>&nbsp;&nbsp;<span id="calc-output-freight-value"></span></p>
                <p id="calc-output-export-row">Freight export discount <span class="pull-right" id="calc-output-export-value"></span></p>
                <p id="calc-output-nonhub-row">Non-hub penalty <span class="pull-right" id="calc-output-nonhub-value"></span></p>
                <hr>
                <p id="calc-output-reward-row">
									<b>Reward</b>
									<a href="#" class="pull-right" onclick="$('#clipboard').modal('show');$('#clipboard-content').val(calcNow()).select();">
                    <strong id="calc-output-reward-value"></strong>
                  </a>
								</p>
              </div>
            </div>
					<p class="pull-right" align="right"><small><u>Possible route</u><br><span id="calc-output-route-value"></span></small></p>
          </div>

        </div>
      </div>
<!-- Calculate -->

<!-- Pop -->
     <div class="hide" id="popstations" style="background:white;">
        <table style='border: 1px solid;'>
          <thead>
            <tr style='border-bottom: 1px solid;'>
              <th style='padding-left:2px;'>Stations</th>
            </tr>
          </thead>
          <tbody id="popstations-content">           
          </tbody>
        </table>
      </div>
<!-- Pop -->

