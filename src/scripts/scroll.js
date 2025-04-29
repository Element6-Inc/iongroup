// Initialize the scroll to top button functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Function to check scroll position and show/hide button
    const toggleScrollBtn = () => {
        // Show button when user scrolls down 300px from the top
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.replace('opacity-0', 'opacity-100');
        } else {
            scrollToTopBtn.classList.replace('opacity-100', 'opacity-0');
        }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleScrollBtn);

    // Add click event for smooth scrolling to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check on page load
    toggleScrollBtn();
});