$(document).ready(function () {
    const envelope = $('#envelope');
    const openBtn = $("#openBtn");
    const resetBtn = $("#resetBtn");
    const audio = document.getElementById("sound");
    const videoContainer = $("#videoContainer");
    const loveVideo = document.getElementById("loveVideo");
    const backToLetterBtn = $("#backToLetterBtn");

    let currentPage = 1;
    const totalPages = 23;
    let isOpen = false;
    let hasPlayed = false;

    // Phát nhạc từ giây số 5 ngay khi mở thư
    function playAudioOnce() {
        if (!hasPlayed) {
            audio.currentTime = 5; 
            audio.play().then(() => {
                hasPlayed = true;
            }).catch((e) => {
                console.log("Không thể phát nhạc:", e);
            });
        }
    }

    // Bấm vào phong bì để chuyển từng trang lời nhắn
    envelope.on('click', function () {
        if (isOpen) {
            if (currentPage < totalPages) {
                currentPage++;
                updateActivePage();
            } else {
                // Đã đọc xong trang 23 -> Dừng nhạc và mở Video
                showVideo();
            }
        }
    });

    // Bấm nút Mở
    openBtn.on('click', function () {
        envelope.removeClass("close").addClass("open");
        isOpen = true;
        openBtn.hide();
        resetBtn.show();
        playAudioOnce();
    });

    // Bấm nút Đóng
    resetBtn.on('click', function () {
        envelope.removeClass("open").addClass("close");
        isOpen = false;
        setTimeout(function () {
            currentPage = 1;
            updateActivePage();
            resetBtn.hide();
            openBtn.show();
        }, 600);
    });

    function updateActivePage() {
        $(".lyric-page").removeClass("active");
        $("#page" + currentPage).addClass("active");
    }

    // Hiển thị Video và tắt nhạc nền
    function showVideo() {
        audio.pause();
        videoContainer.css("display", "flex");
        loveVideo.play();
    }

    // Nút quay lại đọc thư từ màn hình Video
    backToLetterBtn.on('click', function () {
        loveVideo.pause();
        videoContainer.hide();
        currentPage = 1;
        updateActivePage();
        audio.play();
    });
});
