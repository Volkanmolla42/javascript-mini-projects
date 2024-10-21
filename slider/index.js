const slides = document.querySelectorAll(".slides img");

let slideIndex = 0;
let intervalID = null;

document.addEventListener("DOMContentLoaded", showSlide());

function showSlide() {
  clearInterval(intervalID);
  slides[slideIndex].classList.add("displaySlide");
  intervalID = setInterval(nextSlide, 5000);
}

function prevSlide() {
  if (slideIndex > 0) {
    slideIndex--;
    slides[slideIndex + 1].classList.remove("displaySlide");
    showSlide();
  }
}

function nextSlide() {
  if (slideIndex < slides.length - 1) {
    slideIndex++;
    slides[slideIndex - 1].classList.remove("displaySlide");
    showSlide();
  }
}
