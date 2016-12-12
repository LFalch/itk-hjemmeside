var KEYS = [];
var KEY = (function() {
    let obj = {
        add: function(name, keyCode) {
            let key = {};
            key.isDown = false;
            key.keyUp = null;

            KEY[name] = [keyCode];
            KEYS[keyCode] = key;
        },
        addAlias: function(keycode, name) {
            KEYS[keycode] = KEYS[this[name][0]];
            this[name].push(keycode);
        },
        isDown: function(key) {
            return KEYS[KEY[key][0]].isDown;
        }
    };
    window.addEventListener("keydown", function(e) {
        let key = KEYS[e.keyCode];
        if (key) {
            key.isDown = true;
            e.preventDefault();
        }
    }, false);
    window.addEventListener("keyup", function(e) {
        let key = KEYS[e.keyCode];
        if (key) {
            if (key.keyUp) key.keyUp();
            key.isDown = false;
            e.preventDefault();
        }
    }, false);

    return obj;
})();
// Define keys
KEY.add("w", 87);
KEY.add("a", 65);
KEY.add("s", 83);
KEY.add("d", 68);
KEY.addAlias(38, "w");
KEY.addAlias(40, "s");
KEY.addAlias(39, "d");
KEY.addAlias(37, "a");


// Canvas Size
const WIDTH = 1280;
const HEIGHT = 720;

var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
renderer.backgroundColor = 0xffffff;
document.getElementById("magi").appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader.add('icon', 'img/favicon.png');

function getTexture(name) {
    return new PIXI.Sprite(PIXI.loader.resources[name].texture);
}

var center = {x: WIDTH/2, y: HEIGHT/2};
var sprite;

var lastTs = null;
var deltaT = 0;

PIXI.loader.load(setup);

function setup() {
    sprite = getTexture('icon');
    sprite.t = -Math.PI/2;
    stage.addChild(sprite);
    loop();
}

const SPEED = .5;

function handle() {
    if (KEY.isDown("a"))
        center.x -= SPEED * deltaT;
    if (KEY.isDown("d"))
        center.x += SPEED * deltaT;
    if (KEY.isDown("w"))
        center.y -= SPEED * deltaT;
    if (KEY.isDown("s"))
        center.y += SPEED * deltaT;
    sprite.position.x = center.x + 3e2*Math.cos(sprite.t);
    sprite.position.y = center.y + 3e2*Math.sin(sprite.t);
    sprite.rotation = sprite.t+Math.PI/2;
    sprite.t += deltaT/2e3;
}


function loop(ts) {
    if (!lastTs) lastTs = ts;
    deltaT = ts - lastTs;
    lastTs = ts;
    requestAnimationFrame(loop); // calles itself 60hz
    if (deltaT) handle(); // where all the logic is
    renderer.render(stage); // renders whatever is on stage
}
