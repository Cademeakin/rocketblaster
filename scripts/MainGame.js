BasicGame.Game = function (game) {};

//Graphical Objects
var ship;
var ufos; //Group of Enemy UFOs which drop from the top of the screen
var lives; //Group of Lives which are collected

var bullets; //Bullets which your spaceship fires
var fireRate = 100; // Rate at which bullets are fired
var nextFire = 0;

//Score & Life Objects
var score; //Players Score
var lifeTotal; //Players total number of lives
var scoreText; //Text which is used to display the score
var lifeTotalText; //Text which is used to display the number of lives

//Timer Variables stores information about the timer
var seconds; //Number of seconds game has been running
var timer;
var timerText;

//Misc Variables
var cursors; //Keyboard control

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

            //Creating Groups
        
            //Create the ufos group, set the physics and the boundarys
            ufos = this.add.group();
            this.physics.enable(ufos, Phaser.Physics.ARCADE);
        
            ufos.setAll('outOfBoundsKill', true);
            ufos.setAll('checkWorldBounds', true);
            ufos.setAll('anchor.x', 0.5);
            ufos.setAll('anchor.y', 0.5);
        
            //Create the lives group, set the physics and the boundarys
        
            lives = this.add.group();
            this.physics.enable(lives, Phaser.Physics.ARCADE);
        
            lives.setAll('outOfBoundsKill', true);
            lives.setAll('checkWorldBounds', true);
            lives.setAll('anchor.x', 0.5);
            lives.setAll('anchor.y', 0.5);
			 //Create the bullets group, set the physics, multiples and boundaries
			 bullets = this.add.group();
			 bullets.enableBody = true;
			 bullets.physicsBodyType = Phaser.Physics.ARCADE;
			 bullets.createMultiple(30, 'bullet', 0, false);
			 bullets.setAll('anchor.x', 0.5);
			 bullets.setAll('anchor.y', 0.5);
			 bullets.setAll('outOfBoundsKill', true);
			 bullets.setAll('checkWorldBounds', true);
        
        //Setting up and adding the Score, Life and Timer to the Screen
        scoreText = this.add.text(16, 16, 'Score: 0', {
            font: '32px arial',
            fill: '#fff'
            });
        
        //sets the score to 0 and output to the screen
        score = 0;
        scoreText.text = "Score: " + score;
        lifeTotalText = this.add.text(this.world.width - 150, 16, 'Lives:3', {
            font: '32px arial',
            fill: '#fff'
            });
        
        //sets the lifeTotal to 3 and output to the screen
        lifeTotal = 3;
        lifeTotalText.text = 'Lives: ' + lifeTotal;
        timerText = this.add.text(350, 16, 'Time: 0', {
            font: '32px arial',
            fill: '#fff'
            });
        
        //setup timer
        timer = this.time.create(false);
        seconds = 0;
        timerText.text = 'Time: ' + seconds;

			 //Setting the keyboard to accept LEFT, RIGHT and SPACE input
			 this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
			 cursors = this.input.keyboard.createCursorKeys();
        
            //Set a TimerEvent to occur every second and start the timer
            timer.loop(1000, this.updateTimer, this);
            timer.start();
	},

	update: function () {
		//execute 'createUfo','createLife','moveShip','collisionDetection' function
            this.createUfo();
            this.createLife();
			this.moveShip();
            this.collisionDetection();
			},

		//moves ship and fires bullet from keyboard controls
			moveShip: function () {
				//if left arrow key pressed move players ship left
				if (cursors.left.isDown) {
					// Move to the left
					ship.body.velocity.x = -200;
				}
				//if right arrow key pressed move players ship right
				else if (cursors.right.isDown) {
					ship.body.velocity.x = 200;
				}
				//else stop ship
				else {
					ship.body.velocity.x = 0;
					}
				//if space bar is pressed execute the 'fireBullet' function
				if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
					this.fireBullet();
					}

},
    //function executed during playing the game to create a UFO
    createUfo: function () {
        
        //Generate random number between 0 and 20
        var random = this.rnd.integerInRange(0, 20);
        
        //if random number equals 0 then create a ufo in a random x position and random y velocity
        if (random === 0) {
            var randomX = this.rnd.integerInRange(0, this.world.width - 150);
            
            //Creating a ufo from the the ufos group and setting physics
            var ufo = ufos.create(randomX, -50, 'ufo');
            this.physics.enable(ufo, Phaser.Physics.ARCADE);
            
            //Generating a random velocity
            ufo.body.velocity.y = this.rnd.integerInRange(200, 300);
            }
        },
    
    //function executed during playing the game to create a Life
    createLife: function () {
        //Generate random number between 0 and 500
        var random = this.rnd.integerInRange(0, 500);
        //if random number equals 0 then create a life in a random x position
        if (random === 0) {
            //Generating random position in the X Axis
            var randomX = this.rnd.integerInRange(0, this.world.width - 150);
            
            //Creating a ufo from the the ufos group and setting physics
            var life = lives.create(randomX, -50, 'life');
            this.physics.enable(life, Phaser.Physics.ARCADE);
            //Generating a random velocity
            life.body.velocity.y = 150;
            }
    },

//Generate bullet and position in the x axis, set the velocity and play the audio
			fireBullet: function () {
				if (this.time.now > nextFire && bullets.countDead() > 0) {
					nextFire = this.time.now + fireRate;
					var bullet = bullets.getFirstExists(false);
					bullet.reset(ship.x, ship.y);
					bullet.body.velocity.y = -400;
					}
				}
			},
    
    //function executed during playing the game to check for collisions
    collisionDetection: function () {
        this.physics.arcade.overlap(ship, ufos, this.collideUfo, null, this);
        this.physics.arcade.overlap(ship, lives, this.collectLife, null, this);
        this.physics.arcade.overlap(bullets, ufos, this.destroyUfo, null, this);
        },
            
            //function executed if there is collision between player and ufo. UFO is destroyed, animation & sound, reduce lifeTotal
            collideUfo: function (ship,ufo) {
                ufo.kill();
                },
                    //function executed if there is collision between ufo and bullet. UFO is destroyed, animation & sound, increase score
                    destroyUfo: function (bullet, ufo) {
                        ufo.kill();
                        bullet.kill();
                        },
                    //function executed if there is collision between player and life. Life is destroyed, animation & sound, increase lifeTotal
                            //collectLife: function (ship, life) {
                                life.kill();
                                },
                        
                    //Updates timer and outputs to the screen
                                    updateTimer: function () {
                                        seconds++;
                                        timerText.text = 'Time: ' + seconds;
                                        }
};
