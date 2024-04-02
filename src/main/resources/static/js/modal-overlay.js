document.addEventListener('DOMContentLoaded', function() {
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = mobileOverlay.querySelectorAll('.mobile-overlay__link');

    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileOverlay.close();
        });
    });
});
