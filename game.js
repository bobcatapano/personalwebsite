const FPS = 30; // frames per second
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const ROID_NUM = 3; // starting number of asteroids
const ROID_SIZE = 100; // starting size of asteroids in pixels
const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ROID_VERT = 10; // average number of vertices on each asteroid
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const SHIP_TURN_SPD = 360; // turn speed in degrees per second
const SHOW_BOUNDING = false; // show or hide collision bounding
const SHOW_CENTRE_DOT = false; // show or hide ship's centre dot
var bullets = [];
const BULLET_SPEED = 500; // pixels per second
const BULLET_LIFE = 60;   // frames bullets last (2 seconds at 30 FPS)
const ROID_LARGE = 100;
const ROID_MEDIUM = 50;
const ROID_SMALL = 25;



/** @type {HTMLCanvasElement} */
var canv = document.getElementById("gameCanvas");
var ctx = canv.getContext("2d");

// set up the spaceship object
var ship = newShip();

// set up asteroids
var roids = [];
createAsteroidBelt();

// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// set up the game loop
setInterval(update, 1000 / FPS);

function shootBullet() {
    // only shoot if ship is not exploding
    if (ship.explodeTime > 0) return;

    // create the bullet object
    bullets.push({
        x: ship.x + 4/3 * ship.r * Math.cos(ship.a),
        y: ship.y - 4/3 * ship.r * Math.sin(ship.a),
        xv: BULLET_SPEED * Math.cos(ship.a) / FPS,
        yv: -BULLET_SPEED * Math.sin(ship.a) / FPS,
        life: BULLET_LIFE
    });
}


function createAsteroidBelt() {
    roids = [];
    var x, y;
    for (var i = 0; i < ROID_NUM; i++) {
        // random asteroid location (not touching spaceship)
        do {
            x = Math.floor(Math.random() * canv.width);
            y = Math.floor(Math.random() * canv.height);
        } while (distBetweenPoints(ship.x, ship.y, x, y) < ROID_SIZE * 2 + ship.r);
        roids.push(newAsteroid(x, y, ROID_LARGE));
    }
}

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function explodeShip() {
    ship.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
}

function keyDown(/** @type {KeyboardEvent} */ ev) {
    switch(ev.keyCode) {
        case 37: // left arrow (rotate ship left)
            ship.rot = SHIP_TURN_SPD / 180 * Math.PI / FPS;
            break;
        case 38: // up arrow (thrust the ship forward)
            ship.thrusting = true;
            break;
        case 39: // right arrow (rotate ship right)
            ship.rot = -SHIP_TURN_SPD / 180 * Math.PI / FPS;
            break;
        case 32: // spacebar
            shootBullet();
            break;

    }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
    switch(ev.keyCode) {
        case 37: // left arrow (stop rotating left)
            ship.rot = 0;
            break;
        case 38: // up arrow (stop thrusting)
            ship.thrusting = false;
            break;
        case 39: // right arrow (stop rotating right)
            ship.rot = 0;
            break;
    }
}

function newAsteroid(x, y, size = ROID_LARGE) {
    var roid = {
        x: x,
        y: y,
        xv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        a: Math.random() * Math.PI * 2,
        r: size / 2,
        offs: [],
        vert: Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2)
    };

    for (var i = 0; i < roid.vert; i++) {
        roid.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
    }

    return roid;
}


function newShip() {
    return {
        x: canv.width / 2,
        y: canv.height / 2,
        a: 90 / 180 * Math.PI, // convert to radians
        r: SHIP_SIZE / 2,
        blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
        blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
        explodeTime: 0,
        rot: 0,
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
    }
}

function resolveAsteroidCollision(a1, a2) {
    const dx = a2.x - a1.x;
    const dy = a2.y - a1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const nx = dx / dist;
    const ny = dy / dist;

    const tx = -ny;
    const ty = nx;

    const dpTan1 = a1.xv * tx + a1.yv * ty;
    const dpTan2 = a2.xv * tx + a2.yv * ty;

    const dpNorm1 = a1.xv * nx + a1.yv * ny;
    const dpNorm2 = a2.xv * nx + a2.yv * ny;

    const m1 = dpNorm2;
    const m2 = dpNorm1;

    a1.xv = tx * dpTan1 + nx * m1;
    a1.yv = ty * dpTan1 + ny * m1;
    a2.xv = tx * dpTan2 + nx * m2;
    a2.yv = ty * dpTan2 + ny * m2;

    const overlap = 0.5 * (a1.r + a2.r - dist + 0.1);
    a1.x -= overlap * nx;
    a1.y -= overlap * ny;
    a2.x += overlap * nx;
    a2.y += overlap * ny;
}


