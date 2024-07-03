const skin = () => {
    const img = new Image();
    img.src = '/models/spaceship.png';
    return img
}

/**
 * Represents a player's ship in the game.
 */
export default class Ship {

    /**
     * Creates a ship object.
     * @param {Object} params - The parameters for the ship object.
     * @param {number} params.x - The initial x-coordinate of the ship.
     * @param {number} params.y - The initial y-coordinate of the ship.
     * @param {number} params.width - The width of the ship.
     * @param {number} params.height - The height of the ship.
     * @param {number} params.speed - The speed of the ship.
     * @param {number} params.movementThreshold - The movement threshold of the ship.
     * @param {number} params.acceleration - The acceleration of the ship.
     * @param {number} params.shield - The shield strength of the ship.
     * @param {number} params.alpha - The transparency of the ship.
     */
    constructor(params) {
        this.x = params.x - params.width / 2;
        this.y = params.y - 40;
        this.width = params.width;
        this.height = params.height;
        this.speed = params.speed;
        this.movementThreshold = params.movementThreshold;
        this.acceleration = params.acceleration;
        this.shield = params.shield;
        this.alpha = params.alpha;
        this.velocityX = 0;
        this.velocityY = 0.2; // Initial velocity in the Y direction
        this.xAxis = 0;
        this.yAxis = 0;
        this.type = 'ship';
        this.skin = skin(); // Function call to get the ship's skin
    }

    /**
     * Updates the position of the ship based on user input.
     * @param {number} moveDirectionX - The direction of movement in the X-axis (-1 for left, 1 for right, 0 for no movement).
     * @param {number} moveDirectionY - The direction of movement in the Y-axis (-1 for up, 1 for down, 0 for no movement).
     * @param {number} moveCounterX - The counter for X-axis movement.
     * @param {number} moveCounterY - The counter for Y-axis movement.
     */
    update(moveDirectionX, moveDirectionY, moveCounterX, moveCounterY) {

        if (moveDirectionX === -1) {
            moveCounterX += 1500 * 10;
            if (moveCounterX >= this.movementThreshold) {
                this.velocityX -= this.acceleration;
            }
        } else if (moveDirectionX === 1) {
            moveCounterX += 1500 * 10;
            if (moveCounterX >= this.movementThreshold) {
                this.velocityX += this.acceleration;
            }
        } else {
            this.velocityX *= 0.9;
        }

        if (moveDirectionY === -1) {
            moveCounterY++;
            if (moveCounterY >= this.movementThreshold) {
                this.velocityY -= this.acceleration;
            }
        } else if (moveDirectionY === 1) {
            moveCounterY++;
            if (moveCounterY >= this.movementThreshold) {
                this.velocityY += this.acceleration;
            }
        } else {
            this.velocityY *= 0.9;
        }

        this.velocityX = Math.min(Math.max(this.velocityX, -this.speed), this.speed);
        this.velocityY = Math.min(Math.max(this.velocityY, -this.speed), this.speed);

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    /**
     * Draws the ship on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        if (this.alpha > 0) {
            ctx.drawImage(this.skin, this.x, this.y, this.width, this.height);
        }
    }
}
