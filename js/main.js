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

	// 1. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	// 2. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	var player;
	function onYouTubeIframeAPIReady() {
	  player = new YT.Player('player', {
		height: '180',
		width: '320',
		videoId: 'tYzHhoBQq5U',
		events: {
		  'onReady': onPlayerReady,
		  'onStateChange': onPlayerStateChange
		}
	  });
	}
	
	// 3. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
	  event.target.playVideo();
	}
	
	// 4. The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	var done = false;
	function onPlayerStateChange(event) {
	  if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	  }
	}
	function stopVideo() {
	  player.stopVideo();
	}

	loaded();
	
	/*$.getJSON('https://gdata.youtube.com/feeds/api/videos?alt=json&q=tYzHhoBQq5U&v=2', function(data) {
		  $('#stickyContent').html('<iframe class="youtube-player" type="text/html" width="320" height="180" src="'+ data.feed.entry[0].content.src +'" frameborder="0"></iframe>');
		});*/
	//$('#stickyContent').html('<iframe class="youtube-player" type="text/html" width="320" height="180" src="http://www.youtube.com/embed/tYzHhoBQq5U" frameborder="0"></iframe>');

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