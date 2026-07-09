// ========== 手机菜单控制 ==========
// 获取手机菜单按钮和主菜单元素
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

// 点击按钮切换手机菜单显示/隐藏
menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
});

// ========== 视频播放器控制（仅在含视频元素的页面） ==========
const video = document.getElementById('mainVideo');
if (video) {
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const playButton = document.getElementById('playButton');

    // 点击播放按钮
    if (playButton) {
        playButton.addEventListener('click', () => {
            video.play();
            if (videoPlaceholder) videoPlaceholder.classList.add('hidden');
        });
    }

    // 视频结束后显示播放按钮
    video.addEventListener('ended', () => {
        if (videoPlaceholder) videoPlaceholder.classList.remove('hidden');
    });

    // 点击视频暂停/播放
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            if (videoPlaceholder) videoPlaceholder.classList.add('hidden');
        } else {
            video.pause();
            if (videoPlaceholder) videoPlaceholder.classList.remove('hidden');
        }
    });
}

// ========== 图库缩略图弹窗控制 ==========
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');

// 打开模态框展示大图
// except for PDF icons used as download links
function initImageModal(selector) {
    document.querySelectorAll(selector).forEach(img => {
        img.addEventListener('click', (e) => {
            // skip if this image is the PDF download icon
            if (img.classList.contains('pdf-icon') || img.closest('.download-catalog')) {
                return;
            }
            const src = img.dataset.full || img.src;
            modal.style.display = 'block';
            modalImg.src = src;
        });
    });
}
initImageModal('.item-thumb img');
initImageModal('.intro-image img');


// 关闭按钮
const modalClose = document.querySelector('.modal .close');
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// 点击模态背景也可关闭
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ========== 九宫格图片双击弹窗 ==========
const galleryPopup = document.getElementById('galleryPopup');
const galleryPopupImage = galleryPopup?.querySelector('.gallery-popup-image');
const galleryPopupTitle = galleryPopup?.querySelector('.gallery-popup-title');
const galleryPopupText = galleryPopup?.querySelector('.gallery-popup-text');
const galleryPopupClose = galleryPopup?.querySelector('.gallery-popup-close');

function openGalleryPopup(item) {
    if (!galleryPopup || !galleryPopupImage || !galleryPopupTitle || !galleryPopupText) return;
    const img = item.querySelector('img.gallery-image');
    const title = item.querySelector('.gallery-caption h4')?.textContent || '';
    const text = item.querySelector('.gallery-caption p')?.textContent || '';
    const alt = img?.alt || title;

    galleryPopupImage.src = img?.dataset.full || img?.src || '';
    galleryPopupImage.alt = alt;
    galleryPopupTitle.textContent = title;
    galleryPopupText.textContent = text;
    galleryPopup.classList.add('active');
    galleryPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeGalleryPopup() {
    if (!galleryPopup) return;
    galleryPopup.classList.remove('active');
    galleryPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (galleryPopupClose) {
    galleryPopupClose.addEventListener('click', closeGalleryPopup);
}

if (galleryPopup) {
    galleryPopup.addEventListener('click', (e) => {
        if (e.target === galleryPopup) {
            closeGalleryPopup();
        }
    });
}

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryPopup(item);
    });
});

// ========== 平滑滚动到锚点位置 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // 手机菜单打开时，点击链接后关闭菜单
            mainMenu.classList.remove('active');
        }
    });
});