
let canvasElmt = document.getElementById('gameCanvas')
canvasElmt.width = window.innerWidth
canvasElmt.height = window.innerHeight

function resizeCanvas() {
    canvasElmt.width = window.innerWidth;
    canvasElmt.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

export const canvas = canvasElmt
export const ctx = canvas.getContext('2d');

export let gameStates = {
    gameIsRunning: true,
    gameOver: false,
    points: 0,
    level: 1,
    home:true,
}

export function randomVal(min, max) {
    return Math.random() * (max - min) + min;
}

export function detectColision(aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) {
    
    return (
        aX < bX + bWidth &&
        aX + aWidth > bX &&
        aY < bY + bHeight &&
        aY + aHeight > bY
    );
}

export function addShipDamage(ship, nb, shipParams,pushnewBlast) {
    if (shipParams.damagesCooldown) {
        shipParams.damagesCooldown = false
        ship.shield = ship.shield - nb;
        updateShieldBar(ship,shipParams)
        flash(ship, 500);
        pushnewBlast(1, randomVal(ship.width, ship.width + 60), ship, 'white')
        setTimeout(() => {
            pushnewBlast(1, randomVal(ship.width, ship.width + 60), ship, 'blue')
        }, 100)

        console.log('lives : ' + ship.shield);
        if (ship.shield === 0) {
            gameStates.gameOver = true
            setTimeout(() => {
                ship.alpha = 0
                stopGame()
            }, 500)
        }
        setTimeout(() => {
            shipParams.damagesCooldown = true
        }, shipParams.cooldownThreshold)

    }
}

export function updateShieldBar(ship,shipParams){
    const shieldBar = document.querySelector('.shieldBar');
    let widthPercentage = (ship.shield / shipParams.shield) * 100;
    shieldBar.style.width = widthPercentage + '%';
    
}

export function flash(obj, timer) {

    let isVisible = true;
    obj.alpha = 0
    const intervalId = setInterval(() => {
        obj.alpha = isVisible ? 1 : 0;
        isVisible = !isVisible;
    }, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        obj.alpha = 1;
    }, timer);
}

export function screenLimits(ships) {
    if (ships[0].x + ships[0].width < 0) {
        ships[0].x = canvas.width - ships[0].width
    }
    if (ships[0].x - ships[0].width > canvas.width) {
        ships[0].x = 0 - ships[0].width
    }

    if (ships[0].y < 10) {
        ships[0].y = 10
    }

    if (ships[0].y + ships[0].height > canvas.height - 30) {
        ships[0].y = canvas.height - ships[0].height - 30
    }

}

export function addPoint() {
    const counter = document.getElementById('invadersCount')
    gameStates.points = gameStates.points + 1
    counter.innerText = gameStates.points
}

export function levelUp(level, constructor) {
    constructor(level * 2)
}

export function stopGame() {
    gameStates.gameIsRunning = false
    displayMenu()
}

export function play(gameStates) {
    const counter = document.getElementById('invadersCount')
    document.getElementById('menu').classList.remove('on')
    document.getElementById('livesCtn').classList.add('on')
    gameStates.gameIsRunning = true
    gameStates.points = 0
    counter.innerText = 0     
}

export function displayMenu() {
    document.getElementById('menu').classList.add('on')
    document.getElementById('livesCtn').classList.remove('on')
    if (gameStates.gameOver) {
        document.querySelector('.title').innerText = 'GAME OVER'
        document.querySelector('.message').innerText = 'Press enter to play again'
        console.log('game over');
    }
}

export function generateAsteroidsCloud(nb, asteroidsParams,bigAsteroidsParams, asteroids, Asteroids) {
    const canvas = document.getElementById('gameCanvas');
    const distance = asteroidsParams.groupRadius
    const mainPos = randomVal(0, canvas.width)

    for (let i = 0; i < nb; i++) {
        const xPos = randomVal(mainPos, mainPos + distance) - distance
        const yPos = - (canvas.height - randomVal(0, distance))
        if (i < randomVal(2, 5)) {
            asteroids.push(new Asteroids(bigAsteroidsParams, xPos, yPos))
        }
        asteroids.push(new Asteroids(asteroidsParams, xPos, yPos))

    }

}

export function rmControlsMenu(){
    const controls = document.querySelector('.controls')
    controls.classList.remove('on')
}

