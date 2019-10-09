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
            const audio = new Audio(audioUrl);
            const pitchfinder = Pitchfinder.YIN();
            // const pitch = pitchfinder(audio);
            const buffer = fs.readFileSync(PATH_TO_FILE);
const decoded = WavDecoder.decode.sync(buffer); // get audio data from file using `wav-decoder`
const float32Array = decoded.channelData[0]; // get a single channel of sound
const pitch = detectPitch(float32Array); // null if pitch cannot be identified
            console.log(pitch);
        });

        //stop recording
        setTimeout(() => {
            mediaRecorder.stop();
        }, 3000);
    });