
import main_resources from './resources/main.json';
import map_resources from './resources/maps.json';
import entity_resources from './resources/entities.json';
import minigames_resources from './resources/minigames.json';
import JoyStick from '../plugins/joystick.js';

export class Boot extends Phaser.Scene {
        constructor() {
            super("Boot"); 
        }
    //---------------------- initialize 
        init() 
        {  
        //game data       
              this.gameData = {
                tomatoDiscussion1: false,
                savedTomatoGirl: false,
                drNubsConvo1: false,
                swankyMission: false,
                pinballCollideBool: false,
                songDayCompleted: false,
                songNightCompleted: false,
                miniGameRaceWon: false,
                miniGameBubbleWon: false,
                seaShellMiniGameWon: false,
                currentStage: null,
                spawnPoint: null,
                IPStealsBook: false,
                broccoliRob: false,
                destroyBigCheese: false,
                destroyIceBlock1: false,
                defeatedLabBoss1: false,
                defeatedLabBoss2: false,
                defeatedChef: false,
                defeatedHerbGardenBoss: false,
                defeatedFreezerBoss: false,
                destroyedHGSpaghettiVent: false,
                destroyedGVSpaghettiVent: false,
                defeatedSushiRestaurantBoss: false,
                defeatedDiveBoss: false, 
                defeatedMiddleYeastBoss: false,
                defeatedCarbKingdomBoss: false,
                defeatedHotdogBoss: false,
                defeatedFlukeBoss: false,
                defeatedRivals: {
                    yellow: false,
                    orange: false,
                    red: false,
                    green: false,
                    blue: false,
                    indigo: false,
                    purple: false
                },
                turnedCastIronGraterVille: false,
                brokeIceFreezer: false,
                enteredMobHangout: false,
                enteredTomb: false,
                shreddedCheeseMM: false,
                diveTrapDoorOpen: false,
                FTTrapDoorOpen: false,
                shadows: {
                    shadow1: 0,
                    shadow2: 0,
                    shadow3: 0,
                    shadow4: 0,
                    shadow5: 0,
                    shadow6: 0,
                    shadow7: 0,
                    shadow8: 0,
                    shadow9: 0,
                    shadow10: 0,
                    shadow11: 0,
                    shadow12: 0
                },
                recipes: {
                    _1: false,
                    _2: false,
                    _3: false,
                    _4: false,
                    _5: false,
                    _6: false,
                    _7: false
                },
                healthScore: 10,
                magicScore: 10,
                doughAvailable: 0,
                livesLeft: 3,
                bassIcon1Unlocked: false,
                bassIcon2Unlocked: false,
                fireBallLoaded: false,
                weapons: ['rolling_pin1', 'macaroni'],
                items: [],
                powerups: [],
                powerupQuantities: {
                    shrooms: 5,
                    coffees: 5,
                    beers: 5,
                    sushi: 5,
                    salmon: 5,
                    ikura: 5,
                    magicFlours: 5,
                    bong: 5
                },
                ammo: {
                    automac1000: 25,
                    pennePistol: 25,
                    RRL: 25,
                    grenades: 10,
                    dynamites: 10,
                },
                characters: {
                    bountyHunter: true,
                    hitwoman: false,
                    assassin: false,
                    supremLeader: false,
                    swankyVelvet: false
                },
                player: {
                    character: null,
                    self: null,
                    color: '',
                    human: true,
                    anim: null
                },
                selects: {
                    A: {
                        key: '',
                        selected: false
                    }, 
                    B: {
                        key: '',
                        selected: false
                    }, 
                    C: {
                       key: '',
                       selected: false
                    }, 
                    D: {
                        key: '',
                        selected: false
                    }
                }
            };
        //gameplay data object (gets passed scene to scene)
            this.data = new Phaser.Scenes.Systems(this, this.gameData); 
        //game scale 
            Config.config.scale.scaleWidth = this.scale.width; 
            Config.config.scale.scaleHeight = this.scale.height;
            Config.config.scale.scaleRatio = Config.config.scale.scaleWidth / Config.config.scale.scaleHeight * 0.9;  
        }
        preload()
        {
            //// assets
                this.load.json('main_resources', main_resources);   
                this.load.json('map_resources', map_resources);  
                this.load.json('entity_resources', entity_resources);
                this.load.json('minigames_resources', minigames_resources);
            ////plugins
                this.load.plugin('rexvirtualjoystickplugin', JoyStick/* 'src/scripts/plugins/joystick.js' */, true);
        }
    //------------------------------- run preload scene
        create()
        {
            this.add.text(0, 0, '', { font: "1px Digitizer", fill: ''}).setAlpha(0);
            this.add.text(0, 0, '', { font: "1px Bangers", fill: ''}).setAlpha(0);
            this.time.delayedCall(500, ()=> {
                this.scene.run('Preload', this.data);
                this.scene.stop('Boot');
            });
        }
    }