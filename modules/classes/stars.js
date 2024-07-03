import { randomVal,canvas } from "../utils/utils.js";


/**
 * Represents a star in the game.
 */
export default class Star {

    /**
     * Creates a star with random initial properties.
     * @param {Object} params - The parameters for the star.
     * @param {string} params.color - The primary color of the star.
     * @param {number} params.opacity - The initial opacity of the star.
     * @param {number} params.speed - The speed at which the star moves.
     */
    constructor(params) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.primaryColor = params.color;
        this.color = params.color;
        this.radius = Math.random();
        this.height = this.radius;
        this.opacity = params.opacity;
        this.speed = params.speed;
        this.wrapColors = ["080284", "071e8e", "063a98", "0556a2", "0472ac", "048fb5", "03abbf", "02c7c9", "01e3d3", "00ffdd", "ffff"];
        this.wrapColors = "#" + this.wrapColors[Math.floor(randomVal(0, this.wrapColors.length))];
    }

    /**
     * Updates the position and appearance of the star based on the game's light speed.
     * @param {number} lightSpeed - The current light speed of the game.
     */
    update(lightSpeed) {
        this.y += this.speed + lightSpeed;

        // Adjust opacity and color based on light speed
        if (lightSpeed > 0) {
            this.opacity = randomVal(0, 1);
            this.color = this.wrapColors;
        }

        if (lightSpeed === 0) {
            this.opacity = Math.random();
            this.color = this.primaryColor;
            this.height = this.radius;
        }

        this.height = this.height + (lightSpeed * 3);

        // Wrap star when it goes beyond canvas height
        if (this.y > canvas.height) {
            this.y = -this.radius;
            this.x = Math.random() * canvas.width;
        }
    }

    /**
     * Draws the star on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(this.x, this.y, this.radius, this.height);
        ctx.globalAlpha = 1.0;
    }
}
