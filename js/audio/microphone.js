let audioContext = null;
let microphoneStream = null;
let analyser = null;

export async function startMicrophone() {

    microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });

    audioContext = new AudioContext();

    const microphone =
        audioContext.createMediaStreamSource(microphoneStream);

    analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;

    microphone.connect(analyser);

    console.log("Microphone started");

    return {
        audioContext,
        analyser
    };
}
