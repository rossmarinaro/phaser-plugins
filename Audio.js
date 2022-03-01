/* AUDIO */


export class Audio {
    constructor() 
    {
        this.noAudio = false;
        this.default = false;
        this.sound = null;
        this.cached = [];
        this.music = {
            track: '',
            fadeIn: (src, vol, scene) => {
                for (let music of scene.sound.sounds) 
                    if (music.key === Config.config.audio.music.track) 
                        scene.tweens.add({ targets: music, volume: { value: 0, ease: 'Power1', duration: 500 }});
                let obj = scene.sound.add(src).setLoop(true).setVolume(0);
                scene.tweens.add({ targets: obj, volume: { value: vol, ease: 'Power1', duration: 3000}, onStart: ()=> obj.play()});
            },
            fadeOut: (src, vol, scene) => {
                for (let music of scene.sound.sounds) 
                {
                    if (music.key === src)
                    { 
                        scene.tweens.add({targets: music, volume: { value: 0, ease: 'Power1', duration: 3000 },  
                        onComplete: () => {
                            Config.config.audio.music.play(scene);
                            scene.tweens.add({ targets: music, volume: { value: vol, ease: 'Power1', duration: 3000 }})
                            music.stop();
                            scene.sound.removeByKey(music); 
                        }});
                    }
                }
            },
            play: scene =>{ 
                new Promise(res =>{
                    switch (scene.data.config.currentStage)
                    {
                        case 'Middle Yeast' : case 'Meatball Mountain' : Config.config.audio.music.track = 'middle_pastern'; break;
                        case 'Lab' : case 'Arcade' : Config.config.audio.music.track = 'pastaboss_theme'; break;
                        case 'Pub' : case 'SushiBar' : case 'Cafe' : case 'WeaponShack' : case 'Pawn Shop' : Config.config.audio.music.track = 'level1'; break;
                        case 'Freezer' : case 'Leaning Tower Of Pizza' : Config.config.audio.music.track ='mushroompizza'; break;
                        case 'Scone Beach' : case 'Beercano' : Config.config.audio.music.track = 'pastafari'; break;
                        case 'Red Sea' : case 'Carb Kingdom' : Config.config.audio.music.track ='level2'; break;
                        case 'Fish Town' : case 'Greater GraterVille' : Config.config.audio.music.track ='lv2ext'; break;
                        case 'The Oven' : case 'Tunnel' : Config.config.audio.music.track ='al_electro'; break;
                        case 'Cotton Candy Clouds' : case 'Tomb' : case 'pinball' : Config.config.audio.music.track ='phryg1'; break;
                        case 'Swanky Franks' : case 'Flukrainian Club' : Config.config.audio.music.track = 'minimal'; break;
                        case 'Strip Club' : case 'Sushi Restaurant' : Config.config.audio.music.track = 'pastahouse'; break;
                        case 'Herb Garden' : case 'Crucif Forest' : Config.config.audio.music.track = 'creepy'; break;
                        case 'Bubble_MiniGame' : Config.config.audio.music.track = 'minigame1_audio'; break;
                        case '?' : case 'Fun House' : Config.config.audio.music.track = 'fight_players'; break; //racing mini game
                    }
                    res();
                }).then(()=> {
                    let src = scene.sound.add(Config.config.audio.music.track).setLoop(true);
                    src.play();
                })
            }
        };
    };
    play (src, vol, loop, scene, detune) 
    {
        Config.config.audio.cached.push(src);
        Config.config.audio.cached.filter(e => { 
        Config.config.audio.sound = scene.sound.add(src).setLoop(loop).setVolume(vol).setDetune(detune);
    //if sound is already in cache, remove it
            if (e.toString() === src) 
                Config.config.audio.cached.pop(src);
            Config.config.audio.sound.play();  
        });
    }
    stop (src, scene) 
    { 
        for (let snd of scene.sound.sounds) 
            if (snd.key == src) 
                snd.stop();
    }
}