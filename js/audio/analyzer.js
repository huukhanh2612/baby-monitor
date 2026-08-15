export function analyzeAudio(analyser) {

    const bufferLength = analyser.fftSize;

    const dataArray =
        new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    let sum = 0;

    for (let i = 0; i < bufferLength; i++) {

        const normalized =
            (dataArray[i] - 128) / 128;

        sum += normalized * normalized;
    }

    const rms =
        Math.sqrt(sum / bufferLength);

    return rms;
}
