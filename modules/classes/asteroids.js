import { randomVal,addShipDamage } from "../utils/utils.js";
import { asteroids,invaders } from "../constructor/constructor.js";
import { canvas,detectColision } from "../utils/utils.js";
import { pushnewBlast } from "../constructor/constructor.js";
import { shipParams } from "../parameters/params.js";

const asteroidsSkin = () => {
    const img = new Image()
            img.src = "/models/asteroids/" + Math.round(randomVal(1,13)) + '.png' ;
            return img
}

/**
 * Represents an asteroid in the game.
 */
export default class Asteroids {
    /**
     * Creates an asteroid.
     * @param {Object} params - The parameters for the asteroid.
     * @param {number} params.minRadius - The minimum radius of the asteroid.
     * @param {number} params.maxRadius - The maximum radius of the asteroid.
     * @param {string} params.color - The color of the asteroid.
     * @param {number} params.speed - The base speed of the asteroid.
     * @param {number} x - The initial x position of the asteroid.
     * @param {number} y - The initial y position of the asteroid.
     */
    constructor(params, x, y) {
        this.x = x;
        this.y = y;
        this.radius = randomVal(params.minRadius, params.maxRadius);
        this.width = this.radius;
        this.height = this.radius;
        this.color = params.color;
        this.speed = Math.random() * params.speed + params.speed;
        this.fragments = [];
        this.type = 'asteroids';
        this.angle = 0;
        this.active = true;
        this.life = this.width / 2;
        this.skin = asteroidsSkin();
        this.index = asteroids.length + 1;
    }

    /**
     * Updates the asteroid's position and state.
     * @param {number} lightSpeed - The speed of light in the game, affecting the asteroid's movement.
     * @param {number} index - The index of the asteroid in the asteroids array.
     */
    update(lightSpeed, index) {
        this.y += this.speed + lightSpeed;
        this.angle += 1 / 40;

        if (this.y - this.radius > canvas.height + 1000) {
            asteroids.splice(index, 1);
        }

        this.fragments.forEach((fragment, index) => {
            fragment.y += fragment.speed;
            fragment.lifetime -= 1;
            if (fragment.lifetime < 0) {
                this.fragments.splice(index, 1);
            }
        });

        if (this.y > 0) {
            this.angle += 1 / 20;
        }

        if (this.y > canvas.height + this.height) {
            asteroids.splice(index, 1);
        }
    }

    /**
     * Handles collision detection and effects with ships.
     * @param {Array} ships - The array of ships in the game.
     */
    colision(ships) {
        ships.forEach((ship, index) => {
            const colision = detectColision(
                ship.x, ship.y, ship.width, ship.height,
                this.x, this.y, this.radius, this.radius
            );
            if (colision && ship.type === "ship" && this.active) {
                addShipDamage(ship, 1, shipParams, pushnewBlast);
            }

            if (colision && ship.type === "invader") {
                pushnewBlast(1, randomVal(10, 150), ship, 'white');
                this.speed += 1;
                invaders.splice(index, 1);
                for (let i = 0; i < 100; i++) {
                    this.fragments.push({
                        radius: randomVal(0, this.width / 20),
                        x: this.x,
                        y: randomVal(this.y - 10, this.y - this.height),
                        lifetime: 500,
                        speed: randomVal(0.1, this.speed),
                    });
                }
            }
        });
    }

    /**
     * Draws the asteroid and its fragments on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        this.fragments.forEach((fragment) => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(fragment.x, fragment.y, fragment.radius / 2, 0, 2 * Math.PI);
            ctx.fill();
        });
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.skin, -this.width, -this.height, this.width * 2, this.height * 2);
        ctx.restore();
    }
}
