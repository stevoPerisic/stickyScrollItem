function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
};

function onOffline() {
 	alert('There are no internets!')
};

//set some globals for the sticky fn and for the iScroll
var myScroll;
var offsetCurrent = 0;
var stuck = false;

var setSticky =function (){
	if (offsetCurrent <= 45)
	{	
		var stickyContent = $('#stickyContent');
		$('#Sticky').css('height', '1px');
		stickyContent.css({
			'opacity': .5,	
			'position':	'fixed',
			'top': '45px',
			'z-index': 1000
		}).appendTo('#header');
		
		offsetCurrent = $('#Sticky').offset().top;
		stuck = true;
		return offsetCurrent, stuck;
	}
	else if (offsetCurrent > 45 && stuck == true)
	{	
		$('#stickyContent').css({	
			'opacity': 1,
			'position': 'relative',
			'top': 0,
			'z-index': 0
		}).appendTo('#Sticky');
		$('#Sticky').css('height', '144px');
		
		offsetCurrent = $('#Sticky').offset().top;
		stuck = false;
		return offsetCurrent, stuck;
	}
	else
	{
		offsetCurrent = $('#Sticky').offset().top;
		stuck = false;
		return offsetCurrent, stuck;
	}
	
};

function loaded() {
	myScroll = new iScroll('wrapper', {
		momentum: false,
		hScrollbar: false,
		vScrollbar: true,
		onScrollMove: function(){	
			setSticky();
		}
	 });
};

function onOnline() {	
	loaded();
};



// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//IMPORTANT: run your phonegap functions here. 
function onDeviceReady() {
	  
   var networkState = navigator.network.connection.type;
   if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
		   onOffline();
		  
   } else {
		   onOnline();	
   }
	//check if they have internet connection
	//document.addEventListener("online", onOnline, false);
	//check if they are offline
	//document.addEventListener("offline", onOffline, false);
	//loaded();
}; //END device ready!!