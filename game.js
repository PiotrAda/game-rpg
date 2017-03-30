$(document).ready(function(){

var game = $('#game');
var warrior = $('#warrior');
var rock = $('.rock');
var tree = $('.tree');
var skeleton = $('.skeleton');

var xWarrior = warrior.css('left');
var yWarrior = warrior.css('top');

var xSkeleton;
var ySkeleton;

var skelPosx = [];
var skelPosy = [];

var randomNumber;

placeObjects();

	$(document).keydown(function(f) {
		warrior.finish();
		xWarrior = warrior.css('left'); // position before movement;
		yWarrior = warrior.css('top'); // position before movement;

		if (f.keyCode == 37) { // left
			if (xWarrior != '0px'){
				warrior.animate({left: '-=50px'}, 200, function(){

					// rock collision - left;
					xWarrior = warrior.css('left'); // position after movement;
					yWarrior = warrior.css('top'); // position after movement;
					for (var i = 0 ; i < rock.length ; i++ ){
						if (xWarrior == $(rock[i]).css('left') && yWarrior == $(rock[i]).css('top') ){
							warrior.animate({left: '+=50px'}, 50);
						};
					};
					// end rock collision - right;

					event1();
				});
			}
		}
		else if (f.keyCode == 38) { // top
			if (yWarrior != '0px'){
				warrior.animate({top: '-=50px'}, 200, function(){

					// rock collision - top;
					xWarrior = warrior.css('left'); // position after movement;
					yWarrior = warrior.css('top'); // position after movement;
					for (var i = 0 ; i < rock.length ; i++ ){
						if (xWarrior == $(rock[i]).css('left') && yWarrior == $(rock[i]).css('top') ){
							warrior.animate({top: '+=50px'}, 50);
						};
					};
					// end rock collision - top;

					event1();
				});
			}
		}
		else if (f.keyCode == 39) { // right
			if (xWarrior != '950px'){
				warrior.animate({left: '+=50px'}, 200, function(){

					// rock collision - right;
					xWarrior = warrior.css('left'); // position after movement;
					yWarrior = warrior.css('top'); // position after movement;
					for (var i = 0 ; i < rock.length ; i++ ){
						if (xWarrior == $(rock[i]).css('left') && yWarrior == $(rock[i]).css('top') ){
							warrior.animate({left: '-=50px'}, 50);
						};
					};
					// end rock collision - right;

					event1();
				});
			}
		}
		else if (f.keyCode == 40) { // bot
			if (yWarrior != '950px'){
				warrior.animate({top: '+=50px'}, 200, function(){

					// rock collision - bot;
					xWarrior = warrior.css('left'); // position after movement;
					yWarrior = warrior.css('top'); // position after movement;
					for (var i = 0 ; i < rock.length ; i++ ){
						if (xWarrior == $(rock[i]).css('left') && yWarrior == $(rock[i]).css('top') ){
							warrior.animate({top: '-=50px'}, 50);
						};
					};
					// end rock collision - bot;

					event1();
				});
			}
		};
	});

	function skeletonFight(){

		xWarrior = warrior.css('left');
		yWarrior = warrior.css('top');

		// skeleton has 20% chance of killing warrior;
		for ( i = 0 ; i < skeleton.length ; i++){

			xSkeleton = $(skeleton[i]).css('left');
			ySkeleton = $(skeleton[i]).css('top');

			if(xWarrior == xSkeleton && yWarrior == ySkeleton){

					if ( randomNumber < 0.2 && $(skeleton[i]).is(":visible")) {

					warrior.stop().effect( "explode", {pieces: 16}, "slow" );
					}
					else if ( randomNumber >= 0.2  && $(skeleton[i]).is(":visible")) {
					$(skeleton[i]).stop().effect( "explode", {pieces: 16}, "slow" );
					}
				}
		}
	}

	function skeletonMove(){

		for ( i = 0 ; i < skeleton.length ; i++){ // początek XXX
			xSkeleton = $(skeleton[i]).css('left');
			ySkeleton = $(skeleton[i]).css('top');

			var skeletonDirection = Math.random()

			if ( skeletonDirection <= 0.25 && xSkeleton != '0px') {
				$(skeleton[i]).animate({left: '-=50px'}, 50, function(){ // left
					event2();
				});
			}
			else if (skeletonDirection > 0.25 && skeletonDirection <= 0.50 && xSkeleton != '950px') {
				$(skeleton[i]).animate({left: '+=50px'}, 50, function(){ // right
					event2();
				});
			}
			else if (skeletonDirection > 0.50 && skeletonDirection <= 0.75 && ySkeleton != '0px') {
				$(skeleton[i]).animate({top: '-=50px'}, 50, function(){ // top
					event2();
				});
			}
			else if (skeletonDirection > 0.75 && skeletonDirection <= 1.00 && ySkeleton != '950px') {
				$(skeleton[i]).animate({top: '+=50px'}, 50, function(){ // bot
					event2();
				});
			};
		}; // koniec XXX
	};

function skeletonCollision(){
	for (i = 0 ; i < rock.length ; i++){
		var x = 0
		while (x < skeleton.length){
			if ($(rock[i]).css('left') == $(skeleton[x]).css('left') && $(rock[i]).css('top') == $(skeleton[x]).css('top')){
				$(skeleton[x]).animate({left: skelPosx[x]}, 50);
				$(skeleton[x]).animate({top: skelPosy[x]}, 50);
			};
			x++;
		};
	};
};

function skeletonPosition(){

	for ( i = 0 ; i < skeleton.length ; i++){
		skelPosx[i] = $(skeleton[i]).css('left');
		skelPosy[i] = $(skeleton[i]).css('top');
	};
};

function event1(){
	randomNumber = Math.random()
	skeletonFight();
	skeletonPosition();
	skeletonMove();
};

function event2(){
	skeletonFight();
	skeletonCollision();
};



function placeObjects(){
	// top-left corner;
	$(rock[0]).css({'left':'100px','top':'200px'});
	$(rock[1]).css({'left':'150px','top':'200px'});
	$(rock[2]).css({'left':'200px','top':'200px'});
	$(rock[3]).css({'left':'0px','top':'150px'});
	$(rock[4]).css({'left':'50px','top':'150px'});
	$(rock[5]).css({'left':'100px','top':'150px'});
	$(rock[6]).css({'left':'250px','top':'0px'});
	$(rock[7]).css({'left':'200px','top':'0px'});
	$(rock[8]).css({'left':'250px','top':'50px'});
	$(rock[9]).css({'left':'100px','top':'100px'});
	$(rock[10]).css({'left':'800px','top':'0px'});
	$(rock[11]).css({'left':'750px','top':'0px'});
	$(rock[12]).css({'left':'800px','top':'50px'});
	$(rock[13]).css({'left':'800px','top':'100px'});
	$(rock[14]).css({'left':'750px','top':'150px'});
	$(rock[15]).css({'left':'750px','top':'100px'});
	$(rock[16]).css({'left':'700px','top':'100px'});
	$(rock[17]).css({'left':'650px','top':'100px'});
	$(rock[18]).css({'left':'950px','top':'0px'});
	$(rock[19]).css({'left':'950px','top':'100px'});
	$(rock[20]).css({'left':'400px','top':'400px'});
	$(rock[21]).css({'left':'400px','top':'450px'});
	$(rock[22]).css({'left':'400px','top':'500px'});
	$(rock[23]).css({'left':'450px','top':'450px'});
	$(rock[24]).css({'left':'500px','top':'450px'});
	$(rock[25]).css({'left':'500px','top':'500px'});
	$(rock[26]).css({'left':'50px','top':'550px'});
	$(rock[27]).css({'left':'100px','top':'550px'});
	$(rock[28]).css({'left':'50px','top':'600px'});
	$(rock[29]).css({'left':'50px','top':'650px'});
	$(rock[30]).css({'left':'800px','top':'600px'});
	$(rock[31]).css({'left':'750px','top':'600px'});
	$(rock[32]).css({'left':'900px','top':'450px'});
	$(rock[33]).css({'left':'900px','top':'500px'});
	$(rock[34]).css({'left':'850px','top':'500px'});
	$(rock[35]).css({'left':'850px','top':'550px'});
	$(rock[36]).css({'left':'700px','top':'100px'});
	$(rock[37]).css({'left':'500px','top':'300px'});
	$(rock[38]).css({'left':'500px','top':'350px'});
	$(rock[39]).css({'left':'500px','top':'400px'});
	$(rock[40]).css({'left':'100px','top':'800px'});
	$(rock[41]).css({'left':'150px','top':'800px'});
	$(rock[42]).css({'left':'100px','top':'850px'});
	$(rock[43]).css({'left':'200px','top':'850px'});
	$(rock[44]).css({'left':'250px','top':'900px'});
	$(rock[45]).css({'left':'350px','top':'750px'});
	$(rock[46]).css({'left':'350px','top':'800px'});
	$(rock[47]).css({'left':'400px','top':'800px'});
	$(rock[48]).css({'left':'450px','top':'800px'});
	$(rock[49]).css({'left':'900px','top':'900px'});
	$(rock[50]).css({'left':'950px','top':'950px'});
	$(rock[51]).css({'left':'950px','top':'900px'});
	$(rock[52]).css({'left':'950px','top':'850px'});
	$(rock[53]).css({'left':'800px','top':'900px'});
	$(rock[54]).css({'left':'850px','top':'700px'});
	$(rock[55]).css({'left':'700px','top':'800px'});
	$(rock[56]).css({'left':'700px','top':'850px'});
	$(rock[57]).css({'left':'600px','top':'600px'});
	$(rock[58]).css({'left':'600px','top':'650px'});

	$(tree[0]).css({'left':'0px','top':'100px'});
	$(tree[1]).css({'left':'50px','top':'100px'});
	$(tree[2]).css({'left':'150px','top':'150px'});
	$(tree[3]).css({'left':'300px','top':'50px'});
	$(tree[4]).css({'left':'350px','top':'50px'});
	$(tree[5]).css({'left':'300px','top':'0px'});
	$(tree[6]).css({'left':'350px','top':'0px'});
	$(tree[7]).css({'left':'400px','top':'0px'});
	$(tree[8]).css({'left':'400px','top':'250px'});
	$(tree[9]).css({'left':'400px','top':'300px'});
	$(tree[10]).css({'left':'450px','top':'250px'});
	$(tree[11]).css({'left':'600px','top':'100px'});
	$(tree[12]).css({'left':'750px','top':'50px'});
	$(tree[13]).css({'left':'750px','top':'200px'});
	$(tree[14]).css({'left':'800px','top':'150px'});
	$(tree[15]).css({'left':'850px','top':'0px'});
	$(tree[16]).css({'left':'850px','top':'50px'});
	$(tree[17]).css({'left':'950px','top':'150px'});
	$(tree[18]).css({'left':'500px','top':'200px'});
	$(tree[19]).css({'left':'50px','top':'200px'});
	$(tree[20]).css({'left':'0px','top':'350px'});
	$(tree[21]).css({'left':'50px','top':'350px'});
	$(tree[22]).css({'left':'50px','top':'400px'});
	$(tree[23]).css({'left':'350px','top':'400px'});
	$(tree[24]).css({'left':'350px','top':'450px'});
	$(tree[25]).css({'left':'200px','top':'450px'});
	$(tree[26]).css({'left':'200px','top':'500px'});
	$(tree[27]).css({'left':'100px','top':'600px'});
	$(tree[28]).css({'left':'0px','top':'600px'});
	$(tree[29]).css({'left':'0px','top':'650px'});
	$(tree[30]).css({'left':'50px','top':'800px'});
	$(tree[31]).css({'left':'50px','top':'850px'});
	$(tree[32]).css({'left':'150px','top':'850px'});
	$(tree[33]).css({'left':'150px','top':'900px'});
	$(tree[34]).css({'left':'200px','top':'900px'});
	$(tree[35]).css({'left':'300px','top':'750px'});
	$(tree[36]).css({'left':'300px','top':'700px'});
	$(tree[37]).css({'left':'400px','top':'750px'});
	$(tree[38]).css({'left':'400px','top':'550px'});
	$(tree[39]).css({'left':'450px','top':'950px'});
	$(tree[40]).css({'left':'500px','top':'950px'});
	$(tree[41]).css({'left':'500px','top':'900px'});
	$(tree[42]).css({'left':'500px','top':'550px'});
	$(tree[43]).css({'left':'550px','top':'450px'});
	$(tree[44]).css({'left':'550px','top':'400px'});
	$(tree[45]).css({'left':'550px','top':'350px'});
	$(tree[46]).css({'left':'800px','top':'400px'});
	$(tree[47]).css({'left':'850px','top':'450px'});
	$(tree[48]).css({'left':'800px','top':'550px'});
	$(tree[49]).css({'left':'900px','top':'550px'});
	$(tree[50]).css({'left':'900px','top':'700px'});
	$(tree[51]).css({'left':'900px','top':'850px'});
	$(tree[52]).css({'left':'900px','top':'950px'});
	$(tree[53]).css({'left':'600px','top':'950px'});
	$(tree[54]).css({'left':'700px','top':'150px'});
	$(tree[55]).css({'left':'750px','top':'800px'});
	$(tree[56]).css({'left':'650px','top':'800px'});
	$(tree[57]).css({'left':'650px','top':'600px'});
	$(tree[58]).css({'left':'650px','top':'450px'});
	$(tree[59]).css({'left':'800px','top':'450px'});
};

});