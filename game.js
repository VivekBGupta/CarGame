let scorebar = document.querySelector('.bar-score')
let score = document.querySelector('.score')
let backgournd_grass = document.querySelector('.background-grass')
let gamescreen = document.querySelector('.gamescreen')
let startscreen = document.querySelector('.background-car')
let  highest = document.querySelector('.highest-score')
let restart = document.querySelector('.restart')
startscreen.addEventListener('click', startgame)
console.log(score)
restart.addEventListener('click', startgame)
let navbar = document.querySelector('.top-bar')

let name = document.querySelector('.name')
let playerName = localStorage.getItem("username")
let data = JSON.parse(playerName)
name.innerText = `${data.username}`;

let player = {
    speed: 6,
    score: 0
}

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
        
    })
}
function endGame() {
    player.start = false;
    // startscreen.classList.remove('hide');

    restart.classList.remove('hide')
    // backgournd_grass.classList.add('hide')
}

function moveCar(car) {
    let other = document.querySelectorAll('.other');
    other.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log('HIT');
            endGame();
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';

    })
}
function gamePlay() {
    let car = document.querySelector('.car');
    let road = gamescreen.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveCar(car);
        if (keys.ArrowUp && player.y > (road.top-50)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 180)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 60)) {
            player.x += player.speed;
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        //console.log(player.score++);
        player.score++;
        if (player.score >= highest) {
            highest = player.score;
        }
        score.innerText = `${player.score}`
        scorebar.innerText = `${player.score}`
        highest.innerText =  `${player.score}`;


    }

}
function startgame() {
    restart.classList.add('hide')
    // navbar.style.display = "block";
    startscreen.classList.add('hide')
    backgournd_grass.classList.remove('hide')
    // restart.classList.add('hide')
    // gamescreen.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);



    for (x = 0; x < 5; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + 'px';
        gamescreen.appendChild(roadline);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gamescreen.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (x = 0; x < 3; x++) {
        let othercar = document.createElement('div');
        othercar.setAttribute('class', 'other');
        othercar.y = ((x + 1) * 350) * -1;
        othercar.style.top = othercar.y + 'px';
        othercar.style.left = Math.floor(Math.random() * 350) + 'px';
        gamescreen.appendChild(othercar);
    }
}