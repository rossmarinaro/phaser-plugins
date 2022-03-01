//////Pastaboss game preload assets

import { mainAnims } from '../animations/main.js';
import { playerAnims } from '../animations/player.js';


export class Preload extends Phaser.Scene {
	constructor() {

	    super("Preload");
 
        this.stageText = {};  
        this.percentText = {}; 
        this.loadingText = {}; 
        this.progressBarGraphics = {};     
        this.progressBox = {}; 
        this.progressBox2 = {};
        this.progressOverlay = {};
        this.animsLoaded = {
            baddies: {
                sushiChef: false,
                collieFlower: false,
                carpShooter: false,
                pirate: false,
                navalOrange: false,
                apple: false,
                meatball: false,
                taxi: false,
                cat: false,
                cheese: false,
                cupcake: false,
                sniper: false,
                banana: false,
                pickle: false,
                mobster: false,
                macZombie: false,
                bakedBean: false,
                icecream: false,
                wsm: false,
                ghostPepper: false,
                chili: false,
                jellyFish: false,
                crab: false,
                piranha: false
            },
            bosses: {
                crookedCook: false,
                eggplant: false,
                hotdog: false,
                pizzaSlice: false,
                scorpionPepper: false,
                monkfish: false,
                fluke1: false,
                fluke2: false,
                cake: false,
                ninja: false,
                hitwoman: false,
                supremeLeader: false
            }
        }
	}

//----------------------------------------------------------------------------------------------------------------

	init(data)
    {
		this.data = data;
		this.data.config.currentStage = 'Assets'; 
	}

//----------------------------------------------------------------------------------------------------------------

	preload()
    {   

    //---- call asset preload funcs

       this.parseResources(this.cache.json.get('main_resources')); 
       this.parseResources(this.cache.json.get('entity_resources'));
       this.parseResources(this.cache.json.get('minigames_resources'));
       this.parseResources(this.cache.json.get('map_resources'));
       

	//---- progress bar   

		this.progressBar(this);
	}

//-------------------------------------------------------------------------------------------------------------------
    create() 
    {

    //----- run background shaders

            this.scene.run('Background', 'preload');

    //----fade in / clear canvas background color 

            document.getElementById('game').getElementsByTagName('canvas')[0].style.backgroundColor = 'transparent';

            this.cameras.main.fadeIn(2000);

    //----load animations to cache 

            playerAnims(this);
            mainAnims(this);

    //----init controls

            this.scene.run('Controller', [this, false]); 
            this.startText = this.add.text(this.cameras.main.width / 2, (30 / 100) * this.cameras.main.height, "START GAME", {font: "32px Digitizer", fill: '#ffff00'}).setStroke("#ff0000", 4).setAlpha(0).setOrigin(0.5, 0.5);
            this.tweens.add({targets: this.startText, alpha: {value: 1, duration: 2000, ease: 'Power1'}});
    //----lighting

            this.lights.enable().setAmbientColor(0xFCDD44);
            this.light = this.lights.addLight(this.startText.x - 100, (50 / 100) * this.cameras.main.height, 300).setColor(0xffffff).setIntensity(0.8);
            this.tweens.add({targets: this.light, x: this.startText.x + 200, duration: 4000, ease: 'Sine.easeIn', yoyo: true, repeat: -1});
    //----meshes 
            this.glove = this.add.mesh(this.startText.x, (70 / 100) * this.cameras.main.height, 'glove_mesh').addVerticesFromObj('glove_obj', 0.14).panZ(7).setPipeline('Light2D');
            //this.meatball = this.add.mesh(this.startText.x, (10 / 100) * this.cameras.main.height, 'meatball_mesh').addVerticesFromObj('meatball_obj', 1).panZ(9).setPipeline('Light2D');

    //----start game

            this.startGame = () =>{ 
                Config.config.audio.play('ring', 1, false, this, 0); 
                this.scene.stop('Background');
                this.scene.run('Intro', this.data);
                this.scene.stop('Preload');
            }
    //----inputs

            this.input.once('pointerdown', ()=> this.startGame());
            this.input.keyboard.once('keydown', ()=> this.startGame());
            this.input.gamepad.once('down', ()=> this.startGame());
            this.input.gamepad.once('connected', ()=> {
                console.log(this.input.gamepad);
                //this.props.gamepadControls(scene);
            });            
    //----destroy progress bar

            this.destroyProgressBar();
    }
//------------------------------------------------------------------------------------------------------------

    update() 
    { 
       this.glove.modelRotation.y += 0.008;

        //this.meatball.modelRotation.x += 0.006;
        //this.meatball.modelRotation.y -= 0.006;

    }
//---------------------------------------------------------------------------------- progress bar

