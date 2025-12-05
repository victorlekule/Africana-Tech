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