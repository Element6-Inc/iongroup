document.addEventListener('DOMContentLoaded', function() {
  // Initialize Swiper WITHOUT autoplay
  var swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    allowTouchMove: true,
    
    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
  
  // Get the pagination dots
  var dots = document.querySelectorAll('.pagination-dot');
  
  // Track the current group (0 or 1)
  var currentGroup = 0;
  var totalGroups = dots.length;
  var slidesPerGroup = 3;
  
  // Autoplay timer reference
  var autoplayTimer = null;
  
  // Function to update active dot
  function updateActiveDot() {
    // Update all dots
    for (var i = 0; i < dots.length; i++) {
      if (i === currentGroup) {
        dots[i].classList.add('active');
      } else {
        dots[i].classList.remove('active');
      }
    }
  }
  
  // Function to go to a specific group
  function goToGroup(groupIndex) {
    // Update current group
    currentGroup = groupIndex;
    
    // Move swiper to the first slide of the group
    var slideIndex = groupIndex * slidesPerGroup;
    swiper.slideTo(slideIndex);
    
    // Update dots
    updateActiveDot();
  }
  
  // Function to implement autoplay
  function autoplayNext() {
    // Move to next group with wrap-around
    var nextGroup = (currentGroup + 1) % totalGroups;
    goToGroup(nextGroup);
  }
  
  // Function to check if device is mobile
  function isMobileDevice() {
    return window.innerWidth < 640 || 
           navigator.maxTouchPoints > 0 ||
           /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Function to start autoplay (only on non-mobile devices)
  function startAutoplay() {
    // First check if we're on mobile
    if (isMobileDevice()) {
      // Don't autoplay on mobile
      stopAutoplay();
      return;
    }
    
    // Clear any existing timer
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
    
    // Set new timer
    autoplayTimer = setInterval(autoplayNext, 3000);
  }
  
  // Function to stop autoplay
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  // Add click handlers to dots
  for (var i = 0; i < dots.length; i++) {
    (function(index) {
      dots[index].addEventListener('click', function() {
        // Stop autoplay temporarily
        stopAutoplay();
        
        // Go to the selected group
        goToGroup(index);
        
        // Restart autoplay (if not mobile)
        if (!isMobileDevice()) {
          startAutoplay();
        }
      });
    })(i);
  }
  
  // Listen for slide changes from manual interaction
  swiper.on('slideChange', function() {
    // Calculate current group based on active slide
    var newGroup = Math.floor(swiper.activeIndex / slidesPerGroup);
    
    // Only update if the group has changed
    if (newGroup !== currentGroup) {
      currentGroup = newGroup;
      updateActiveDot();
    }
  });
  
  // Initialize with first dot active
  updateActiveDot();
  
  // Start autoplay (if not mobile)
  startAutoplay();
  
  // Handle window resize events to toggle autoplay based on screen size
  window.addEventListener('resize', function() {
    if (isMobileDevice()) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });
  
  // Handle page visibility changes (pause when tab is not visible)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden || isMobileDevice()) {
      stopAutoplay();
    } else if (!isMobileDevice()) {
      startAutoplay();
    }
  });
});