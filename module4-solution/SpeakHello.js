var speakWord = "Hello";
(function(){
	var helloSpeaker={};
	helloSpeaker.speakWord=speakWord;
	helloSpeaker.speak=function(name){
		console.log(helloSpeaker.speakWord + " " + name);
	}
	window.helloSpeaker=helloSpeaker;
})();





