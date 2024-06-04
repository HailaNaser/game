
let money = "money";
let  countMoney = 10;
let container = document.querySelector(".container");
let  PLAYER = document.querySelector(".player");
let playerPos = {
  x: 0,
  y: 0,
};
let playerVel = {
  x: 0,
  y: 0,
};
let PLAYER_SPEED = 1.8;
let  START_PLAYER_POS = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

let SOUND = new Audio("./coin.mp3");

function start() {

  generateRondomElements(money, countMoney);
  playerPos = START_PLAYER_POS;
}

function update() {
  playerPos.x += playerVel.x;
  playerPos.y += playerVel.y;
  PLAYER.style.left = playerPos.x + "px";
  PLAYER.style.top = playerPos.y + "px";

  checkCollisions();

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    playerVel.y = -1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('./player_front.png')";
  }
  if (e.key == "ArrowDown") {
    playerVel.y = 1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('./player_back.png')";
  }
  if (e.key == "ArrowLeft") {
    playerVel.x = -1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('./player_left.png')";
  }
  if (e.key == "ArrowRight") {
    playerVel.x = 1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('./player_right.png')";
  }
  PLAYER.classList.add("walk");
});

window.addEventListener("keyup", (e) => {
  playerVel.x = 0;
  playerVel.y = 0;

  PLAYER.classList.remove("walk");
});

function generateRondomElements(className, elementCount) {
  for (let count = 0; count < elementCount; count++) {
    let newElement = document.createElement("div");
    newElement.classList.add(className);
    newElement.style.left = Math.random() * 100 + "%";
    newElement.style.top = Math.random() * 100 + "%";
    document.body.appendChild(newElement);
  }
}


function collision(div1, div2) {
  var rect1 = div1.getBoundingClientRect();
  var rect2 = div2.getBoundingClientRect();

  var left1 = rect1.left;
  var top1 = rect1.top;
  var height1 = div1.clientHeight;
  var width1 = div1.clientWidth;
  var bottom1 = top1 + height1;
  var right1 = left1 + width1;

  var left2 = rect2.left;
  var top2 = rect2.top;
  var height2 = div2.clientHeight;
  var width2 = div2.clientWidth;
  var bottom2 = top2 + height2;
  var right2 = left2 + width2;

  if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) return false;
  return true;
}

start();
update();


let secondLimit = 21;
let timer = function () {
  let startTimer = setInterval(()=> {
    secondLimit-=1;
    document.querySelector('.num-timer').innerHTML = secondLimit;
    let cir = document.querySelector(".timer").classList.add('animatable');
    if(secondLimit == 0){
      clearInterval(startTimer)
    }
  }, 1000)


}
timer()
 
let collectMony = 0;
let result= 0;
function checkCollisions() {
  let culcalate = document.createElement("div");
  container.appendChild(culcalate)
  let allMoney = document.querySelectorAll(".money");
  allMoney.forEach((el , index) => {
    if (collision(el, PLAYER)) {
      el.style.display = "none";
      el.remove()
      SOUND.play();

    }
    let hidden = setInterval(()=> {
      el.style.display = "none"
      // result+=3;
      // result++;
      // console.log(result)
    }, (index+1) * 20000)

  });
}

let count = 0;

function createPopup() {
    let allMoney = document.querySelectorAll(".money");
    console.log(allMoney);
    let containerTime = document.querySelector('.num-timer');

    let openPopup = () => {
        let popup = document.querySelector(".popup");
        popup.style.display = "block";
        let box = document.querySelector(".pup-small");
        box.textContent = "Time's up! Try again.";
        // box.className = "pup-small";
        document.querySelector(".main-heading").style.display = "block";
        let btn = document.createElement("button");
        btn.className = "close";
        btn.textContent = "click here";
        popup.appendChild(btn);
        btn.addEventListener("click", () => {
            location.reload();
        });
    };

    let interval = setInterval(() => {
        openPopup();
        count++;
        if (count === 3) {
            clearInterval(interval);
            console.log("3time");
        }
    }, 20000);
}

createPopup();
