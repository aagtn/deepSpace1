import { detectColision,randomVal,addPoint } from "../utils/utils.js";
import { shipLazersA,shipLazersB,invaders,pushnewBlast,pushnewBlastParticles,asteroids,pushNewMedecine } from "../constructor/constructor.js";



/**
 * Represents left ship lasers fired by the player.
 */
export class ShipLazersL {

    /**
     * Creates left ship lasers.
     * @param {Object} params - The parameters for the left ship lasers.
     * @param {number} params.x - The initial x-coordinate of the ship lasers.
     * @param {number} params.y - The initial y-coordinate of the ship lasers.
     * @param {Object} shipLazersParams - The parameters specific to ship lasers.
     * @param {number} shipLazersParams.width - The width of the ship lasers.
     * @param {number} shipLazersParams.height - The height of the ship lasers.
     * @param {string} shipLazersParams.color - The color of the ship lasers.
     */
    constructor(params, shipLazersParams) {
        this.x = params.x + 5;
        this.y = params.y + 20;
        this.width = shipLazersParams.width;
        this.height = shipLazersParams.height;
        this.color = shipLazersParams.color;
        this.type = 'lazer';
    }

    /**
     * Updates the position of the ship lasers.
     */
    update() {
        this.y -= 10;
    }

    /**
     * Draws the ship lasers on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     * @param {number} index - The index of the ship lasers in the array.
     */
    draw(ctx, index) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.y < 0) {
            shipLazersA.splice(index, 1);
        }
    }

    /**
     * Handles collision detection with other game objects.
     * @param {Array} obj - The array of game objects to check for collision.
     * @param {number} lazerIndex - The index of the ship lasers in the array.
     */
    colision(obj, lazerIndex) {
        obj.forEach((obj, index) => {
            const colision = detectColision(
                obj.x, obj.y, obj.width, obj.height,
                this.x, this.y, this.width, this.height
            );
            if (colision) {

                if (obj.type === "invader") {
                    invaders.splice(index, 1);
                    pushnewBlast(1, randomVal(10, 150), obj, index === 1 ? 'green' : "red");
                    setTimeout(() => {
                        pushnewBlast(1, randomVal(10, 150), obj, 'white');
                    }, 100);
                    addPoint();
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

                    pushnewBlast(1, randomVal(1, 5), this, 'white');

                    obj.life = obj.life - 1;
                    if (obj.life < 0) {
                        pushnewBlast(1, randomVal(obj.width, obj.width + 60), obj, 'white');
                        setTimeout(() => {
                            pushnewBlastParticles(1, obj);
                            pushnewBlast(1, randomVal(obj.width, obj.width + 60), obj, 'white');
                            asteroids.splice(index, 1);
                            pushNewMedecine(1, obj);
                        }, 100);
                    }

                }
                shipLazersA.splice(lazerIndex, 1);
            }
        });
    }
}


/**
 * Represents right ship lasers fired by the player.
 */
export class ShipLazersR {

    /**
     * Creates right ship lasers.
     * @param {Object} params - The parameters for the right ship lasers.
     * @param {number} params.x - The initial x-coordinate of the ship lasers.
     * @param {number} params.y - The initial y-coordinate of the ship lasers.
     * @param {Object} shipLazersParams - The parameters specific to ship lasers.
     * @param {number} shipLazersParams.width - The width of the ship lasers.
     * @param {number} shipLazersParams.height - The height of the ship lasers.
     * @param {string} shipLazersParams.color - The color of the ship lasers.
     */
    constructor(params, shipLazersParams) {
        this.x = params.x + params.width - 7;
        this.y = params.y + 20;
        this.width = shipLazersParams.width;
        this.height = shipLazersParams.height;
        this.color = shipLazersParams.color;
        this.type = 'lazer';
    }

    /**
     * Updates the position of the ship lasers.
     */
    update() {
        this.y -= 10;
    }

    /**
     * Draws the ship lasers on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     * @param {number} index - The index of the ship lasers in the array.
     */
    draw(ctx, index) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.y < 0) {
            shipLazersB.splice(index, 1);
        }
    }

    /**
     * Handles collision detection with other game objects.
     * @param {Array} obj - The array of game objects to check for collision.
     * @param {number} lazerIndex - The index of the ship lasers in the array.
     */
    colision(obj, lazerIndex) {
        obj.forEach((obj, index) => {
            const colision = detectColision(
                obj.x, obj.y, obj.width, obj.height,
                this.x, this.y, this.width, this.height
            );
            if (colision) {

                if (obj.type === "invader") {
                    invaders.splice(index, 1);
                    pushnewBlast(1, randomVal(10, 150), obj, index === 1 ? 'green' : "red");
                    setTimeout(() => {
                        pushnewBlast(1, randomVal(10, 150), obj, 'white');
                    }, 100);
                    addPoint();
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
                    pushnewBlast(1, randomVal(1, 5), this, 'white');
                    obj.life = obj.life - 1;
                    if (obj.life < 0) {
                        pushnewBlast(1, randomVal(obj.width, obj.width + 60), obj, 'white');
                        setTimeout(() => {
                            pushnewBlastParticles(1, obj);
                            pushnewBlast(1, randomVal(obj.width, obj.width + 60), obj, 'white');
                            asteroids.splice(index, 1);
                            pushNewMedecine(1, obj);
                        }, 100);
                    }
                }
                shipLazersB.splice(lazerIndex, 1);
            }
        });
    }
}
