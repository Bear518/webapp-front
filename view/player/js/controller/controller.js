define(['jquery','utils/extendable'],function($,Extendable){
	var controller=Extendable.extend({
		constructor:function(player){
			this.player=player;
			try{
            var vol=player.getVolume();
            console.log('音量大小',vol);
            this.setVolume(50);
        	}catch(e){
        		
        	}

		},
		setPlayer:function(player){
			this.player=player;
			return this;
		},
		getVolume:function(){
			return this.player.getVolume()*100;
		},
		setVolume:function(vol){
			var vol=(vol/100).toFixed(2);
			this.player.setVolume(vol);
		},
		loadByUrl:function(url,time){
			this.player.loadByUrl(url,time);
		},
		setPlaybackRate:function(rate){
			var video=document.getElementsByTagName('video')[0];
			video.playbackRate=rate;
		},
		getPlaybackRate:function(){
			var video=document.getElementsByTagName('video')[0];
			return video.playbackRate
		}
	});
	return controller;
})