const carousel = document.getElementById('carousel');
const totalSlides = carousel.children.length;
let index = 0;

function updateSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlide();
}

// Geser otomatis setiap 4 detik
setInterval(() => {
  nextSlide();
}, 4000);

 function togglePopover() {
    const popover = document.getElementById('my-popover');
    popover.classList.toggle('hidden');
  }