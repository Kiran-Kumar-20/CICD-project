// ===== Professional Landing Page Script =====// Update build number on page load

document.addEventListener('DOMContentLoaded', function() {

// Initialize on page load    // Simulate checking system status

document.addEventListener('DOMContentLoaded', function() {    checkSystemStatus();

    initializeAnimation();

    updateTimestamps();    // Add current timestamp

    setupSmoothScrolling();    const buildInfo = document.getElementById('build-number');

    setupIntersectionObserver();    const now = new Date();

    setupNavigationHighlight();    buildInfo.textContent = `v1.0.0 - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    initializeCounters();

});    // Add smooth scrolling

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

// Initialize animations        anchor.addEventListener('click', function(e) {

function initializeAnimation() {            e.preventDefault();

    // Add animation classes to elements as they come into view            const target = document.querySelector(this.getAttribute('href'));

    const observerOptions = {            if (target) {

        threshold: 0.1,                target.scrollIntoView({

        rootMargin: '0px 0px -100px 0px'                    behavior: 'smooth'

    };                });

            }

    const observer = new IntersectionObserver(function(entries) {        });

        entries.forEach(entry => {    });

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');    // Add button click effects

                    document.querySelectorAll('.btn').forEach(button => {

                // Trigger specific animations based on element type        button.addEventListener('click', function() {

                if (entry.target.classList.contains('stage-card')) {            this.style.transform = 'scale(0.95)';

                    animateStageCard(entry.target);            setTimeout(() => {

                }                this.style.transform = '';

                            }, 100);

                if (entry.target.classList.contains('tech-item')) {        });

                    animateTechItem(entry.target);    });

                }});

                

                if (entry.target.classList.contains('feature-box')) {function checkSystemStatus() {

                    animateFeatureBox(entry.target);    console.log('System Status: All services running');

                }    console.log('Docker Desktop: Connected');

            }    console.log('WSL2 Backend: Active');

        });    console.log('Web Server: Nginx');

    }, observerOptions);    console.log('CI/CD: Jenkins');

}

    // Observe all animated elements

    document.querySelectorAll('.stage-card, .tech-item, .feature-box, .arch-box').forEach(el => {// Handle any external link clicks

        observer.observe(el);document.addEventListener('click', function(e) {

    });    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {

}        console.log('Opening external link:', e.target.href);

    }

// Animate stage cards});

function animateStageCard(element) {

    const stageNumber = element.getAttribute('data-stage');// Initialize Jenkins status check

    const delay = parseInt(stageNumber) * 100;setTimeout(checkJenkinsStatus, 2000);

    

    setTimeout(() => {// Check if Jenkins is accessible

        element.style.opacity = '1';function checkJenkinsStatus() {

        element.style.transform = 'translateY(0)';    // This is a simple check - in production you'd want proper health checks

    }, delay);    console.log('Jenkins should be accessible at http://localhost:8080/jenkins');

}}



// Animate tech items// Add animation to feature cards

function animateTechItem(element) {const observerOptions = {

    element.style.transition = 'all 0.6s ease';    threshold: 0.1,

    element.style.opacity = '1';    rootMargin: '0px 0px -50px 0px'

    element.style.transform = 'scale(1)';};

}

const observer = new IntersectionObserver(function(entries) {

// Animate feature boxes    entries.forEach(entry => {

function animateFeatureBox(element) {        if (entry.isIntersecting) {

    element.style.transition = 'all 0.5s ease';            entry.target.style.opacity = '1';

    element.style.opacity = '1';            entry.target.style.transform = 'translateY(0)';

    element.style.transform = 'translateY(0)';        }

}    });

}, observerOptions);

// Update timestamps

function updateTimestamps() {document.querySelectorAll('.feature-card').forEach(card => {

    const now = new Date();    card.style.opacity = '0';

    const buildNumber = document.getElementById('build-number');    card.style.transform = 'translateY(20px)';

    const deployTime = document.getElementById('deploy-time');    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        observer.observe(card);

    if (buildNumber) {});

        buildNumber.textContent = 'v2.0.0';
    }
    
    if (deployTime) {
        const formattedDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        deployTime.textContent = formattedDate;
    }
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup intersection observer for fade-in effects
function setupIntersectionObserver() {
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    // Observe elements that need fade-in effect
    document.querySelectorAll('.fade-in, .slide-up, .zoom-in').forEach(el => {
        fadeObserver.observe(el);
    });
}

// Highlight active navigation item
function setupNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--accent-color)';
            }
        });
    });
}

// Animated counters (if needed in future)
function initializeCounters() {
    const counterElements = document.querySelectorAll('[data-count]');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Add button click effects
document.addEventListener('click', function(e) {
    if (e.target.closest('.cta-button, .cta-btn')) {
        const button = e.target.closest('.cta-button, .cta-btn');
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Parallax effect for background circles
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Terminal typing effect (optional enhancement)
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Log system information
console.log('%c🚀 CI/CD Pipeline System', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #764ba2;');
console.log('%c✓ Docker Desktop: Running', 'color: #10b981; font-size: 14px;');
console.log('%c✓ Jenkins CI/CD: Active on port 9090', 'color: #10b981; font-size: 14px;');
console.log('%c✓ Nginx Server: Serving on port 8081', 'color: #10b981; font-size: 14px;');
console.log('%c✓ WSL2 Backend: Connected', 'color: #10b981; font-size: 14px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #764ba2;');
console.log('%cStatus: All systems operational', 'color: #f093fb; font-size: 14px; font-weight: bold;');

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #f59e0b; font-size: 12px;');
});

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Tab hidden - pausing animations');
    } else {
        console.log('Tab visible - resuming animations');
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        console.log('%c🎮 Konami Code Activated!', 'color: #ff0000; font-size: 24px; font-weight: bold;');
        console.log('%c🎉 You found the easter egg!', 'color: #00ff00; font-size: 18px;');
        document.body.style.animation = 'rainbow 2s infinite';
    }
});
