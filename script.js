// Simple scroll animation for navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Button click feedback
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Button clicked: ' + btn.innerText);
    });
});
