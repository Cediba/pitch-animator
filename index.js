const Pitchfinder = require("pitchfinder");

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
          const audioContext = new AudioContext();
          audioBlob.arrayBuffer()
          .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
          .then(audioBuffer => {
            console.log(audioBuffer);
            const pitchfinder = Pitchfinder.YIN({sampleRate: 48000});
            const float32Array = audioBuffer.getChannelData(0);
            if(float32Array){
              console.log(float32Array);
              const pitch = pitchfinder(float32Array);
              console.log(pitch);
            }
          })
      });

      //stop recording
      setTimeout(() => {
          mediaRecorder.stop();
      }, 1000);
    });
