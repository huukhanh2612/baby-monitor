import { supabase } from "./supabase.js";


/* ==========================================
   LẮNG NGHE CẢNH BÁO REALTIME
========================================== */

export function startSoundListener(
    onSoundEvent
) {

    console.log(
        "Đang chờ cảnh báo âm thanh..."
    );


    const channel =
        supabase
            .channel("sound-events-listener")

            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "sound_events"
                },

                (payload) => {

                    console.log(
                        "CẢNH BÁO MỚI:",
                        payload.new
                    );


                    if (
                        typeof onSoundEvent ===
                        "function"
                    ) {

                        onSoundEvent(
                            payload.new
                        );

                    }

                }
            )

            .subscribe(
                (status) => {

                    console.log(
                        "Realtime status:",
                        status
                    );

                }
            );


    return channel;
}
