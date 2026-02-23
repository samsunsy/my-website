// ========== 手机菜单控制 ==========
// 获取手机菜单按钮和主菜单元素
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

// 点击按钮切换手机菜单显示/隐藏
menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
});

// ========== 视频播放器控制 ==========
const video = document.getElementById('mainVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const playButton = document.getElementById('playButton');

// 点击播放按钮
playButton.addEventListener('click', () => {
    video.play();
    videoPlaceholder.classList.add('hidden');
});

// 视频结束后显示播放按钮
video.addEventListener('ended', () => {
    videoPlaceholder.classList.remove('hidden');
});

// 点击视频暂停/播放
video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        videoPlaceholder.classList.add('hidden');
    } else {
        video.pause();
        videoPlaceholder.classList.remove('hidden');
    }
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