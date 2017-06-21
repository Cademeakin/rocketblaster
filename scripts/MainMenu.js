BasicGame.MainMenu = function (game) { };

    var startButton;
    var starfield;
    var logo;

BasicGame.MainMenu.prototype = {

	create: function () {
        
        // We've already preloaded our assets, so let's get into the Main Menu itself.
        // Here we are playing music and adding a pic and button.
        // Outputting sky, ship, score, lives, total and Start Time to the screen.
        // The scrolling starfield background
        starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
        logo = this.add.sprite((this.world.width / 2), (this.world.height / 2) - 150, 'logo');
        logo.anchor.setTo(0.5,0.5);
        startButton = this.add.button((this.world.width / 2),(this.world.height / 2) + 50, 'startButton', this.startGame);
        startButton.anchor.setTo(0.5,0.5);
                                      

	},

	update: function () {
		//	Do some nice funky main menu effect here
	},
    
    startGame: function () {
        //Start the actual game
        this.game.state.start('Game');
        
    }

};