function update() {
    var blinkOn = ship.blinkNum % 2 == 0;
    var exploding = ship.explodeTime > 0;

    // draw space
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    // draw the asteroids
    var a, r, x, y, offs, vert;
    for (var i = 0; i < roids.length; i++) {
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = SHIP_SIZE / 20;

        // get the asteroid properties
        a = roids[i].a;
        r = roids[i].r;
        x = roids[i].x;
        y = roids[i].y;
        offs = roids[i].offs;
        vert = roids[i].vert;

        // draw the path
        ctx.beginPath();
        ctx.moveTo(
            x + r * offs[0] * Math.cos(a),
            y + r * offs[0] * Math.sin(a)
        );

        // draw the polygon
        for (var j = 1; j < vert; j++) {
            ctx.lineTo(
                x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        // show asteroid's collision circle
        if (SHOW_BOUNDING) {
            ctx.strokeStyle = "lime";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        }
    }

    // thrust the ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

        // draw the thruster
        if (!exploding && blinkOn) {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = SHIP_SIZE / 10;
            ctx.beginPath();
            ctx.moveTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
            );
            ctx.lineTo( // rear centre (behind the ship)
                ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
            );
            ctx.lineTo( // rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    } else {
        // apply friction (slow the ship down when not thrusting)
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    // draw the triangular ship
    if (!exploding) {
        if (blinkOn) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = SHIP_SIZE / 20;
            ctx.beginPath();
            ctx.moveTo( // nose of the ship
                ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
                ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
            );
            ctx.lineTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
            );
            ctx.lineTo( // rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.stroke();
        }

        // handle blinking
        if (ship.blinkNum > 0) {

            // reduce the blink time
            ship.blinkTime--;

            // reduce the blink num
            if (ship.blinkTime == 0) {
                ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                ship.blinkNum--;
            }
        }
    } else {
        // draw the explosion (concentric circles of different colours)
        ctx.fillStyle = "darkred";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
        ctx.fill();
    }

    // show ship's collision circle
    if (SHOW_BOUNDING) {
        ctx.strokeStyle = "lime";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    // show ship's centre dot
    if (SHOW_CENTRE_DOT) {
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    }

    // check for asteroid collisions (when not exploding)
    if (!exploding) {

        // only check when not blinking
        if (ship.blinkNum == 0) {
            for (var i = 0; i < roids.length; i++) {
                if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
                    explodeShip();
                }
            }
        }

        // rotate the ship
        ship.a += ship.rot;

        // move the ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;
    } else {
        // reduce the explode time
        ship.explodeTime--;

        // reset the ship after the explosion has finished
        if (ship.explodeTime == 0) {
            ship = newShip();
        }
    }

    // handle edge of screen
    if (ship.x < 0 - ship.r) {
        ship.x = canv.width + ship.r;
    } else if (ship.x > canv.width + ship.r) {
        ship.x = 0 - ship.r;
    }
    if (ship.y < 0 - ship.r) {
        ship.y = canv.height + ship.r;
    } else if (ship.y > canv.height + ship.r) {
        ship.y = 0 - ship.r;
    }

    // move the asteroids
    for (var i = 0; i < roids.length; i++) {
        roids[i].x += roids[i].xv;
        roids[i].y += roids[i].yv;

        // handle asteroid edge of screen
        if (roids[i].x < 0 - roids[i].r) {
            roids[i].x = canv.width + roids[i].r;
        } else if (roids[i].x > canv.width + roids[i].r) {
            roids[i].x = 0 - roids[i].r
        }
        if (roids[i].y < 0 - roids[i].r) {
            roids[i].y = canv.height + roids[i].r;
        } else if (roids[i].y > canv.height + roids[i].r) {
            roids[i].y = 0 - roids[i].r
        }
    }
    // move and draw bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];

        // move the bullet
        b.x += b.xv;
        b.y += b.yv;

        // draw the bullet
        ctx.fillStyle = "salmon";
        ctx.beginPath();
        ctx.arc(b.x, b.y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
        ctx.fill();

        // reduce bullet life
        b.life--;

        // remove bullet if life ends or goes offscreen
        if (
            b.life <= 0 ||
            b.x < 0 || b.x > canv.width ||
            b.y < 0 || b.y > canv.height
        ) {
            bullets.splice(i, 1);
        }
    }
    // check for bullet-asteroid collisions
    for (let i = roids.length - 1; i >= 0; i--) {
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (distBetweenPoints(bullets[j].x, bullets[j].y, roids[i].x, roids[i].y) < roids[i].r) {
                // destroy the bullet
                bullets.splice(j, 1);

                // split the asteroid
                if (roids[i].r == ROID_LARGE) {
                    roids.push(newAsteroid(roids[i].x, roids[i].y, ROID_MEDIUM));
                    roids.push(newAsteroid(roids[i].x, roids[i].y, ROID_MEDIUM));
                } else if (roids[i].r == ROID_MEDIUM) {
                    roids.push(newAsteroid(roids[i].x, roids[i].y, ROID_SMALL));
                    roids.push(newAsteroid(roids[i].x, roids[i].y, ROID_SMALL));
                }

                // destroy the asteroid
                roids.splice(i, 1);
                break;
            }
        }
    }


}