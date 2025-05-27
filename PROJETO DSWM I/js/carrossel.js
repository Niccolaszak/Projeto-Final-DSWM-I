document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.carrossel .livro');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarrossel() {
        // Garante que currentIndex nunca passe dos limites
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        const offset = -currentIndex * 100;
        carrossel.style.transform = `translateX(${offset}%)`;
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarrossel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarrossel();
        });
    }

    setInterval(() => {
        currentIndex++;
        updateCarrossel();
    }, 15000);

    // Swipe mobile
    let startX = null;
    carrossel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    carrossel.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }
            updateCarrossel();
        }
        startX = null;
    });
});