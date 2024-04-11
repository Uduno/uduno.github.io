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


