document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Interactive Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button, summary');

    if (window.innerWidth > 992) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            target.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });
    }

    // --- 2. Dark/Light Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- 3. Typewriter Effect ---
    const typeTextSpan = document.querySelector('.type-text');
    const textArray = ["无限可能", "闪耀光芒", "无所畏惧", "改变世界"];
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (typeTextSpan) {
            if (charIndex < textArray[textArrayIndex].length) {
                typeTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }
    }

    function erase() {
        if (charIndex > 0) {
            typeTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if (typeTextSpan && textArray.length) setTimeout(type, newTextDelay);

    // --- 4. Holographic 3D Tilt with Glare ---
    const tiltElement = document.querySelector('[data-tilt]');
    const glare = document.querySelector('.glare');
    
    if(tiltElement && window.innerWidth > 992) {
        tiltElement.addEventListener('mousemove', (e) => {
            const rect = tiltElement.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const xAxis = (rect.width / 2 - x) / 20;
            const yAxis = (rect.height / 2 - y) / 20;
            tiltElement.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            if (glare) glare.style.transform = `translate(${glareX - 100}%, ${glareY - 100}%)`;
        });

        tiltElement.addEventListener('mouseleave', () => {
            tiltElement.style.transform = `rotateY(0deg) rotateX(0deg)`;
            if (glare) glare.style.transform = `translate(-100%, -100%)`; 
        });
    }

    // --- 5. Magnetic Buttons ---
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', function(e) {
            const position = magnet.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            magnet.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        magnet.addEventListener('mouseleave', function() {
            magnet.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 6. Animated Number Counters ---
    const counters = document.querySelectorAll('.counter');
    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / 150;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); 
            }
        });
    };
    const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // --- 7. Scroll Reveal Animations ---
    const faders = document.querySelectorAll('.fade-in, .fade-in-up');
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- 8. Interactive Button Ripple Effect ---
    const rippleButtons = document.querySelectorAll('.ripple-btn, .btn-primary');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // --- 9. Contact Modal Logic ---
    const modal = document.getElementById('contact-modal');
    const triggers = document.querySelectorAll('.join-us-trigger');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && triggers.length > 0) {
        triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
