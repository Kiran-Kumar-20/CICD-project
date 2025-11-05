// Update build number on page load
document.addEventListener('DOMContentLoaded', function() {
    // Simulate checking system status
    checkSystemStatus();

    // Add current timestamp
    const buildInfo = document.getElementById('build-number');
    const now = new Date();
    buildInfo.textContent = `v1.0.0 - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add button click effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

function checkSystemStatus() {
    console.log('System Status: All services running');
    console.log('Docker Desktop: Connected');
    console.log('WSL2 Backend: Active');
    console.log('Web Server: Nginx');
    console.log('CI/CD: Jenkins');
}

// Handle any external link clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        console.log('Opening external link:', e.target.href);
    }
});

// Check if Jenkins is accessible
function checkJenkinsStatus() {
    // This is a simple check - in production you'd want proper health checks
    console.log('Jenkins should be accessible at http://localhost:8080/jenkins');
}

// Add animation to feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
