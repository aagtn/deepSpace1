import { medecines, ships } from "../constructor/constructor.js";
import { shipParams } from "../parameters/params.js";
import { canvas, detectColision, updateShieldBar } from "../utils/utils.js";

function getRandomPositionInCircle(centerX, centerY, radius) {
    const angle = Math.random() * 2 * Math.PI;
    const randomRadius = Math.sqrt(Math.random()) * radius;
    const x = Math.round(centerX + randomRadius * Math.cos(angle));
    const y = Math.round(centerY + randomRadius * Math.sin(angle));
    return { x: x, y: y };
}

/**
 * Represents this medecines particles in the game.
 */
class Particle {
    /**
     * Creates a particle.
     * @param {number} x - The initial x-coordinate of the particle.
     * @param {number} y - The initial y-coordinate of the particle.
     * @param {number} index - The index of the particle in the particles array.
     * @param {string} color - The color of the particle.
     * @param {string} type - The type of the particle.
     */
    constructor(x, y, index, color, type) {
        const radius = 10;
        this.radius = radius;
        this.index = index;
        this.x = getRandomPositionInCircle(x, y, radius).x;
        this.y = getRandomPositionInCircle(x, y, radius).y;
        this.targetX = getRandomPositionInCircle(x, y, radius).x;
        this.targetY = getRandomPositionInCircle(x, y, radius).y;
        this.speed = 0.9;
        this.maxSpeed = 0.9;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.type = type;
        this.size = 1;
        this.timestamp = 0;
        this.activeLife = 0;
        this.active = false; // Added property to indicate if the particle is active.
    }

    /**
     * Draws the particle on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fill();
    }

    /**
     * Linearly interpolates between two values.
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} t - The interpolation factor.
     * @returns {number} The interpolated value.
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    /**
     * Updates the position of the particle.
     * @param {number} x - The x-coordinate of the target.
     * @param {number} y - The y-coordinate of the target.
     * @param {number} index - The index of this particle in the particles array.
     * @param {number} lightSpeed - The speed of light in the game.
     */
    update(x, y, index, lightSpeed) {
        this.timestamp += 1;

        let dx = this.targetX - this.x;
        let dy = (this.targetY + 50) - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (this.active) {
            this.activeLife += 1;
            this.maxSpeed = 2;
            this.radius = 130;
            if (this.activeLife > 40) {
                this.maxSpeed = 6;
                this.radius = 0;
                this.targetX = ships[0].x + ships[0].width / 2;
                this.targetY = ships[0].y;
            }
        } else {
            this.timestamp < 100 ? this.maxSpeed = 2 : this.maxSpeed = 0.9;
            this.timestamp < 100 ? this.radius = 30 : this.radius = 10;
            lightSpeed > 0 ? this.maxSpeed = 5 : this.maxSpeed = 0.9;
        }

        if (distance >= 1) {
            dx /= distance;
            dy /= distance;

            this.vx = this.lerp(this.vx, dx * this.maxSpeed, 0.5);
            this.vy = this.lerp(this.vy, dy * this.maxSpeed, 0.5);

            this.x += this.vx;
            this.y += this.vy;
        }

        if (this.type === "slave" && distance < 1) {
            const randomPos = getRandomPositionInCircle(x, y, this.radius);
            this.targetX = randomPos.x;
            this.targetY = randomPos.y;
        }
    }
}

export default class Medecines {
    /**
     * Creates a medecines object.
     * @param {Object} params - The parameters for the medecines object.
     * @param {number} params.particlesCount - The number of particles.
     * @param {string} params.color - The color of the medecines.
     * @param {string} params.type - The type of the medecines.
     * @param {Object} target - The target object where the medecines will be placed.
     * @param {number} target.x - The x-coordinate of the target object.
     * @param {number} target.y - The y-coordinate of the target object.
     */
    constructor(params, target) {
        this.x = target.x;
        this.y = target.y;
        this.width = 10;
        this.height = 10;
        this.particlesCount = params.particlesCount;
        this.particles = [];
        for (let i = 0; i < this.particlesCount; i++) {
            this.particles.push(new Particle(target.x, target.y, i, params.color, params.type));
        }
    }

    /**
     * Updates the position of the medecines object and its particles.
     * @param {number} index - The index of this medecines object in the medecines array.
     * @param {number} lightSpeed - The speed of light in the game.
     */
    update(index, lightSpeed) {
        lightSpeed > 0 ? this.y += 5 : this.y += 0.9;

        this.particles.forEach((particle, index) => particle.update(this.x, this.y, index, lightSpeed));

        if (this.y > canvas.height + 50) {
            medecines.splice(index, 1);
        }
    }

    /**
     * Draws the medecines object and its particles on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }

    /**
     * Handles collisions between the medecines object and other objects.
     * @param {Array} ships - The array of ships to check for collisions.
     * @param {number} medIndex - The index of this medecines object in the medecines array.
     */
    colision(ships, medIndex) {
        ships.forEach((ship) => {
            const colision = detectColision(
                ship.x, ship.y, ship.width, ship.height,
                this.x, this.y, this.width, this.height
            );
            if (colision) {
                ship.shield = shipParams.shield;
                updateShieldBar(ship, shipParams);
                this.particles.forEach(particle => particle.active = true);

                let dx = this.x - ships[0].x;
                let dy = this.y - ships[0].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 50) {
                    medecines.splice(medIndex, 1);
                }
            }
        });
    }
}
