let loudState = false;

const LOUD_THRESHOLD = 60;
const RESET_THRESHOLD = 45;

export function detectSoundEvent(level) {

    // Đang ở trạng thái bình thường
    if (!loudState && level >= LOUD_THRESHOLD) {

        loudState = true;

        if (level >= 80) {
            return {
                type: "VERY_LOUD_DETECTED",
                level: Math.round(level),
                timestamp: new Date().toISOString()
            };
        }

        return {
            type: "LOUD_DETECTED",
            level: Math.round(level),
            timestamp: new Date().toISOString()
        };
    }


    // Chỉ cho phép phát hiện event mới
    // khi âm thanh đã trở lại đủ thấp
    if (loudState && level <= RESET_THRESHOLD) {

        loudState = false;
    }


    return null;
}
