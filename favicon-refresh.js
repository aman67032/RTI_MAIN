// Script to force favicon refresh
document.addEventListener('DOMContentLoaded', function() {
    // Force favicon refresh by removing and re-adding the links
    const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
    faviconLinks.forEach(link => {
        const parent = link.parentNode;
        const clone = link.cloneNode(true);
        parent.removeChild(link);
        setTimeout(() => {
            parent.appendChild(clone);
        }, 100);
    });
}); 