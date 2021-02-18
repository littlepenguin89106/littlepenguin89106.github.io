//source for multiple players: https://stackoverflow.com/questions/38906568/youtube-api-multiple-videos-with-events
//source for track current play time: https://gist.github.com/mangreen/607fcc6c84379c2025ae
//source for progress bar: https://www.w3schools.com/howto/howto_js_progressbar.asp

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var playerDivs = document.querySelectorAll(".player"); // get .player nodes
var players = new Array(playerDivs.length);
var currentPlayer=null;
var timerId=null;
var currentBar=null;
var barArgs={func:null,bar:null};

// when youtube stuff is ready
function onYouTubeIframeAPIReady() {  
  // create yt players
    playerDivs.forEach(function(e, i) { // forEach ...
        players[i] = new YT.Player(e.id, {
            height: '350',
            width: '700',
            videoId: plist[i],
            events: {
                'onStateChange': switchPlayer
            }
        });
    })  
}

function switchPlayer(event) { //handle player playing
    //console.log(event.data);
    if(event.data === 1){
        if(currentPlayer && currentPlayer !== event.target){
            if(currentPlayer.getPlayerState() === 1){
                currentPlayer.pauseVideo();
            }
        }

        currentPlayer = event.target;

        if(timerId){
            clearInterval(timerId);
            timerId=null;
            currentBar.style.width="0%";
            currentBar=null;
        }

        if(barArgs.func){
            timerId = setInterval(barArgs.func,10);
            currentBar=barArgs.bar;
            barArgs.func=null;
        }
    }
    else if(event.data === 2 && currentPlayer === event.target){
        currentPlayer = null;
        if(timerId){
            clearInterval(timerId);
            timerId=null;
            currentBar.style.width="0%";
            currentBar=null;
        }
    }
} 

function playDuration(playerInd,start,end,barId){
    var player=players[playerInd]; //take over player and bar
    var btnBar=document.getElementById(barId);
    barArgs.bar=btnBar;

    player.seekTo(start);
    player.playVideo();

    var currentPercent=0;
    var ProgressRate=1/(end-start);
    barArgs.func=()=>{
        currentPercent+=ProgressRate;
        //console.log(currentPercent);
        btnBar.style.width=`${currentPercent}%`;
        if(currentPercent>=100){
            clearInterval(timerId);
            timerId=null;
            player.pauseVideo();
            currentPlayer=null;
            btnBar.style.width="0%";
            currentBar=null;
        }
    }; // set every certain time check playtime
}