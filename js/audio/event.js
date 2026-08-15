let loudState = false;

const LOUD_THRESHOLD = 50;
const RESET_THRESHOLD = 30;

export function detectSoundEvent(level) {

    if (!loudState && level >= LOUD_THRESHOLD) {

        loudState = true;

        if (level >= 75) {
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

    if (loudState && level <= RESET_THRESHOLD) {
        loudState = false;
    }

    return null;
}
