/**
 * 
 */
'strict';

var greyshine = greyshine || {};
greyshine.jslib = { 'version':'1.0-SNAPSHOT' };


$(document).ready( function() {
	greyshine.jslib.loadHtmls();
} );


greyshine.jslib.toggleGroup = function( inSelector ) {
	
	if ( arguments.length > 1 ) { 
		for( var i=0, l=arguments.length; i<l;i++ ) {
			//console.log('i='+i);
			app.toggleGroup(arguments[i]);
		}
		return;
	}
	
	if ( arguments.length == 0 || typeof(inSelector) != 'string' || inSelector == ''  ) { return; }
	
	var $theItem = $( inSelector );
	var $theItems = $( '*[data-toggle-group='+ $theItem.attr('data-toggle-group') +']' );

	//console.log( 'toggle-group [name='+$theItem.attr('data-toggle-group') +', items='+ $theItems.length +']'  );
	
	$theItems.hide();
	$theItem.show();
};

greyshine.jslib.loadHtmls = function() {
	
	var fctRun = function() {
		$('*[data-htmlload]').each( fctDataHtmlload );
	};
	
	var fctDataHtmlload = function(idx, elm) {
		
		var $elm = $(elm);
		var theLoadUrl = $elm.attr('data-htmlload');
		
		$elm.removeAttr('data-htmlload');
		
		if ( theLoadUrl == null || theLoadUrl == '' ) { return; }
		
		$.ajax( {
			
			url: theLoadUrl,
			method:'GET',
			dataType: 'text',
			async:false,
			success: function(inData) { $elm.append( inData ); },
			error: function(e) {
				$elm.attr('data-htmlload-error', e+' [url='+ theLoadUrl +']' );
			},
			complete:function() {
				$elm.attr('data-htmlload-loaded', theLoadUrl );
				fctRun();
			}
		} );
	 };
	 
	 fctRun();
};