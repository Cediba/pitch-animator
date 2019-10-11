const Wad = require('web-audio-daw');


var voice = new Wad({source : 'mic' }); // At this point, your browser will ask for permission to access your microphone.
var tuner = new Wad.Poly();
tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
tuner.add(voice);

voice.play(); // You must give your browser permission to access your microphone before calling play().

tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.



setInterval(() => {
    console.log(tuner.pitch, tuner.noteName)
    var tune = tuner.noteName;
    switch (tune){
        case 0:
            if (tune === "D3") {
                let div = document.getElementsByClassName("box")[0];
                div.style.animationPlayState = "running";
                setTimeout(() => {
                    div.style.animationPlayState = "paused"
                }, 1000)
    }
        break;

    case 1:
        if (tune === "A7") {
            let div = document.getElementsByClassName("pulse")[0];
            div.style.animationPlayState = "running";
            setTimeout(() => {
                div.style.animationPlayState = "paused"
            }, 1000)
    }
        break;
}
}, 500);
// If you sing into your microphone, your pitch will be logged to the console in real time.