    progressBar(scene)
    { 

        Config.orientation.lock('portrait-primary'); //portrait

        document.getElementById('game').getElementsByTagName('canvas')[0].style.backgroundColor = 0x000000;
        
        if (Config.mobileAndTabletCheck())  
        {
            this.GAME_WIDTH = Config.width; 
            this.GAME_HEIGHT = innerHeight; 
        } 
        else{
            this.GAME_WIDTH = Config.config.scale.width;
            this.GAME_HEIGHT = Config.config.scale.height;
        }
        this.progressBox = scene.add.graphics().fillStyle(0xffff00, 1).fillRoundedRect((12 / 100) * this.GAME_WIDTH, (65 / 100) * this.GAME_HEIGHT, (75 / 100) * this.GAME_WIDTH, 50, 10);
        this.progressBox2 = scene.add.graphics({lineStyle: {width: 3, color: 0xff0000}}).strokeRoundedRect((12 / 100) * this.GAME_WIDTH, (65 / 100) * this.GAME_HEIGHT, (75 / 100) * this.GAME_WIDTH, 50, 10);
        this.progressBarGraphics = scene.add.graphics();
        this.progressOverlay = scene.add.graphics().fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0, 0.2, 0.3, 0.1).fillRoundedRect((12 / 100) * this.GAME_WIDTH, (65 / 100) * this.GAME_HEIGHT, (75 / 100) * this.GAME_WIDTH, 50, 10);
        this.loadingText = scene.make.text({
            x: this.GAME_WIDTH / 2,
            y: this.GAME_HEIGHT / 2 - 50,
            text: 'Loading...',
            style: {font: '50px Digitizer', fill: '#ff0000' }
        }).setStroke('#FFB000', 4).setShadow(2, 2, '#ffff00', true, false).setOrigin(0.5, 0.5);   
        this.percentText = scene.make.text({ 
            x: this.GAME_WIDTH / 2,
            y: this.GAME_HEIGHT / 2 + 5,
            text: '0%',
            style: {font: '38px Digitizer', fill: '#ffffff' }
        }).setStroke('#FFB000', 4).setShadow(2, 2, '#ffff00', true, false).setOrigin(0.5, 0.5);
        this.stageText = scene.make.text({
            x: this.GAME_WIDTH / 2,
            y: this.GAME_HEIGHT / 2 + 50,
            text: scene.data.config.currentStage,
            style: { font: '20px Digitizer', fill: '#0CC10C' }
        }).setStroke('#FFB000', 4).setShadow(2, 2, '#ffff00', true, false).setOrigin(0.5, 0.5);
    //// on progress / complete
        scene.load.on('progress', value =>{
            this.percentText.setText(parseInt(value * 100) + '%');
            this.progressBarGraphics.clear();    
            this.progressBarGraphics.fillGradientStyle(0xff0000, 0xff0000, 0xFCB144, 0xFCB144, 1).fillRoundedRect((15 / 100) * this.GAME_WIDTH, (66.4 / 100) * this.GAME_HEIGHT, (68 / 100) * this.GAME_WIDTH * value, 30, 2);
    //// destroy progress bar
            if (this.percentText._text === '100%')
                Config.config.gameState === true ? 
                    this.destroyProgressBar() : scene.time.delayedCall(3000, ()=> this.destroyProgressBar());  
        }); 
    }
//---------------------------------------------------------------------------------------- destroy progress bar

    destroyProgressBar()
    {
        this.progressBarGraphics.destroy();
        this.progressOverlay.destroy();
        this.progressBox.destroy();
        this.progressBox2.destroy();
        this.loadingText.destroy();
        this.percentText.destroy();
        this.stageText.destroy();
    }
    
//------------------------------------------------------------------------------------ parse asset resource manifests

    parseResources(json) 
    {
    //images (png)
        if (json.hasOwnProperty('image')) 
        {
            for (let key in json.image) 
            {
                let keys = Object.keys(json.image[key]).find(i => i); 
                for (let value in json.image[key]) 
                {
                    let values = json.image[key][value];
                    this.load.image(keys, values); 
                }
            }
        }
    //audio (ogg)
        if (json.hasOwnProperty('audio')) 
        {
            for (let key in json.audio) 
            {
                let keys = Object.keys(json.audio[key]).find(i => i); 
                for (let value in json.audio[key]) 
                {
                    let values = json.audio[key][value];
                    this.load.audio(keys, values); 
                }
            }
        }
    //obj
        if (json.hasOwnProperty('obj'))
        {
            for (let key in json.obj) 
            {
                let keys = Object.keys(json.obj[key]).find(i => i); 
                for (let value in json.obj[key]) 
                {
                    let obj = json.obj[key][value][0], 
                        mtl = json.obj[key][value][1];
                    this.load.obj(keys, obj, mtl); 
                }
            }
        }
    //atlas
        if (json.hasOwnProperty('atlas'))
        {
            for (let key in json.atlas) 
            {
                let keys = Object.keys(json.atlas[key]).find(i => i); 
                for (let value in json.atlas[key]) 
                {
                    let img = json.atlas[key][value][0], 
                        data = json.atlas[key][value][1];
                    this.load.atlas(keys, img, data); 
                }
            }
        }
    //spritesheet
        if (json.hasOwnProperty('spritesheet'))
        {
            for (let key in json.spritesheet) 
            {
                let keys = Object.keys(json.spritesheet[key]).find(i => i);
                for (let key2 in json.spritesheet[key]) 
                {
                    let img = json.spritesheet[key][key2][0],
                        data = json.spritesheet[key][key2][1];
                   this.load.spritesheet(keys, img, {frameWidth: data.frameWidth, frameHeight: data.frameHeight}); 
                }
            }
        }
    //tilemaps
        if (json.hasOwnProperty('tilemapTiledJSON'))
        {
            for (let key in json.tilemapTiledJSON) 
            {
                let keys = Object.keys(json.tilemapTiledJSON[key]).find(i => i); 
                for (let key2 in json.tilemapTiledJSON[key]) 
                {
                   let data = json.tilemapTiledJSON[key][key2];
                   this.load.tilemapTiledJSON(keys, data);  
                }   
            }
        }
    }
}




