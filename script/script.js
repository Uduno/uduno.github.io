const card = document.querySelector(".card");
const frontCard = document.querySelector(".front_card");
const backCard = document.querySelector(".back_card");

card.addEventListener("mouseenter", () => {
    frontCard.style.marginTop = "-100%";
    backCard.style.top = "0";
    frontCard.style.transition = "0.5s ease-in-out";
    backCard.style.transition = "0.5s ease-in-out";
})

card.addEventListener("mouseleave", () => {
    frontCard.style.marginTop = "0";
    backCard.style.top = "100%";
})

card.addEventListener("click", () => {
    console.log("click");
    if (backCard.style.top == "100%") {
        backCard.style.top = "0";
        frontCard.style.marginTop = "-100%";
        frontCard.style.transition = "0.5s ease-in-out";
        backCard.style.transition = "0.5s ease-in-out";
    } else {
        backCard.style.top = "100%";
        backCard.style.transition = "0.5s ease-in-out";
        frontCard.style.top = "0%";
        frontCard.style.transition = "0.5s ease-in-out";
    }
    
})

const cnv = document.querySelector(".background");
const ctx = cnv.getContext("2d");
ctx.imageSmoothingEnabled= false;

const width = cnv.width = window.innerWidth;
const height = cnv.height = window.innerHeight;

const size = Math.min(width, height) / 10;
const start_pos = []
const direction = [];
for (let i = 0; i < 4; i++) {
    start_pos.push([Math.floor(Math.random() * (width - size) + size) , Math.floor(Math.random() * (height - size) + size)]); 
    direction.push([ Math.random() < 0.5 ? -1 : 1,  Math.random() < 0.5 ? -1 : 1]);   
}
const color = ["red", "blue", "green", "yellow"];
console.log(direction);



const draw = () => {
    ctx.clearRect(0, 0, width, height); 
    ctx.lineWidth = 8;

    // dessiner un rectangle
    ctx.beginPath();
    ctx.rect(start_pos[0][0], start_pos[0][1], size, size);
    ctx.stroke();
    ctx.strokeStyle = color[0];
    ctx.closePath();

    // dessiner un cercle
    ctx.beginPath();
    ctx.arc(start_pos[1][0], start_pos[1][1], size/2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = color[1];
    ctx.closePath();

    // dessiner une croix
    ctx.beginPath();
    ctx.moveTo(start_pos[2][0], start_pos[2][1]);
    ctx.lineTo(start_pos[2][0] - size, start_pos[2][1] - size);
    ctx.moveTo(start_pos[2][0] - size, start_pos[2][1]);
    ctx.lineTo(start_pos[2][0], start_pos[2][1] - size);
    ctx.stroke();
    ctx.strokeStyle = color[2];
    ctx.closePath();

    // dessiner un triangle
    ctx.beginPath();
    ctx.moveTo(start_pos[3][0], start_pos[3][1]);
    ctx.lineTo(start_pos[3][0] + size, start_pos[3][1] - size);
    ctx.lineTo(start_pos[3][0] - size, start_pos[3][1] - size);
    ctx.lineTo(start_pos[3][0], start_pos[3][1]);
    ctx.stroke();
    ctx.strokeStyle = color[3];
    ctx.closePath();

}


const moveAndCollide = () => {
    for (let i = 0; i < 4; i++) {
        start_pos[i][0] += direction[i][0] * 5;
        start_pos[i][1] += direction[i][1] * 5;
        if (start_pos[i][0] < 0 + size/2 || start_pos[i][0] > width - size/2) {
            direction[i][0] *= -1;
        }
        if (start_pos[i][1] < 0 + size/2 || start_pos[i][1] > height - size/2) {
            direction[i][1] *= -1;
        }
        
        for (let j = 0; j < 4; j++) {
            if (i != j) {
                if (Math.abs(start_pos[i][0] - start_pos[j][0]) < size && Math.abs(start_pos[i][1] - start_pos[j][1]) < size) {
                    direction[i][0] *= -1;
                    direction[i][1] *= -1;
                }
            }
        }
    }
}

function loop() {
    draw();
    moveAndCollide();
}

setInterval(loop, 10)