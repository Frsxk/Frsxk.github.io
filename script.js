// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Typing Animation for Hero Section
const typedTextElement = document.getElementById('typed-text');
const textsToType = ['frxskie', 'a Cutie', 'a Developer', 'a Student', 'a Dreamer', 'a Smol Cat'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of text
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typingDelay = 500;
    }

    setTimeout(typeText, typingDelay);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Intersection Observer for scroll animations (replays every time)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is visible - animate in
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            // Element is not visible - reset animation
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Separate favorite cards and project cards
    const favoriteCards = document.querySelectorAll('.favorite-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Animate favorite cards with their own delays
    favoriteCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        const delay = index * 0.15; // 150ms between each favorite card
        el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        observer.observe(el);
    });
    
    // Animate project cards with their own delays
    projectCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        const delay = index * 0.15; // 150ms between each project card
        el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        observer.observe(el);
    });
});

// Particles Background Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset particle when it goes off screen
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width || this.x < 0) {
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(236, 72, 153, ${this.opacity})`; // Pastel pink color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particlesArray = [];
const numberOfParticles = 100;

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

// Start particle animation
initParticles();
animateParticles();

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-accent-500', 'dark:text-accent-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-accent-500', 'dark:text-accent-400');
        }
    });
});

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Status Fetching from GitHub Gist
const STATUS_URL = 'https://gist.githubusercontent.com/Frsxk/7d053c0c47b8374d73c114f71797b3ff/raw/a91b9ed4fdb3c07bd7ebb1612dce8477649ca7c6/status.txt';
const STATUS_REFRESH_INTERVAL = 60000; // Refresh every 60 seconds

async function fetchStatusFromPastebin() {
    const statusText = document.getElementById('status-text');
    const statusLoading = document.getElementById('status-loading');
    
    try {
        // Show loading state
        statusText.classList.add('hidden');
        statusLoading.classList.remove('hidden');
        statusLoading.classList.add('flex');
        
        // Add cache busting to get fresh content
        const response = await fetch(STATUS_URL + '?t=' + Date.now());
        
        if (!response.ok) {
            throw new Error('Failed to fetch status');
        }
        
        const statusMessage = await response.text();
        
        // Update the status text
        statusText.textContent = statusMessage.trim() || 'you\'re cute 💕';
        statusText.classList.remove('hidden');
        statusText.classList.add('status-bubble-enter');
        statusLoading.classList.add('hidden');
        statusLoading.classList.remove('flex');
        
    } catch (error) {
        console.error('Error fetching status:', error);
        statusText.textContent = 'you\'re cute 💕';
        statusText.classList.remove('hidden');
        statusLoading.classList.add('hidden');
        statusLoading.classList.remove('flex');
    }
}

// Fetch status on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchStatusFromPastebin();
    
    // Refresh status periodically
    setInterval(fetchStatusFromPastebin, STATUS_REFRESH_INTERVAL);
});
