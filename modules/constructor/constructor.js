import { starsParams,invadersParams,shipParams,shipLazersParams,blastParams,blastParticlesParams,torpedoParams, medecinesParams,asteroidsParams } from "../parameters/params.js";
import { canvas } from "../utils/utils.js";
import Star from "../classes/stars.js";
import Invader from "../classes/invaders.js";
import Asteroids from "../classes/asteroids.js";
import Ship from "../classes/ship.js";
import Blast from "../classes/blast.js";
import { ShipLazersL,ShipLazersR } from "../classes/shipLazers.js";
import BlastParticles from "../classes/blastParticle.js";
import Torpedo from "../classes/torpedo.js";
import Medicines from "../classes/medecine.js";

export const stars = []
export function pushNewStars(nb) {
    for (let i = 0; i < nb; i++) {
        stars.push(new Star(starsParams,canvas));
    }
}

export const invaders = []
export function pushNewInvaders(nb) {
    for (let i = 0; i < nb; i++) {
        invaders.push(new Invader(invadersParams,canvas))
    }
}

export const invaderLazers = []


export const asteroids = []
export function pushNewAsteroids(nb) {
    for (let i = 0; i < nb; i++) {
        asteroids.push(new Asteroids(asteroidsParams,i))
    }
}


export const ships = []
export function pushNewShip(nb) {
    for (let i = 0; i < nb; i++) {
        ships.push(new Ship(shipParams))
    }
}

export const blasts = []
export function pushnewBlast(nb,radius, obj, color, type) {
    for (let i = 0; i < nb; i++) {
        blasts.push(new Blast(blastParams,radius, obj, color,type))
    }
}

export const shipLazersA = []
export const shipLazersB = []
export function pushNewLazers(nb) {
    for (let i = 0; i < nb; i++) {
        shipLazersA.push(new ShipLazersL(ships[0], shipLazersParams, "left"))
        shipLazersB.push(new ShipLazersR(ships[0], shipLazersParams, "right"))
    }
}

export const blastParticle = []
export function pushnewBlastParticles(nb,obj) {
    for (let i = 0; i < nb; i++) {
        blastParticle.push(new BlastParticles(blastParticlesParams,obj))
    }
}

export const torpedos = []
export function pushNewTorpedo(nb,obj){
    for (let i = 0; i < nb; i++) {
        torpedos.push(new Torpedo(torpedoParams,obj))
    }
}

export const medecines = []
export function pushNewMedecine(nb,obj){
    if(Math.random() < .5){
        medecines.push(new Medicines(medecinesParams,obj))
    }
}