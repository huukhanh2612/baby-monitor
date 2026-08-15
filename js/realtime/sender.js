import { supabase } from "./supabase.js";

/*
 * Gửi một sự kiện âm thanh lên Supabase
 *
 * eventType:
 *   LOW          = âm thanh nhỏ
 *   LOUD         = âm thanh lớn
 *   VERY_LOUD    = âm thanh rất lớn
 *
 * level:
 *   Mức âm thanh từ 0 - 100
 */

export async function sendSoundEvent(
    eventType,
    level,
    deviceId = "unknown-device"
) {
    try {
        const { error } = await supabase
            .from("sound_events")
            .insert({
                event_type: eventType,
                level: Math.round(level),
                device_id: deviceId
            });

        if (error) {
            console.error(
                "Không gửi được cảnh báo:",
                error
            );

            return false;
        }

        console.log(
            "Đã gửi cảnh báo:",
            eventType,
            Math.round(level)
        );

        return true;

    } catch (error) {
        console.error(
            "Lỗi kết nối Supabase:",
            error
        );

        return false;
    }
}
