let slidePosition = 0;
const slides = document.getElementsByClassName('carousel-slide');
const totalSlides = slides.length;

document.getElementById('nextBtn').addEventListener("click", function() {
    moveToNextSlide();
});
document.getElementById('prevBtn').addEventListener("click", function() {
    moveToPrevSlide();
});

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item-visible');
        slide.classList.add('carousel-item-hidden');
    }

    slides[slidePosition].classList.add('carousel-item-visible');
}

updateSlidePosition();

function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    updateSlidePosition();
}

function moveToPrevSlide() {
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }

    updateSlidePosition();
}