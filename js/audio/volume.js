export function getVolumeLevel(rms) {

    if (rms <= 0) {
        return 0;
    }

    const db = 20 * Math.log10(rms);

    // Chuyển khoảng âm thanh tương đối thành thang 0–100
    const level = db + 60;

    return Math.max(0, Math.min(100, level));
}


export function classifyVolume(level) {

    if (level < 30) {
        return "LOW";
    }

    if (level < 60) {
        return "NORMAL";
    }

    if (level < 80) {
        return "LOUD";
    }

    return "VERY_LOUD";
}
