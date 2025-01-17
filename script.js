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

// Helper function to apply active color
function setActiveColor() {
    burger.querySelectorAll(".bar").forEach(bar => {
        bar.style.backgroundColor = "#c084fc";
    });
}

// Helper function to reset color
function resetColor() {
    burger.querySelectorAll(".bar").forEach(bar => {
        bar.style.backgroundColor = "#ddd";
    });
}

// Function to handle behavior based on screen size
function handleBurgerClick() {
    const isSmallScreen = window.matchMedia("(max-width: 1000px)").matches;

    if (isSmallScreen) {
        // Small screen: Toggle active and set color
        burger.classList.toggle("active");
        navMenu.classList.toggle("active");

        if (burger.classList.contains("active")) {
            setActiveColor();
            enableClickAway();
        } else {
            resetColor();
            disableClickAway();
        }
    } else {
        // Large screen: Maintain hover behavior
        if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            navMenu.classList.remove("active");
            resetColor();
        } else {
            burger.classList.add("active");
            navMenu.classList.add("active");
            setActiveColor();
        }
    }
}

function handleOutsideClick(event) {
    if (!burger.contains(event.target) && !navMenu.contains(event.target)) {
        burger.classList.remove("active");
        navMenu.classList.remove("active");
        resetColor();
        disableClickAway(); // Remove the event listener after closing
    }
}

// Enable the "click-away" functionality
function enableClickAway() {
    document.addEventListener("click", handleOutsideClick); // Add event listener to document
}

// Disable the "click-away" functionality
function disableClickAway() {
    document.removeEventListener("click", handleOutsideClick); // Remove event listener from document
}

// Hover behavior for large screens
burger.addEventListener("mouseover", () => {
    if (!burger.classList.contains("active")) {
        setActiveColor();
    }
});

burger.addEventListener("mouseout", () => {
    if (!burger.classList.contains("active")) {
        resetColor();
    }
});

// Click behavior for all screens
burger.addEventListener("click", handleBurgerClick);