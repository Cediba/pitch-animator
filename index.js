// voice configuration

const Wad = require('web-audio-daw');
var voice = new Wad({source : 'mic' });
var tuner = new Wad.Poly();
tuner.setVolume(0);
tuner.add(voice);
voice.play();
tuner.updatePitch()


//animation configuration

let circles = document.getElementsByTagName("circle");
for(let i = 0; i < circles.length ; i ++) {
  circles[i].addEventListener('animationiteration', function() {
    this.style.animationPlayState = "paused";
  });
}

let box = document.getElementById('B');
box.addEventListener('animationiteration', function() {
  this.style.animationPlayState = "paused";
});

let doritos = document.getElementsByClassName("triangle");
for(let i = 0; i < doritos.length ; i ++) {
  doritos[i].addEventListener('animationend', function() {
    this.classList.remove("triangle-animated");
  });
}

let squares = document.getElementsByClassName("square");
for(let i = 0; i < squares.length; i ++) {
  squares[i].addEventListener('animationiteration', function() {
    this.style.animationPlayState = "paused";
  })
}

setInterval(() => {
    const octave = tuner.noteName ? tuner.noteName.slice(tuner.noteName.length - 1) : undefined;
    const note = tuner.noteName ? tuner.noteName.slice(0,1) : undefined;
    console.log(note);
    console.log(octave);
    if(note === "A" && (octave !== "7" && octave !=="6")) {
      for(let i = 0; i < circles.length; i ++){
        circles[i].style.animationPlayState = "running";
      }
    } else if(note === "B" && (octave !== "7" && octave !=="6")){
      box.style.animationPlayState = "running";
    } else if(note === "C" && (octave !== "7" && octave !=="6")){
      for(let i = 0; i < doritos.length; i ++){
        doritos[i].classList.add("triangle-animated");
      }
    } else if(note === "D" && (octave !== "7" && octave !=="6")){
      for(let i = 0; i < squares.length; i ++){
        squares[i].style.animationPlayState = "running"
      }
    }
}, 250);
// If you sing into your microphone, your pitch will be logged to the console in real time.
