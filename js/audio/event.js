import { sendSoundEvent } from "../realtime/sender.js";

let lastSentTime = 0;

// Khoảng cách tối thiểu giữa 2 cảnh báo
const ALERT_COOLDOWN = 3000;

/**
 * Xử lý khi phát hiện mức âm thanh mới
 */
export async function handleSoundEvent(level, eventType) {

    const now = Date.now();

    // Không gửi liên tục khi âm thanh kéo dài
    if (now - lastSentTime < ALERT_COOLDOWN) {
        return;
    }

    // Chỉ gửi cảnh báo khi âm thanh lớn
    if (eventType !== "LOUD" && eventType !== "VERY_LOUD") {
        return;
    }

    lastSentTime = now;

    // Tạo ID cho thiết bị
    let deviceId = localStorage.getItem("baby_monitor_device_id");

    if (!deviceId) {
        deviceId =
            "device-" +
            crypto.randomUUID();

        localStorage.setItem(
            "baby_monitor_device_id",
            deviceId
        );
    }

    console.log(
        "Phát hiện âm thanh:",
        eventType,
        level
    );

    await sendSoundEvent(
        eventType,
        level,
        deviceId
    );
}
