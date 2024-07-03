import {canvas,ctx,randomVal,screenLimits,play,gameStates, levelUp, generateAsteroidsCloud} from "./modules/utils/utils.js";
import Laser from "./modules/classes/laser.js";
import { pushNewStars, stars, pushNewInvaders, invaders, invaderLazers, pushNewShip, ships, pushNewLazers, asteroids, blasts, shipLazersA, shipLazersB, blastParticle, torpedos,pushNewTorpedo,medecines } from "./modules/constructor/constructor.js";
import {asteroidsParams,bigAsteroidsParams, shipParams} from "./modules/parameters/params.js";
import Asteroids from "./modules/classes/asteroids.js";



/*
KEYBOARD CONTROLS
*/

let moveDirectionX = 0;
let moveDirectionY = 0;
let moveCounterX = 0;
let moveCounterY = 0;
let isSpacebarDown = false;
let isAkeyDown = false;
let distortion = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveDirectionX = -1;
    } else if (event.key === 'ArrowRight') {
        moveDirectionX = 1;
    }

    if (event.key === 'ArrowUp') {
        moveDirectionY = -1;
        
    } else if (event.key === 'ArrowDown') {
        moveDirectionY = 1;
    }

    if (event.key === ' ') {
        isSpacebarDown = true;
    }

    if(event.key === "d"){
        distortion = true
    }

    if (event.key === "a" ) {
        isAkeyDown = true
    }

    if (event.key === "Enter") {
        if(!gameStates.gameIsRunning){
            startGame();
            play(gameStates)
        }
        
        if(gameStates.gameOver){
            window.location.reload()
        }
        
    }

});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' && moveDirectionX === -1) {
        moveDirectionX = 0;
        moveCounterX = 0;
    }
    if (event.key === 'ArrowRight' && moveDirectionX === 1) {
        moveDirectionX = 0;
        moveCounterX = 0;
    }

    if (event.key === 'ArrowUp' && moveDirectionY === -1) {
        moveDirectionY = 0;
        moveCounterY = 0;
        //isArrowUp = false
    }
    if (event.key === 'ArrowDown' && moveDirectionY === 1) {
        moveDirectionY = 0;
        moveCounterY = 0;
    }

    if (event.key === ' ') {
        isSpacebarDown = false;
    }

    if(event.key === "d"){
        distortion = false
    }
});


/*
 INITIALISATOR
*/

pushNewStars(500)
pushNewInvaders(2)
pushNewShip(1)
setInterval(() => {
    if (gameStates.gameIsRunning) {
    generateAsteroidsCloud(randomVal(10,20),asteroidsParams,bigAsteroidsParams,asteroids,Asteroids)
    }
},5000)


/*
START THE GAME 
*/
startGame()
function startGame() {

    let bulletFireTimer = 0
    let lightSpeed = 0
    function gameLoop() {

        if (!gameStates.gameIsRunning) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isSpacebarDown) {
            bulletFireTimer += 1
            if (bulletFireTimer > shipParams.fireRate) {
                pushNewLazers(1)
                bulletFireTimer = 0
            }
        }

        if(isAkeyDown){
            pushNewTorpedo(1,ships[0])
            isAkeyDown = false
        }

        if(distortion){
            if(lightSpeed < 15){
            lightSpeed += 1
        }
        }else{
            if(lightSpeed > 0){
                lightSpeed -= 1
            }
        }

        stars.forEach(star => {
            star.update(lightSpeed);
            star.draw(ctx);
        });

        ships.forEach((ship) => {
            ship.update(moveDirectionX, moveDirectionY, moveCounterX, moveCounterY)
            ship.draw(ctx)
        })

        invaders.forEach((invader,index)=> {
            invader.update(lightSpeed)
            invader.colision(ships,index)
            invader.draw(ctx)
            if(invader.y > 0 &&
                Math.round(invader.x) - invader.precision <= Math.round(ships[0].x) 
                && Math.round(invader.x) + invader.precision >= Math.round(ships[0].x) 
            ){
                const laser = new Laser(invader);
                invaderLazers.push(laser);
            }
           
        })

        invaderLazers.forEach((lazer, index) => {
            lazer.update(lazer.y, index,lightSpeed)
            lazer.colision(ships)
            lazer.colision(asteroids,index)
            lazer.draw(ctx)
        })

        medecines.forEach((medecine,index)=>{
            medecine.draw(ctx)
            medecine.colision(ships,index)
            medecine.update(index,lightSpeed)
        })
            
        asteroids.forEach((asteroids,index) => {
            asteroids.update(lightSpeed,index)
            asteroids.colision(ships)
            asteroids.colision(invaders)
            asteroids.draw(ctx)
        })

        blasts.forEach((blast) => {
            blast.draw(ctx)
        })

        shipLazersA.forEach((lazer, index) => {
            lazer.update()
            lazer.colision(invaders)
            lazer.colision(asteroids,index)
            lazer.draw(ctx, index)
        })

        shipLazersB.forEach((lazer, index) => {
            lazer.update()
            lazer.colision(invaders)
            lazer.colision(asteroids,index)
            lazer.draw(ctx, index)
        })

        blastParticle.forEach((blast)=>{
            blast.update()
            blast.draw(ctx)
        })

        torpedos.forEach((torpedo,index)=>{
            torpedo.update(index,ships[0])
            torpedo.colision(invaders)
            torpedo.colision(asteroids)
            torpedo.draw(ctx,ships[0])
        })

        if(invaders.length === 0){            
            gameStates.level += 1
            levelUp(gameStates.level * 2, pushNewInvaders)
            
        }

        screenLimits(ships)

          
        requestAnimationFrame(gameLoop);
    }


    requestAnimationFrame(gameLoop);
}

