
class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.radius = size;
        this.color = color;
        this.alpha = 1;
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 10 + 1;
        this.speedX = Math.cos(angle) * speed; // Horizontal speed
        this.speedY = Math.sin(angle) * speed; // Vertical speed
        this.life = Math.random() * 60 + 10; // Random lifetime
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01; // Fade out effect

        this.life--;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha; // Apply alpha for fading effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    isAlive() {
        return this.life > 0 && this.alpha > 0;
    }
}

/**
 * Represents a collection of particles created during a blast.
 */
export default class BlastParticles {
    /**
     * Creates a collection of blast particles.
     * @param {Object} params - The parameters for the blast particles.
     * @param {number} params.particlesCount - The number of particles to create.
     * @param {number} params.radius - The radius of each particle.
     * @param {string} params.color - The color of the particles.
     * @param {Object} target - The target object from which the particles originate.
     * @param {number} target.x - The x-coordinate of the target.
     * @param {number} target.y - The y-coordinate of the target.
     * @param {number} target.width - The width of the target.
     * @param {number} target.height - The height of the target.
     */
    constructor(params, target) {
        this.x = target.x + target.width / 2;
        this.y = target.y + target.height / 2;
        this.particlesCount = params.particlesCount;
        this.particles = [];
        for (let i = 0; i < this.particlesCount; i++) {
            this.particles.push(new Particle(this.x, this.y, params.radius, params.color));
        }
    }

    /**
     * Updates the state of the particles.
     */
    update() {
        this.particles = this.particles.filter(particle => particle.isAlive());
        this.particles.forEach(particle => particle.update());
    }

    /**
     * Draws the particles on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }
}
