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
			'position':	'fixed',
			'top': '45px',
			'z-index': 1000
		});
		
		offsetCurrent = $('#Sticky').offset().top;
		stuck = true;
		return offsetCurrent, stuck;
	}
	else if (offsetCurrent > 45 && stuck == true)
	{	
		$('#stickyContent').css({	
			'position': 'relative',
			'top': 0,
			'z-index': 0
		});
		$('#Sticky').css('height', '180px');
		
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
		useTransform:false,
		onBeforeScrollMove: function(){ setSticky(); }
	 });
};

function onOnline() {	
	loaded();
	
	$.getJSON('https://gdata.youtube.com/feeds/api/videos?alt=json&q=tYzHhoBQq5U&v=2', function(data) {
		 alert(data.feed);
		  $('#stickyContent').html('<object width="320" height="180"><param name="movie" value="'+ data.feed.entry[0].content.src +'"></param><param name="allowFullScreen" value="false"></param><param name="allowScriptAccess" value="always"></param><embed src="'+ data.feed.entry[0].content.src +'" type="'+ data.feed.entry[0].content.type +'" allowfullscreen="false" allowScriptAccess="always" width="320" height="180"></embed></object>');
		});
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
	
}; //END device ready!!