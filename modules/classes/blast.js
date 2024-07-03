import { blasts } from "../constructor/constructor.js";
import { ctx } from "../utils/utils.js";


/**
 * Represents a blast or explosion in the game.
 */
export default class Blast {
    /**
     * Creates a blast.
     * @param {Object} blastParams - The parameters for the blast.
     * @param {number} blastParams.alpha - The initial alpha value (transparency) of the blast.
     * @param {boolean} blastParams.isExploding - Whether the blast is currently exploding.
     * @param {number} radius - The initial radius of the blast.
     * @param {Object} ship - The ship object from which the blast originates.
     * @param {number} ship.x - The x-coordinate of the ship.
     * @param {number} ship.y - The y-coordinate of the ship.
     * @param {number} ship.width - The width of the ship.
     * @param {number} ship.height - The height of the ship.
     * @param {string} color - The color of the blast.
     * @param {string} type - The type of the blast (e.g., "torpedo").
     */
    constructor(blastParams, radius, ship, color, type) {
        this.x = ship.x + (ship.width / 2);
        this.y = ship.y + (ship.height / 2);
        this.radius = radius;
        this.alpha = blastParams.alpha;
        this.isExploding = blastParams.isExploding;
        this.color = color;
        this.type = type;
    }

    /**
     * Updates the blast's state.
     * @param {number} index - The index of the blast in the blasts array.
     */
    update(index) {
        if (this.isExploding) {
            this.alpha -= this.type === "torpedo" ? 0.025 : 0.05;
            this.radius += 2;
            if (this.alpha <= 0) {
                this.isExploding = false;
                this.radius = 0;
                ctx.globalAlpha = 1;
                blasts.splice(index, 1);
            }
        }
    }

    /**
     * Draws the blast on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        blasts.forEach((blast, index) => {
            if (blast.isExploding) {
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(blast.x, blast.y, blast.radius, 0, Math.PI * 2);
                ctx.lineWidth = 10;
                ctx.strokeStyle = blast.color;
                ctx.fillStyle = blast.color;
                if (index === 1) {
                    ctx.fill();
                }
                ctx.stroke();
                ctx.closePath();
                blast.update(index);
            } else {
                blasts.splice(index, 1);
            }
        });
    }
}
