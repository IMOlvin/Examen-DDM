document.addEventListener('DOMContentLoaded', function() {
    // Select the specific carousel container for "Your Videos"
    // This ensures the script ONLY operates within this section.
    const yourVideosCarouselContainer = document.querySelector('#your-videos-carousel .carousel-container');

    // Proceed only if the 'Your Videos' carousel container exists on the page
    if (yourVideosCarouselContainer) {
        // Add a click event listener to the "Your Videos" carousel container itself.
        // This uses event delegation, which is efficient as it only attaches one listener
        // instead of one for each carousel item.
        yourVideosCarouselContainer.addEventListener('click', function(event) {
            // Find if the clicked element or any of its ancestors is a '.menu-dots-button'
            const clickedButton = event.target.closest('.menu-dots-button');

            // If a menu-dots-button was clicked within the 'Your Videos' carousel
            if (clickedButton) {
                // Get the parent '.carousel-item' of the clicked button
                const carouselItem = clickedButton.closest('.carousel-item');
                // Get the '.menu-dropdown' associated with this specific '.carousel-item'
                const menuDropdown = carouselItem.querySelector('.menu-dropdown');

                // If both the carousel item and dropdown exist
                if (carouselItem && menuDropdown) {
                    // Close any other active dropdowns within THIS specific 'Your Videos' carousel.
                    // This prevents multiple menus from being open at once in this section.
                    yourVideosCarouselContainer.querySelectorAll('.menu-dropdown.active').forEach(openDropdown => {
                        // Ensure we don't close the dropdown that was just clicked
                        if (openDropdown !== menuDropdown) {
                            openDropdown.classList.remove('active');
                            // Also remove the 'active' class from its corresponding button
                            const correspondingButton = openDropdown.previousElementSibling;
                            if (correspondingButton && correspondingButton.classList.contains('menu-dots-button')) {
                                correspondingButton.classList.remove('active');
                            }
                        }
                    });

                    // Toggle the 'active' class on the clicked dropdown and its button.
                    // This will make the dropdown visible/hidden and change the button's background.
                    menuDropdown.classList.toggle('active');
                    clickedButton.classList.toggle('active');
                }
            }
        });

        // Add a global click event listener to close the dropdown when clicking outside of it
        // (but specifically for dropdowns within the 'Your Videos' carousel).
        document.addEventListener('click', function(event) {
            const isClickInsideYourVideosCarousel = yourVideosCarouselContainer.contains(event.target);
            const isClickOnDropdown = event.target.closest('.menu-dropdown');
            const isClickOnButton = event.target.closest('.menu-dots-button');

            // If the click is NOT inside the 'Your Videos' carousel
            // OR if the click IS inside the carousel but NOT on a dropdown or a menu button (meaning a click on the image, name, or whitespace)
            if (!isClickInsideYourVideosCarousel || (!isClickOnDropdown && !isClickOnButton)) {
                // Close all active dropdowns found within the 'Your Videos' carousel
                yourVideosCarouselContainer.querySelectorAll('.menu-dropdown.active').forEach(openDropdown => {
                    openDropdown.classList.remove('active');
                    // Also remove 'active' class from its corresponding button
                    const correspondingButton = openDropdown.previousElementSibling;
                    if (correspondingButton && correspondingButton.classList.contains('menu-dots-button')) {
                        correspondingButton.classList.remove('active');
                    }
                });
            }
        });
    }
});