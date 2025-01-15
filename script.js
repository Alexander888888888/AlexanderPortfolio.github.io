const dynamicText = document.querySelector("#landingPage h2 .dynamicText");
const cursor = document.querySelector("#landingPage h2 .cursor");

const words = ["an aspiring Developer.", "a coding enthusiast.", "a problem solver.", "a website builder."];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    dynamicText.textContent = currentChar;

    // Pause cursor blinking during typing
    cursor.classList.add('paused');

    if (!isDeleting && charIndex < currentWord.length) {
        // Typing forward
        charIndex++;
        setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        // Switch mode: typing <-> deleting
        isDeleting = !isDeleting;
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;

        // Allow cursor to blink during the delay between words
        cursor.classList.remove('paused');
        setTimeout(typeEffect, 1200);
    }
};

typeEffect();


const elements = document.querySelectorAll('.animateOnScroll', '.shimmerOnScroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the element is in the viewport, add the 'show' class
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show'); // Removes class if out of view
        }
    });
});

elements.forEach(element => {
    observer.observe(element);
});


const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".navMenu");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
})