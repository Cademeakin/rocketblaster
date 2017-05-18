BasicGame.Game = function (game) {};

//Graphical Objects
var ship;

BasicGame.Game.prototype = {

	create: function () {
       //Specify the Physics of the Game to ARCADE
			 this.physics.startSystem(Phaser.Physics.ARCADE);
			 //Add the starfield and logo on screen
			 this.starfield = this.add.tileSprite(0,0,800,600,'starfield');
			 //Add the ship onto the sceen, set Physics and the boundries
			 ship = this.add.sprite((this.world.width / 2), this.world.height - 50, 'ship');
			 ship.anchor.setTo(0.5,0);
			 this.physics.enable(ship, Phaser.Physics.ARCADE);
			 ship.body.collideWorldBounds = true;
	},

	update: function () {
		//execute 'createUfo','createLife','moveShip','collisionDetection' function

	}

};
