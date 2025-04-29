
  // Mobile menu functionality
  document.addEventListener("DOMContentLoaded", function () {
      // Get the necessary elements
      const menuButton = document.querySelector(
          'button[aria-label="Open main menu"]',
      );
      const closeButton = document.querySelector(
          'button[aria-label="Close menu"]',
      );
      const mobileMenu = document.querySelector('div[role="dialog"]');
      const menuPanel = mobileMenu.querySelector(".fixed.inset-y-0.right-0");
      const backdrop = mobileMenu.querySelector(".fixed.inset-0");
      const closeIcon = closeButton.querySelector("svg");

      // Function to open the mobile menu with animations
      function openMenu() {
          // Display the menu
          mobileMenu.style.display = "block";

          // Animate backdrop fade in
          backdrop.style.opacity = "0";
          backdrop.style.transition = "opacity 400ms ease-out";
          setTimeout(() => {
              backdrop.style.opacity = "1";
          }, 10);

          // Animate panel slide in
          menuPanel.style.transform = "translateX(100%)";
          menuPanel.style.transition = "transform 400ms ease-out";
          setTimeout(() => {
              menuPanel.style.transform = "translateX(0)";
          }, 10);

          // Prevent body scrolling
          document.body.style.overflow = "hidden";
      }

      // Function to close the mobile menu with animations
      function closeMenu() {
          // Animate backdrop fade out
          backdrop.style.opacity = "1";
          backdrop.style.transition = "opacity 600ms ease-in-out";
          backdrop.style.opacity = "0";

          // Animate panel slide out
          menuPanel.style.transform = "translateX(0)";
          menuPanel.style.transition = "transform 600ms ease-in-out";
          menuPanel.style.transform = "translateX(100%)";

          // Hide the menu after animations complete
          setTimeout(() => {
              mobileMenu.style.display = "none";

              // Restore body scrolling
              document.body.style.overflow = "";
          }, 600);
      }

      // Add hover effects to menu buttons
      function addButtonHoverEffects() {
          // Add hover effects to the menu button
          menuButton.addEventListener("mouseenter", () => {
              menuButton.classList.add("text-slate-50", "bg-[#3498DB]");
          });

          menuButton.addEventListener("mouseleave", () => {
              menuButton.classList.remove("text-slate-50", "bg-[#3498DB]");
          });

          // Add hover effects to the close button
          closeButton.addEventListener("mouseenter", () => {
              closeButton.classList.add("text-[#3498DB]", "bg-gray-100");
              // Rotate the X icon on hover
              closeIcon.style.transition = "transform 500ms ease-in-out";
              closeIcon.style.transform = "rotate(90deg)";
          });

          closeButton.addEventListener("mouseleave", () => {
              closeButton.classList.remove("text-gray-900", "bg-gray-100");
              // Rotate back when not hovering
              closeIcon.style.transition = "transform 500ms ease-in-out";
              closeIcon.style.transform = "rotate(0deg)";
          });
      }

      // Add event listeners
      menuButton.addEventListener("click", openMenu);
      closeButton.addEventListener("click", closeMenu);
      backdrop.addEventListener("click", closeMenu);

      // Add hover effects to buttons
      addButtonHoverEffects();

      // Close the mobile menu when the screen size changes to desktop
      window.addEventListener("resize", () => {
          if (window.innerWidth >= 1024) {
              // lg breakpoint in Tailwind
              if (mobileMenu.style.display === "block") {
                  closeMenu();
              }
          }
      });

      // Close the menu when clicking on mobile menu links (optional)
      const mobileMenuLinks = mobileMenu.querySelectorAll("a");
      mobileMenuLinks.forEach((link) => {
          link.addEventListener("click", closeMenu);
      });
  });