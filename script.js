tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'fpso-dark': '#003f88', // Deep Blue - Primary Nav
                        'fpso-accent': '#ffcc00', // Gold/Yellow - Accent/Buttons
                        'fpso-utility': '#f3f4f6', // Light Gray - Utility Bar
                    }
                }
            }
        }

       



function onTogglemenu(el){
    el.name = el.name === "menu" ? "close" : "menu";
    const nav = document.getElementById('navLinks');
    if(nav) nav.classList.toggle('hidden');
}

// Modal & form handling (safe guards when elements are missing)
(() => {
    const openBtn = document.getElementById('open-partnership-btn');
    const modal = document.getElementById('partnership-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('partnership-form');
    const successMessage = document.getElementById('success-message');

    function openModal() {
        if (!modal || !modalContent) return;
        modal.classList.remove('hidden');
        // small delay so transition classes can apply
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 20);
    }

    function closeModal() {
        if (!modal || !modalContent) return;
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            // Reset form and messages for next open
            if (form) {
                form.reset();
                form.classList.remove('hidden');
            }
            if (successMessage) successMessage.classList.add('hidden');
        }, 200);
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Click on backdrop closes modal
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        // Also close when the dedicated overlay element is clicked (safer with nested structure)
        const modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Form submission handling (guarded)
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const organization = document.getElementById('org-name') ? document.getElementById('org-name').value.trim() : '';
            const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            const type = document.getElementById('partnership-type') ? document.getElementById('partnership-type').value : '';
            const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

            const payload = { organization, email, type, message };
            console.log('Partnership form payload:', payload);

            // Simulate network request
            setTimeout(() => {
                form.classList.add('hidden');
                if (successMessage) successMessage.classList.remove('hidden');

                // Auto-close modal after short delay
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }, 700);
        });
    }
})();


//form popup//
    document.addEventListener('DOMContentLoaded', function () {
        // --- Element References ---
        const modal = document.getElementById('projectInquiryModal');
        const openBtn = document.getElementById('openModalBtn');
        const closeBtn = document.getElementById('closeModalBtn');
        const checkboxes = document.querySelectorAll('.service-checkbox');
        const dynamicFieldsContainer = document.getElementById('dynamicFields');
        const form = modal.querySelector('form');

        
        // Function to open the modal
        openBtn.addEventListener('click', function () {
            // 1. Show the modal (remove the 'hidden' class)
            modal.classList.remove('hidden');
            // 2. Prevent the main page from scrolling
            document.body.style.overflow = 'hidden'; 
        });

        // Function to close the modal
        function closeModal() {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore background scrolling
        }

        closeBtn.addEventListener('click', closeModal);

        // Close modal when clicking on the dark backdrop area
        modal.addEventListener('click', function (e) {
            // Check if the click target is the modal container itself (the dark backdrop)
            if (e.target.id === 'projectInquiryModal') { 
                closeModal();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // --- Dynamic Field Logic (The core responsiveness feature) ---
        
        function toggleDynamicFields() {
            let anyDetailedChecked = false;

            checkboxes.forEach(checkbox => {
                const detailId = checkbox.dataset.detail;
                const detailField = document.getElementById(detailId);
                
                if (detailField) {
                    if (checkbox.checked) {
                        detailField.classList.remove('hidden');
                        anyDetailedChecked = true;
                    } else {
                        detailField.classList.add('hidden');
                        // Optional: Reset value when unchecked
                        detailField.querySelector('select').value = '';
                    }
                }
            });

            // Show/hide the entire dynamic container border/padding if fields are present
            if (anyDetailedChecked) {
                 dynamicFieldsContainer.classList.remove('hidden');
            } else {
                 dynamicFieldsContainer.classList.add('hidden');
            }
        }

        // Attach event listeners to all service checkboxes to run the toggle function
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', toggleDynamicFields);
        });

        // Initial run to ensure correct state on page load
        toggleDynamicFields();
        
        // --- Form Submission Validation (Optional: Check at least one service is selected) ---
        form.addEventListener('submit', function (e) {
             let isChecked = false;
             checkboxes.forEach(checkbox => {
                 if (checkbox.checked) isChecked = true;
             });

             if (!isChecked) {
                 e.preventDefault();
                 alert('Please select at least one service you are interested in.');
             }
         });
    });

    //smaill pop message //

    // --- Element Variables ---
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('projectInquiryModal');
    const form = modal.querySelector('form');
    const submitBtn = document.getElementById('submitBtn'); 
    const successMessage = document.getElementById('successMessage'); 
    const checkboxes = document.querySelectorAll('.service-checkbox');
    const dynamicFields = document.getElementById('dynamicFields');
    
    // The target URL to redirect to after success
    const redirectUrl = 'service.html'; // Change this to your desired services/info page

    // --- Modal Functions ---
    function openModal() {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // --- Event Listeners for Modal Open/Close ---
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    // Close modal when clicking outside (on the overlay)
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'projectInquiryModal') {
            closeModal();
        }
    });

    // --- Dynamic Fields Logic (from previous steps) ---
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            let anyChecked = false;
            checkboxes.forEach(cb => {
                const detailId = cb.dataset.detail;
                const detailDiv = document.getElementById(detailId);
                if (cb.checked) {
                    anyChecked = true;
                    if (detailDiv) {
                        detailDiv.classList.remove('hidden');
                    }
                } else {
                    if (detailDiv) {
                        detailDiv.classList.add('hidden');
                    }
                }
            });
            // Show the dynamic fields container only if any checkbox is checked
            if (dynamicFields) {
                if (anyChecked) {
                    dynamicFields.classList.remove('hidden');
                } else {
                    dynamicFields.classList.add('hidden');
                }
            }
        });
    });

    // --- Timed Form Submission and Redirection Logic ---
    form.addEventListener('submit', function (e) {
        // 1. Prevent the form from submitting the traditional way (which causes page reload)
        e.preventDefault(); 
        
        // Basic Validation Check: Ensure at least one service is selected
        let isChecked = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) isChecked = true;
        });

        if (!isChecked) {
            alert('Please select at least one service you are interested in.');
            return; // Stop the submission process
        }
        
        // --- Submission Simulation & Success Flow ---
        
        // Disable the button to prevent double submission
        submitBtn.disabled = true;
        
        // Hide the form content (to only show the success message)
        form.classList.add('hidden');
        
        // Show the success message
        successMessage.classList.remove('hidden');
        
        // 2. Set a timeout to wait (3 seconds)
        setTimeout(() => {
            // 3. Close the modal (optional, as the redirect below will close it anyway)
            closeModal(); 
            
            // 4. Redirect the user to the services/info page
            window.location.href = redirectUrl; 
        }, 10000); // 10000 milliseconds = 10 seconds
    });
