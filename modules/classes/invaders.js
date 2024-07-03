import { canvas,detectColision,addShipDamage } from "../utils/utils.js";
import { shipParams } from "../parameters/params.js";
import { invaders,pushnewBlast } from "../constructor/constructor.js";


const invaderSkin = () => {
    const img = new Image();
    img.src = './models/invader.png';
    return img
}


/**
 * Represents an invader object in the game.
 */
export default class Invader {
    /**
     * Creates an invader.
     * @param {Object} params - The parameters for the invader.
     * @param {number} params.width - The width of the invader.
     * @param {number} params.height - The height of the invader.
     * @param {string} params.color - The color of the invader.
     * @param {number} params.opacity - The opacity of the invader.
     * @param {number} params.speed - The speed of the invader.
     * @param {Object} params.lazers - The parameters for the invader's lasers.
     * @param {number} params.lazers.width - The width of the lasers.
     * @param {number} params.lazers.height - The height of the lasers.
     * @param {number} params.lazers.speed - The speed of the lasers.
     * @param {string} params.lazers.color - The color of the lasers.
     * @param {number} params.lazers.opacity - The opacity of the lasers.
     * @param {number} params.lazers.fireRates - The fire rates of the lasers.
     * @param {number} params.lazers.precision - The precision of the lasers.
     */
    constructor(params) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.width = params.width;
        this.height = params.height;
        this.color = params.color;
        this.opacity = params.opacity;
        this.speed = params.speed;
        this.laserWidth = params.lazers.width;
        this.laserHeight = params.lazers.height;
        this.laserY = this.y + params.height;
        this.lazerSpeed = params.lazers.speed;
        this.laserColor = params.lazers.color;
        this.laserOpacity = params.lazers.opacity;
        this.fireRates = params.lazers.fireRates;
        this.type = 'invader';
        this.precision = params.lazers.precision;
        this.skin = invaderSkin();
    }

    /**
     * Updates the invader's position.
     * @param {number} lightSpeed - The speed of the light in the game.
     */
    update(lightSpeed) {
        this.y += this.speed + (lightSpeed / 2);
        if (this.y > canvas.height) {
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * -canvas.height;
        }
    }

    /**
     * Checks for collisions with other objects.
     * @param {Array} obj - The array of objects to check for collisions.
     * @param {number} index - The index of this invader in the invaders array.
     */
    colision(obj, index) {
        obj.forEach((obj) => {
            const colision = detectColision(
                obj.x, obj.y, obj.width, obj.height,
                this.x, this.y, this.width, this.height
            );
            if (colision) {
                addShipDamage(obj, 1, shipParams, pushnewBlast);
                if (shipParams.damagesCooldown) {
                    invaders.splice(index, 1);
                }
            }
        });
    }

    /**
     * Draws the invader on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.skin, this.x, this.y, this.width, this.height);
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x + (this.width / 2) - 1, this.y + this.height - 15, 2, 7);
    }
}
