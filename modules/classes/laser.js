import { canvas,detectColision,addShipDamage,randomVal } from "../utils/utils.js";
import { invaderLazers,pushnewBlast } from "../constructor/constructor.js";
import { shipParams } from "../parameters/params.js";


/**
 * Represents a laser object in the game.
 */
export default class Laser {
    /**
     * Creates a laser.
     * @param {Object} params - The parameters for the laser.
     * @param {number} params.x - The x-coordinate of the laser.
     * @param {number} params.y - The y-coordinate of the laser.
     * @param {number} params.width - The width of the invader.
     * @param {number} params.height - The height of the invader.
     * @param {number} params.laserWidth - The width of the laser.
     * @param {number} params.laserHeight - The height of the laser.
     * @param {string} params.laserColor - The color of the laser.
     * @param {number} params.speed - The speed of the invader.
     * @param {number} params.lazerSpeed - The speed of the laser.
     * @param {number} params.laserOpacity - The opacity of the laser.
     */
    constructor(params) {
        this.x = params.x + params.width / 2;
        this.y = params.y + params.height;
        this.width = params.laserWidth;
        this.height = params.laserHeight;
        this.color = params.laserColor;
        this.invadersSpeed = params.speed;
        this.speed = params.lazerSpeed;
        this.opacity = params.laserOpacity;
        this.type = 'lazer';
    }

    /**
     * Updates the laser's position.
     * @param {number} lazerPos - The current position of the laser.
     * @param {number} index - The index of this laser in the lasers array.
     * @param {number} lightSpeed - The speed of light in the game.
     */
    update(lazerPos, index, lightSpeed) {
        this.y += this.invadersSpeed + this.speed + lightSpeed;
        if (lazerPos > canvas.height) {
            invaderLazers.splice(index, 1);
        }
    }

    /**
     * Draws the laser on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1.0;
    }

    /**
     * Checks for collisions with other objects.
     * @param {Array} obj - The array of objects to check for collisions.
     * @param {number} lazersIndex - The index of this laser in the lasers array.
     */
    colision(obj, lazersIndex) {
        obj.forEach((elmt) => {
            const colision = detectColision(
                elmt.x, elmt.y, elmt.width, elmt.height,
                this.x, this.y, this.width, this.height
            );

            if (colision && elmt.type === "ship") {
                addShipDamage(elmt, 1, shipParams, pushnewBlast);
            }

            if (colision && elmt.type === "asteroids") {
                invaderLazers.splice(lazersIndex, 1);
            }
        });
    }
}
