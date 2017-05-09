$(window).on('load',
  function(){
    setTimeout(function(){$('#loading-screen').fadeOut()}, 1000)
  }
);

$(document).ready(function(){

var game = $('#game');
var warrior = $('#warrior');
var rock = $('.rock');
var tree = $('.tree');
var skeleton = $('.skeleton');
var dragon = $('#dragon');
var sword = $('#sword');
var priest = $('#priest');
var fog = $('#fog');
var stars = $('#stars');
var cursed = $('.cursed');
var tomb = $('.tomb');
var fire = $('.fire');
var burnedtree = $('.burnedtree');
var tower = $('#tower');
var thief = $('#thief');
var treasure = $('#treasure');

var xWarrior = warrior.css('left');
var yWarrior = warrior.css('top');

// variables used for regular positioning (50x50):
var xSkeleton;
var ySkeleton;
var xDragon;
var yDragon;
var xFire;
var yFire;

// variables used for offset positioning used for dragon fight (bigger model 100x100);
var xDragonOffset;
var yDragonOffset;
var xWarriorOffset;
var yWarriorOffset;

// dice roll used for fights;
var randomNumber;

// technical, checks if function was performed;
var swordPicked = false;
var priestMet = false;
var gotTreasure = false;
var gotKey = false;
var dragonDead = false;
var princessRescued = false;

// initialize game;
placeObjects();
$('#game').fadeIn('fast');
$('#popup').fadeIn('slow').on('click', function(){
	$(this).fadeOut();
});

	// warrior movement;
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

					// events;
					enemyActions();
					meet();
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

					// events;
					enemyActions();
					meet();
				});
			}
		}
		else if (f.keyCode == 39) { // right
			if (xWarrior != '850px'){
				warrior.animate({left: '+=50px'}, 200, function(){

					// rock collision - right;
					xWarrior = warrior.css('left'); // position after movement;
					yWarrior = warrior.css('top'); // position after movement;
					for (var i = 0 ; i < rock.length ; i++ ){
						if (xWarrior == $(rock[i]).css('left') && yWarrior == $(rock[i]).css('top') ){
							warrior.animate({left: '-=50px'}, 50);
						};
					};

					// events;
					enemyActions();
					meet();
				});
			}
		}
		else if (f.keyCode == 40) { // bot
			if (yWarrior != '850px'){
				warrior.animate({top: '+=50px'}, 200, function(){

					// rock collision - bot;
					xWarrior = warrior.css('left'); // position after movement;
					yWarrior = warrior.css('top'); // position after movement;
					for (var i = 0 ; i < rock.length ; i++ ){
						if (xWarrior == $(rock[i]).css('left') && yWarrior == $(rock[i]).css('top') ){
							warrior.animate({top: '-=50px'}, 50);
						};
					};

					// events;
					enemyActions();
					meet();
				});
			}
		};
	}); // end of warrior movement rules;

	function winGame(){
		if (dragonDead == true && princessRescued == true){
			$('#winGame').fadeIn('slow');
		};
	};

	function loseGame(){
			$('#loseGame').fadeIn('slow');
	};

	// event - meeting the priestess;
	function meetPriest(){
		if (xWarrior == priest.css('left') && yWarrior == priest.css('top') && priestMet == false){
			skeleton.attr('src','assets/burningskeleton.png');
			$('#priestMeet').fadeIn('slow');
			$('#priestMeet').on('click', function(){
				$(this).fadeOut();
			});
			priestMet = true;
		};
	};

	// event - picking the sword;
	function pickSword(){
		if (xWarrior == sword.css('left') && yWarrior == sword.css('top') && swordPicked == false){
			sword.fadeOut();
			swordPicked = true;
			warrior.attr('src','assets/warriorkiller.png');
			$('#swordMessage').fadeIn('slow');
			$('#swordMessage').on('click', function(){
				$(this).fadeOut();
			});
		};
	};

	function killDragon(){
			$('#killDragon').fadeIn('slow');
			$('#killDragon').on('click', function(){
				$(this).fadeOut();
			});
			dragonDead = true;
		};

	function meetThief(){
		if (xWarrior == thief.css('left') && yWarrior == thief.css('top') && gotTreasure === false){
				$('#thiefQuest').fadeIn('slow');
				$('#thiefQuest').on('click', function(){
					$(this).fadeOut();
				});
			}
		else if (xWarrior == thief.css('left') && yWarrior == thief.css('top') && gotTreasure === true){
				$('#thiefCompleted').fadeIn('slow');
				$('#thiefCompleted').on('click', function(){
					$(this).fadeOut();
				});
				gotKey = true;
		}
	};

	function pickTreasure(){
		if (xWarrior == treasure.css('left') && yWarrior == treasure.css('top') && gotTreasure == false){
			treasure.fadeOut();
			gotTreasure = true;
			$('#pickTreasure').fadeIn('slow');
			$('#pickTreasure').on('click', function(){
				$(this).fadeOut();
			});
		};
	};

	function enterFire(){
		for ( i = 0 ; i < fire.length ; i++){

			xFire = $(fire[i]).css('left');
			yFire = $(fire[i]).css('top');

			if(xWarrior == xFire && yWarrior == yFire) {
				warrior.stop().effect( "explode", {pieces: 16}, "slow" );
				loseGame();
			}
		}
	};

	function meetPrincess(){
		if(xWarrior == '700px' && yWarrior == '300px' && gotKey == true) {
			$('#meetPrincess').fadeIn('slow');
			$('#meetPrincess').on('click', function(){
				$(this).fadeOut();
			});
			princessRescued = true;
			winGame();
		}
		if(xWarrior == '700px' && yWarrior == '300px' && gotKey == false) {
			$('#closedTower').fadeIn('slow');
			$('#closedTower').on('click', function(){
				$(this).fadeOut();
			});
		}
	};

	function skeletonFight(){
		// skeleton has 20% chance of killing warrior unless warrior has met priest;
		for ( i = 0 ; i < skeleton.length ; i++){

			xSkeleton = $(skeleton[i]).css('left');
			ySkeleton = $(skeleton[i]).css('top');

			if(xWarrior == xSkeleton && yWarrior == ySkeleton && $(skeleton[i]).is(":visible")){

				if (priestMet == false || randomNumber <= 0.5 && priestMet == true) {
					warrior.stop().effect( "explode", {pieces: 16}, "slow" );
					loseGame();
				}
				else if (randomNumber >= 0.5 && priestMet == true) {
					$(skeleton[i]).stop().effect( "explode", {pieces: 16}, "slow" );
				}
			}
		}
	}

	// skeleton moves in random direction but does not leave the graveyard;
	function skeletonMove(){

		for ( i = 0 ; i < skeleton.length ; i++){
			xSkeleton = $(skeleton[i]).css('left');
			ySkeleton = $(skeleton[i]).css('top');

			var skeletonDirection = Math.random()

			if ( skeletonDirection <= 0.25 && xSkeleton != '0px') {
				$(skeleton[i]).animate({left: '-=50px'}, 50, function(){ // left
					skeletonEngage();
				});
			}
			else if (skeletonDirection > 0.25 && skeletonDirection <= 0.50 && xSkeleton != '350px') {
				$(skeleton[i]).animate({left: '+=50px'}, 50, function(){ // right
					skeletonEngage();
				});
			}
			else if (skeletonDirection > 0.50 && skeletonDirection <= 0.75 && ySkeleton != '300px') {
				$(skeleton[i]).animate({top: '-=50px'}, 50, function(){ // top
					skeletonEngage();
				});
			}
			else if (skeletonDirection > 0.75 && skeletonDirection <= 1.00 && ySkeleton != '550px') {
				$(skeleton[i]).animate({top: '+=50px'}, 50, function(){ // bot
					skeletonEngage();
				});
			};
		};
	};

	// dragon has 50% chance of killing warrior unless warrior has picked sword;
	function dragonFight(){

		// dragon is bigger than usual, so we use offset to set engage rules;
		xWarriorOffset = $(warrior).offset().left;
		yWarriorOffset = $(warrior).offset().top;
		xDragonOffset = $(dragon).offset().left;
		yDragonOffset = $(dragon).offset().top;

		// checks placement to determine if there is a fight;
		if(	xWarriorOffset == xDragonOffset && yWarriorOffset == yDragonOffset ||
				xWarriorOffset == xDragonOffset+50 && yWarriorOffset == yDragonOffset ||
				xWarriorOffset == xDragonOffset && yWarriorOffset == yDragonOffset+50 ||
				xWarriorOffset == xDragonOffset+50 && yWarriorOffset == yDragonOffset+50){

			if ( randomNumber < 0.5 && $(dragon).is(":visible") && swordPicked == false) {
				warrior.stop().effect( "explode", {pieces: 16}, "slow" );
				loseGame();
			}
			else if ( randomNumber >= 0.5  && $(dragon).is(":visible") && swordPicked == false) {
				$(dragon).stop().effect( "explode", {pieces: 16}, "slow");
				killDragon();
				winGame();
			}
			else if (swordPicked == true  && $(dragon).is(":visible")) {
				$(dragon).stop().effect( "explode", {pieces: 16}, "slow" );
				killDragon();
				winGame();
			}
		}
	}

	//dragon moves in random direction within his area;
	function dragonMove(){

			xDragon = $(dragon).css('left');
			yDragon = $(dragon).css('top');

			var dragonDirection = Math.random()

			if ( dragonDirection <= 0.25 && xDragon != '400px') {
				$(dragon).animate({left: '-=100px'}, 50, function(){ // left
					dragonEngage();
				});
			}
			else if (dragonDirection > 0.25 && dragonDirection <= 0.50 && xDragon != '800px') {
				$(dragon).animate({left: '+=100px'}, 50, function(){ // right
					dragonEngage();
				});
			}
			else if (dragonDirection > 0.50 && dragonDirection <= 0.75 && yDragon != '400px') {
				$(dragon).animate({top: '-=100px'}, 50, function(){ // top
					dragonEngage();
				});
			}
			else if (dragonDirection > 0.75 && dragonDirection <= 1.00 && yDragon != '800px') {
				$(dragon).animate({top: '+=100px'}, 50, function(){ // bot
					dragonEngage();
				});
			};
	};

