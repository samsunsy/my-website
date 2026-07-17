function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="display: flex"]');
        openModals.forEach(function (modal) {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('resize', function () {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (!heroTitle || !heroSubtitle) return;

    if (window.innerWidth < 768) {
        heroTitle.style.top = '40%';
        heroSubtitle.style.top = '58%';
    } else {
        heroTitle.style.top = '40%';
        heroSubtitle.style.top = '55%';
    }
});