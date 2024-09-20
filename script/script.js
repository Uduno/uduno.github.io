document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelectorAll('.competence_box');
    
    box.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('activeBox');
        })
    })

    const container = document.querySelector('.projet_container');

    function rotateLeft() {
    const front = container.querySelector('.front');
    const left = container.querySelector('.left');
    const right = container.querySelector('.right');

    front.classList.remove('front');
    front.classList.add('right');
    left.classList.remove('left');
    left.classList.add('front');
    right.classList.remove('right');
    right.classList.add('left');
    }

    function rotateRight() {
    const front = container.querySelector('.front');
    const left = container.querySelector('.left');
    const right = container.querySelector('.right');

    front.classList.remove('front');
    front.classList.add('left');
    left.classList.remove('left');
    left.classList.add('right');
    right.classList.remove('right');
    right.classList.add('front');
    }

    container.addEventListener('click', function(event) {
    const clickedItem = event.target.closest('.projet');
    if (clickedItem) {
        if (clickedItem.classList.contains('left')) {
        rotateLeft();
        } else if (clickedItem.classList.contains('right')) {
        rotateRight();
        }
    }
    });
})

