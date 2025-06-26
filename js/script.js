document.addEventListener('DOMContentLoaded', () => {
    // Select all menu dot buttons
    const menuDotsButtons = document.querySelectorAll('.menu-dots-button');

    menuDotsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent the click event from bubbling up to the document,
            // which would immediately close the menu if it were already open.
            event.stopPropagation(); 
            
            // Find the closest parent .carousel-item
            const carouselItem = button.closest('.carousel-item');
            // Find the menu-dropdown within this specific carousel-item
            const menuDropdown = carouselItem.querySelector('.menu-dropdown');

            // Close any currently active menus and deactivate their buttons
            document.querySelectorAll('.menu-dropdown.active').forEach(openMenu => {
                // Check if the open menu is NOT the one we just clicked
                if (openMenu !== menuDropdown) {
                    openMenu.classList.remove('active');
                    // Find the button associated with this openMenu and deactivate it
                    const associatedButton = openMenu.previousElementSibling; 
                    if (associatedButton && associatedButton.classList.contains('menu-dots-button')) {
                        associatedButton.classList.remove('active');
                    }
                }
            });

            // Toggle the 'active' class on the clicked menu's dropdown and button
            menuDropdown.classList.toggle('active');
            button.classList.toggle('active'); // Keep the button orange when its menu is open
        });
    });

    // Close menu when clicking anywhere else on the document
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.menu-dropdown.active').forEach(openMenu => {
            openMenu.classList.remove('active');
            // Also deactivate the associated button
            const associatedButton = openMenu.previousElementSibling;
            if (associatedButton && associatedButton.classList.contains('menu-dots-button')) {
                associatedButton.classList.remove('active');
            }
        });
    });

    // Handle Edit/Delete option clicks (navigation is handled by href)
    // No special JS needed here, as the <a> tags' href will handle navigation.
    // The CSS :hover and :active states provide the yellow/orange feedback.
});