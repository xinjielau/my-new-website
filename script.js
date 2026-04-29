// Button Click Action for Join the Movement
document.getElementById("ctaButton").addEventListener("click", function() {
    // Smooth scroll to a section (if you want to scroll to a specific part of the page)
    window.scrollTo({
        top: document.querySelector("#activities").offsetTop,  // Change to your desired section
        behavior: "smooth"
    });
    
    // Optionally, redirect to the signup page after a slight delay for the scroll effect
    setTimeout(function() {
        window.location.href = "https://shepower.com/join";  // Redirects to the signup page
    }, 1000); // 1-second delay
});
