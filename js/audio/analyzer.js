import { handleSoundEvent } from "./event.js";

/*
 * Phân tích microphone liên tục
 * và gửi sự kiện âm thanh lớn sang event.js
 */

let animationFrameId = null;

export function analyzeAudio(analyser) {

    if (!analyser) {
        console.error("Không có analyser");
        return;
    }

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    function analyze() {

        analyser.getByteTimeDomainData(dataArray);

        let sum = 0;

        for (let i = 0; i < bufferLength; i++) {

            const normalized =
                (dataArray[i] - 128) / 128;

            sum += normalized * normalized;
        }

        const rms =
            Math.sqrt(sum / bufferLength);

        /*
         * Chuyển RMS thành mức 0 - 100
         *
         * 0  = gần như im lặng
         * 100 = âm thanh rất lớn
         */

        let level = rms * 180;

        level = Math.max(
            0,
            Math.min(100, level)
        );

        /*
         * Phân loại âm thanh
         */

        let eventType = "LOW";

        if (level >= 70) {
            eventType = "VERY_LOUD";

        } else if (level >= 45) {
            eventType = "LOUD";
        }

        /*
         * Chỉ gửi cảnh báo khi lớn
         */

        if (
            eventType === "LOUD" ||
            eventType === "VERY_LOUD"
        ) {
            handleSoundEvent(
                level,
                eventType
            );
        }

        /*
         * Cho index.html lấy mức hiện tại
         */

        if (typeof window.onAudioLevel === "function") {
            window.onAudioLevel(
                Math.round(level),
                eventType
            );
        }

        animationFrameId =
            requestAnimationFrame(analyze);
    }

    analyze();
}


/*
 * Dừng phân tích microphone
 */

export function stopAnalyzeAudio() {

    if (animationFrameId) {

        cancelAnimationFrame(
            animationFrameId
        );

        animationFrameId = null;
    }
}
