export function getVolumeLevel(rms) {

    if (rms <= 0) {
        return 0;
    }

    const db = 20 * Math.log10(rms);

    /*
     * Thang đo tương đối:
     *
     * -50 dB  → 0
     * -15 dB  → 100
     *
     * Giúp microphone nhạy hơn
     * so với phiên bản trước.
     */

    const level =
        ((db + 50) / 35) * 100;

    return Math.max(
        0,
        Math.min(100, level)
    );
}


export function classifyVolume(level) {

    if (level < 25) {
        return "LOW";
    }

    if (level < 50) {
        return "NORMAL";
    }

    if (level < 75) {
        return "LOUD";
    }

    return "VERY_LOUD";
}
