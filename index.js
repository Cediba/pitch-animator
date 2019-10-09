const Pitchfinder = require("pitchfinder");


console.log("hi");
navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        //collect audio data
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        //convert data and play the audio
        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            // const audio = new Audio(audioUrl);
            // audio.play();
            // const audioArrayBuffer = (audioBlob.arrayBuffer());
            audioBlob.arrayBuffer().then(buffer => {
                console.log(buffer);
                const pitchfinder = Pitchfinder.YIN();
                const float32Array = buffer.channelData[0];
                const pitch = pitchfinder(float32Array);
                console.log(buffer);
                console.log(pitch);
            });
            // const fileReader = new FileReader();
            // const audioBuffer = fileReader.readAsArrayBuffer(audioChunks);
            // const pitchfinder = Pitchfinder.YIN();
            // const pitch = pitchfinder(audioBuffer);
            // console.log(audioBuffer);
        });

        //stop recording
        setTimeout(() => {
            mediaRecorder.stop();
        }, 3000);
    });