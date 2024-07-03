import { torpedos, invaders, asteroids } from "../constructor/constructor.js";
import { detectColision, randomVal, addPoint } from "../utils/utils.js";
import { pushnewBlast, pushnewBlastParticles, pushNewMedecine } from "../constructor/constructor.js";
import { torpedoParams } from "../parameters/params.js";

/**
 * Represents a torpedo fired from the ship.
 */
export default class Torpedo {

    /**
     * Creates a torpedo object.
     * @param {Object} params - The parameters for the torpedo.
     * @param {number} params.width - The width of the torpedo.
     * @param {number} params.height - The height of the torpedo.
     * @param {number} params.speed - The initial speed of the torpedo.
     * @param {number} params.acceleration - The acceleration of the torpedo.
     * @param {string} params.color - The color of the torpedo.
     */
    constructor(params, ship) {
        this.x = ship.x + (ship.width / 2) - 2;
        this.y = ship.y + 8;
        this.width = params.width;
        this.height = params.height;
        this.speed = params.speed;
        this.acceleration = params.acceleration;
        this.color = params.color;
        this.particles = [];
    }

    /**
     * Updates the position of the torpedo.
     * @param {number} index - The index of the torpedo in the array.
     */
    update(index) {
        this.y -= this.speed;
        this.speed += this.acceleration;
        if (this.y < 0) {
            torpedos.splice(index, 1);
        }
    }

    /**
     * Draws the torpedo and its particles.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - 1, this.y - 20, this.width, this.height);

        let newParticle = new TorpdoParticle((this.x + this.width / 2) - 1, this.y + this.height, this.color);
        this.particles.push(newParticle);

        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(ctx);
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    /**
     * Handles collision detection and actions when the torpedo collides with objects.
     * @param {Object[]} obj - The array of objects to check collision against.
     * @param {number} torpedoIndex - The index of the torpedo in the array.
     */
    colision(obj, torpedoIndex) {
        obj.forEach((obj, index) => {
            const colision = detectColision(
                obj.x, obj.y, obj.width, obj.height,
                this.x, this.y, this.width, this.height
            );

            if (colision) {
                const explosionRadius = 350;
                const explosionRadiusB = 150;

                if (obj.type === "invader") {
                    invaders.splice(index, 1);
                    pushnewBlast(1, randomVal(80, 250), obj, index === 1 ? 'green' : "red");
                    setTimeout(() => {
                        pushnewBlast(1, randomVal(100, 350), obj, torpedoParams.color);
                        pushnewBlast(1, randomVal(100, 350), obj, 'white');
                    }, 100);
                    addPoint();

                    for (let i = invaders.length - 1; i >= 0; i--) {
                        let invader = invaders[i];
                        let distance = Math.sqrt(Math.pow(invader.x - obj.x, 2) + Math.pow(invader.y - obj.y, 2));
                        if (distance < explosionRadius) {
                            setTimeout(() => {
                                pushnewBlast(1, randomVal(80, 250), obj, index === 1 ? 'red' : "white");
                                invaders.splice(i, 1);
                                addPoint();
                            }, 10 * i);
                        }
                    }
                }

                if (obj.type === "asteroids") {
                    for (let i = 0; i < 40; i++) {
                        obj.fragments.push({
                            radius: randomVal(0, obj.width / 20),
                            x: this.x,
                            y: randomVal(this.y - 10, this.y - this.height),
                            lifetime: 500,
                            speed: randomVal(0.1, obj.speed),
                        });
                    }

                    pushnewBlast(1, randomVal(obj.width, obj.width + explosionRadius), obj, torpedoParams.color);
                    setTimeout(() => {
                        pushnewBlastParticles(1, obj);
                        pushnewBlast(1, randomVal(obj.width, obj.width + 60), obj, 'white');
                    }, 100);

                    pushNewMedecine(1, obj);
                    asteroids.splice(index, 1);

                    for (let i = asteroids.length - 1; i > 0; i--) {
                        const asteroid = asteroids[i];
                        const distance = Math.sqrt(Math.pow(asteroid.x - obj.x, 2) + Math.pow(asteroid.y - obj.y, 2));
                        if (distance < explosionRadiusB) {
                            const index = i;
                            setTimeout(() => {
                                pushnewBlastParticles(1, asteroid);
                                asteroids.splice(index, 1);
                            }, i);
                        }
                    }
                }

                torpedos.splice(torpedoIndex, 1);
            }
        });
    }
}

/**
 * Represents a particle emitted from a torpedo explosion.
 */
class TorpdoParticle {

    /**
     * Creates a torpedo particle.
     * @param {number} x - The initial x-coordinate of the particle.
     * @param {number} y - The initial y-coordinate of the particle.
     * @param {string} color - The color of the particle.
     */
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 0.5 + 1;
        this.alpha = 1;
        this.fadeRate = Math.random() * 0.02 + 0.01;
    }

    /**
     * Updates the particle's alpha (transparency).
     */
    update() {
        this.alpha -= this.fadeRate;
    }

    /**
     * Draws the particle on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}