function enemyActions(){
	randomNumber = Math.random(); // rolls before enemy actions and is used for determining winner of fights;
	dragonFight();
	skeletonFight();
	skeletonMove();
	dragonMove();
};

function skeletonEngage(){
	skeletonFight(); // skeleton can initiate a fight by moving on warrior;
};

function dragonEngage(){
	dragonFight(); // dragon can initiate a fight by moving on warrior;
};

function meet(){
	pickSword();
	meetPriest();
	meetThief();
	enterFire();
	meetPrincess();
	pickTreasure();
};

$(document).on('keydown', function(e){
    if(e.which == 13 || e.which == 27 ){
      $('#popup').fadeOut();
			$('#priestMeet').fadeOut();
			$('#swordMessage').fadeOut();
			$('#killDragon').fadeOut();
			$('#thiefQuest').fadeOut();
			$('#thiefCompleted').fadeOut();
			$('#pickTreasure').fadeOut();
			$('#closedTower').fadeOut();
			$('#meetPrincess').fadeOut();
    }
});

$('button').on('click', function(){
	window.location.reload();
});

// manual placement of objects - graphic job;
function placeObjects(){

	$(dragon).css({'left':'500px','top':'600px'});
	$(sword).css({'left':'150px','top':'350px'});
	$(priest).css({'left':'500px','top':'50px'});
	$(tower).css({'left':'675px','top':'200px'});
	$(thief).css({'left':'100px','top':'700px'});
	$(treasure).css({'left':'800px','top':'650px'});

	$(fog).css({'left':'-150px','top':'200px'});
	$(stars).css({'left':'350px','top':'-50px'});

	$(cursed[0]).css({'left':'450px','top':'450px'});
	$(cursed[1]).css({'left':'650px','top':'450px'});
	$(cursed[2]).css({'left':'450px','top':'700px'});
	$(cursed[3]).css({'left':'600px','top':'600px'});
	$(cursed[4]).css({'left':'300px','top':'500px'});
	$(cursed[5]).css({'left':'700px','top':'700px'});

	$(skeleton[0]).css({'left':'0px','top':'500px'});
	$(skeleton[1]).css({'left':'100px','top':'350px'});
	$(skeleton[2]).css({'left':'150px','top':'400px'});
	$(skeleton[3]).css({'left':'250px','top':'450px'});
	$(skeleton[4]).css({'left':'300px','top':'300px'});

	$(tomb[0]).css({'left':'100px','top':'300px'});
	$(tomb[1]).css({'left':'150px','top':'450px'});
	$(tomb[2]).css({'left':'250px','top':'350px'});

	$(fire[0]).css({'left':'800px','top':'700px'});
	$(fire[1]).css({'left':'500px','top':'700px'});
	$(fire[2]).css({'left':'400px','top':'600px'});
	$(fire[3]).css({'left':'700px','top':'600px'});
	$(fire[4]).css({'left':'550px','top':'500px'});
	$(fire[5]).css({'left':'650px','top':'800px'});

	$(burnedtree[0]).css({'left':'650px','top':'550px'});
	$(burnedtree[1]).css({'left':'500px','top':'800px'});
	$(burnedtree[2]).css({'left':'700px','top':'700px'});
	$(burnedtree[3]).css({'left':'550px','top':'600px'});
	$(burnedtree[4]).css({'left':'400px','top':'550px'});
	$(burnedtree[5]).css({'left':'450px','top':'650px'});
	$(burnedtree[6]).css({'left':'550px','top':'450px'});

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
	$(rock[18]).css({'left':'600px','top':'0px'});
	$(rock[19]).css({'left':'300px','top':'100px'});
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
	$(rock[32]).css({'left':'750px','top':'450px'});
	$(rock[33]).css({'left':'800px','top':'500px'});
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
	$(rock[44]).css({'left':'250px','top':'850px'});
	$(rock[45]).css({'left':'350px','top':'750px'});
	$(rock[46]).css({'left':'350px','top':'800px'});
	$(rock[47]).css({'left':'400px','top':'800px'});
	$(rock[48]).css({'left':'450px','top':'800px'});
	$(rock[49]).css({'left':'750px','top':'800px'});
	$(rock[50]).css({'left':'850px','top':'750px'});
	$(rock[51]).css({'left':'550px','top':'850px'});
	$(rock[52]).css({'left':'850px','top':'850px'});
	$(rock[53]).css({'left':'800px','top':'850px'});
	$(rock[54]).css({'left':'850px','top':'700px'});
	$(rock[55]).css({'left':'700px','top':'800px'});
	$(rock[56]).css({'left':'700px','top':'850px'});
	$(rock[57]).css({'left':'600px','top':'600px'});
	$(rock[58]).css({'left':'600px','top':'650px'});
	$(rock[59]).css({'left':'650px','top':'150px'});
	$(rock[60]).css({'left':'600px','top':'200px'});
	$(rock[61]).css({'left':'550px','top':'200px'});
	$(rock[62]).css({'left':'550px','top':'250px'});

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
	$(tree[17]).css({'left':'850px','top':'350px'});
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
	$(tree[33]).css({'left':'150px','top':'750px'});
	$(tree[34]).css({'left':'200px','top':'800px'});
	$(tree[35]).css({'left':'250px','top':'750px'});
	$(tree[36]).css({'left':'200px','top':'700px'});
	$(tree[37]).css({'left':'300px','top':'750px'});
	$(tree[38]).css({'left':'150px','top':'550px'});
	$(tree[39]).css({'left':'650px','top':'350px'});
	$(tree[40]).css({'left':'300px','top':'850px'});
	$(tree[41]).css({'left':'0px','top':'750px'});
	$(tree[42]).css({'left':'600px','top':'150px'});
	$(tree[43]).css({'left':'550px','top':'0px'});
	$(tree[44]).css({'left':'600px','top':'300px'});
	$(tree[45]).css({'left':'550px','top':'350px'});
	$(tree[46]).css({'left':'800px','top':'300px'});
	$(tree[47]).css({'left':'850px','top':'350px'});
	$(tree[48]).css({'left':'700px','top':'150px'});
	$(tree[49]).css({'left':'650px','top':'350px'});
	$(tree[50]).css({'left':'800px','top':'250px'});
};

});
