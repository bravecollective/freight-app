<!-- Footer -->
		<p></p>
    <div id="footer">
      <div class="container">        
        <p class="small text-muted pull-right text-right">        
          Brought to you by <a href="#" class="eve-link" onmouseover="popChar($(this), 92938653, 'kiu Nakamura');">kiu Nakamura</a>
        </p>
      </div>
    </div>
<!-- Footer -->

<!-- Popups -->
     <div class="hide" id="popchar" style="background:white;">
        <table style='border: 1px solid;'>
          <thead>
            <tr style='border-bottom: 1px solid;'>
              <th colspan='3' style='padding-left:2px;' id="popchar-name">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width='64' height='64' background='img/loaderb32.gif' style='padding:2px; background-repeat:no-repeat; background-position:center;' id="popchar-image">&nbsp;</td>
              <td style='padding-left:5px; padding-right:5px; padding-top:3px; vertical-align:top;' id="popchar-content-1">&nbsp;</td>
              <td style='padding-left:5px; padding-right:5px; padding-top:3px; vertical-align:top;' id="popchar-content-2">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hide" id="popsys" style="background:white;">
        <table style='border: 1px solid;'>
          <thead>
            <tr style='border-bottom: 1px solid;'>
              <th colspan='2' style='padding-left:2px;' id="popsys-name">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>      
              <td style='padding-left:5px; padding-right:5px; padding-top:3px; vertical-align:top;' id="popsys-content-1">&nbsp;</td>
              <td style='padding-left:5px; padding-right:5px; padding-top:3px; vertical-align:top;' id="popsys-content-2">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

     <div class="hide" id="popcorp" style="background:white;">
        <table style='border: 1px solid;'>
          <thead>
            <tr style='border-bottom: 1px solid;'>
              <th colspan='3' style='padding-left:2px;' id="popcorp-name">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width='64' height='64' style='padding:2px; background-repeat:no-repeat; background-position:center;' id="popcorp-image">&nbsp;</td>
              <td style='padding-left:5px; padding-right:5px; padding-top:3px; vertical-align:top;' id="popcorp-content-1">&nbsp;</td>
              <td style='padding-left:5px; padding-right:5px; padding-top:3px; vertical-align:top;' id="popcorp-content-2">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
<!-- Popups -->

<!-- Clipboard -->
      <div class="modal" id="clipboard" tabindex="-1" role="dialog" aria-labelledby="clipboardLabel" aria-hidden="true" onkeydown="if (event.keyCode == 13) $('#clipboard').modal('hide');">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="clipboardLabel">Copy to clipboard: CTRL-C, Enter</h4>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control text-right" id="clipboard-content">      
            </div>
          </div>
        </div>
      </div>
<!-- Clipboard -->

	<script src="js/jquery-1.10.2.min.js"></script> 
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.cookie.js"></script>
	<script src="js/freight.js"></script>
<?php
	foreach ($scripts as $file) {
		echo "	<script src='" . $file . "'></script>\n";
	}
?>

  </body>

</html>
