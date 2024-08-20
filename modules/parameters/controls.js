import { gameStates,rmControlsMenu,play } from "../utils/utils.js";
import { pushNewTorpedo,ships } from "../constructor/constructor.js";

export let moveDirectionX = 0;
export let moveDirectionY = 0;
export let moveCounterX = 0;
export let moveCounterY = 0;
export let isSpacebarDown = false;
export let isAkeyDown = false;
export let distortion = false;

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
        pushNewTorpedo(1,ships[0])
        isAkeyDown = false
    }

    if (event.key === "Enter") {
        if(gameStates.home){    
            rmControlsMenu()
            play(gameStates)
            gameStates.home = false
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

    if (event.key === "a") {
        isAkeyDown = false;  
    }
})

