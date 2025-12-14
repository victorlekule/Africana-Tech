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
    document.addEventListener('DOMContentLoaded', function() {

        // 1. Get DOM elements
        // *** FIX APPLIED HERE: Changed ID lookup from 'open-partnership-btn' to 'read-btn' ***
        const openBtn = document.getElementById('read-btn'); 
        const modal = document.getElementById('partnership-modal');
        const closeBtn = document.getElementById('close-modal-btn');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
        const partnershipForm = document.getElementById('partnership-form');
        const successMessage = document.getElementById('success-message');

        if (!modal || !openBtn) {
            console.error("Critical elements (modal or read button) not found. Check your HTML IDs.");
            return;
        }

        // Utility function to open the modal (handles display and transition)
        function openModal() {
            modal.classList.remove('hidden'); 
            
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        // Utility function to close the modal (handles transition and display)
        function closeModal() {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                // Reset form visibility and clear form when closing
                partnershipForm.classList.remove('hidden');
                partnershipForm.reset();
                successMessage.classList.add('hidden');
            }, 300); 
        }

        // 2. Event Listeners for Opening and Closing
        openBtn.addEventListener('click', openModal); // This now links the 'read-btn' to open the modal
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Optional: Close modal when pressing the ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // 3. Form Submission Handling (Prevents page reload and shows success message)
        partnershipForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // 1. Hide the form
            this.classList.add('hidden'); 
            
            // 2. Show the success message
            successMessage.classList.remove('hidden'); 
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
