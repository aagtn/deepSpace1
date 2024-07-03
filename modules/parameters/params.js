import { canvas, randomVal } from "../utils/utils.js";

export const starsParams = {
    width: 1,
    color: "#ffff",
    speed:1,
    opacity: 1
}

export const invadersParams = {
    width: 40,
    height: 30,
    color: 'blue',
    speed: 3,
    opacity: 1,
    lazers: {
        width: 2,
        height: 10,
        color: 'red',
        speed: 3,
        opacity: 1,
        fireRates: 100,
        precision:10,
    }
}

export const shipParams = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 50,
    height: 65,
    speed: 10,
    movementThreshold: 1,
    acceleration: .2,
    alpha: 1,
    shield: 5,
    fireRate: 15,
    damagesCooldown:true,
    cooldownThreshold:1000,
    controls: {
        velocityX: 0,
        velocityY: .2,
        x: 0,
        y: 0,
    }
};

export const asteroidsParams = {
    minRadius: 1,
    maxRadius:15,
    color: 'grey',
    speed: 1,
    centerX:canvas.width / 2,
    centerY:canvas.height /2,
    groupRadius: randomVal(canvas.width / 5,canvas.width / 3), 
}

export const bigAsteroidsParams = {
    minRadius: 15,
    maxRadius:50,
    color: 'grey',
    speed: 1,
    centerX:canvas.width / 2,
    centerY:canvas.height /2,
    groupRadius: randomVal(canvas.width / 5,canvas.width / 3), 
}

export const blastParams = {
    alpha: 1,
    isExploding: true
}

export const shipLazersParams = {
    color: "#19f9e6",
    width: 2,
    height: 10,
}

export const blastParticlesParams = {
    color:'#ffff',
    radius:randomVal(1,1.1),
    particlesCount: 800
}

export const torpedoParams = {
    x: shipParams.x,
    y: shipParams.y,
    width: 5,
    height: 15,
    exploded: false,
    speed: 2,
    acceleration: 0.1,
    color: "#19f9e6"
}

export const medecinesParams = {
    color : "#00ff72",
    type : "slave",
    particlesCount : 80
}

