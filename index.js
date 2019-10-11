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

let flash = document.getElementsByClassName("flash")[0];
flash.addEventListener('animationiteration', function() {
    this.style.animationPlayState = "paused";
});

setInterval(() => {
    const note = tuner.noteName ? tuner.noteName.slice(0,1) : undefined;
    console.log(note);
    if(note === "A") {
      for(let i = 0; i < circles.length; i ++){
        circles[i].style.animationPlayState = "running";
      }
    } else if(note === "B"){
      box.style.animationPlayState = "running";
    } else if(note === "C"){
      for(let i = 0; i < doritos.length; i ++){
        doritos[i].classList.add("triangle-animated");
      }
    } else if(note === "D"){
      for(let i = 0; i < squares.length; i ++){
        squares[i].style.animationPlayState = "running"
      }
    } else if(note === "E"){
        flash.style.animationPlayState = "running";
    }
}, 500);
// If you sing into your microphone, your pitch will be logged to the console in real time.
