console.clear();
let keyboardPosition = 4,
    synthType = "new Tone.Synth().toMaster()",
    soundSelected = "Synth",
    oscillatorType = "triangle",
    effectsAddedList = [],
    synth = new Tone.Synth().toMaster(),
    chorus = new Tone.Chorus(0,2,1).connect(Tone.Master),
    tremolo = new Tone.Tremolo(0, 1).toMaster().start(),
    vibrato = new Tone.Vibrato(4, 0.5).connect(Tone.Master),
    phaser = new Tone.Phaser(0.5, 3, 350).connect(Tone.Master),
    reverb = new Tone.JCReverb(.2).connect(Tone.Master),
    distortion = new Tone.Distortion(1.5).connect(Tone.Master),
    bitCrusher = new Tone.BitCrusher(4).connect(Tone.Master),
    frequency = synth.frequency.value;

document.onkeypress = (e) => {
  e = e || window.event;
  let charCode = e.keyCode;

  if (charCode) {
    determineNote(charCode);
  }
}

function selectSynthType(sound) {
  if(soundSelected !== sound) {
    document.getElementById(soundSelected).classList.remove("active");
    document.getElementById(sound).classList.add("active");
    soundSelected = sound;
  }
}

function changeOscillator(type) {
  if(oscillatorType !== type) {
    document.getElementById(oscillatorType).classList.remove("active");
    document.getElementById(type).classList.add("active");
    oscillatorType = type;
  }
}

const determineNote = (note) => {
  selectSynthSound();

  switch(note) {
    case 122:
      keyboardPosition--;
      break;
    case 120:
      keyboardPosition++;
      break;
    case 97:
      synth.triggerAttackRelease("C" + keyboardPosition, "8n");
      whiteKeyPress(".C");
      break;
    case 115:
      synth.triggerAttackRelease("D" + keyboardPosition, "8n");
      whiteKeyPress(".D");
      break;
    case 100:
      synth.triggerAttackRelease("E" + keyboardPosition, "8n");
      whiteKeyPress(".E");
      break;
    case 102:
      synth.triggerAttackRelease("F" + keyboardPosition, "8n");
      whiteKeyPress(".F");
      break;
    case 103:
      synth.triggerAttackRelease("G" + keyboardPosition, "8n");
      whiteKeyPress(".G");
      break;
    case 104:
      synth.triggerAttackRelease("A" + keyboardPosition, "8n");
      whiteKeyPress(".A");
      break;
    case 106:
      synth.triggerAttackRelease("B" + keyboardPosition, "8n");
      whiteKeyPress(".B");
      break;
    case 107:
      synth.triggerAttackRelease("C" + (keyboardPosition + 1), "8n");
      whiteKeyPress(".octave-up-C");
      break;
    case 108:
      synth.triggerAttackRelease("D" + (keyboardPosition + 1), "8n");
      whiteKeyPress(".octave-up-D");
      break;
    case 59:
      synth.triggerAttackRelease("E" + (keyboardPosition + 1), "8n");
      whiteKeyPress(".octave-up-E");
      break;
    case 39:
      synth.triggerAttackRelease("F" + (keyboardPosition + 1), "8n");
      whiteKeyPress(".octave-up-F");
      break;
    case 119:
      synth.triggerAttackRelease("C#" + keyboardPosition, "8n");
      blackKeyPress(".C-sharp");
      break;
    case 101:
      synth.triggerAttackRelease("D#" + keyboardPosition, "8n");
      blackKeyPress(".D-sharp");
      break;
    case 116:
      synth.triggerAttackRelease("F#" + keyboardPosition, "8n");
      blackKeyPress(".F-sharp");
      break;
    case 121:
      synth.triggerAttackRelease("G#" + keyboardPosition, "8n");
      blackKeyPress(".G-sharp");
      break;
    case 117:
      synth.triggerAttackRelease("A#" + keyboardPosition, "8n");
      blackKeyPress(".A-sharp");
      break;
    case 111:
      synth.triggerAttackRelease("C#" + (keyboardPosition + 1), "8n");
      blackKeyPress(".octave-up-C-sharp");
      break;
    case 112:
      synth.triggerAttackRelease("D#" + (keyboardPosition + 1), "8n");
      blackKeyPress(".octave-up-D-sharp");
      break;
    default:
      console.log("Not a note on the keyboard!!");
  };

  frequency = synth.frequency.value;
  // playSound(frequency, oscillatorType);
}

const whiteKeyPress = (selector) => {
  document.querySelector(selector).style.fill = "#906e9e";
  setTimeout(function(){
    document.querySelector(selector).style.fill = "#e0d6e4";
  }, 200)
}

const blackKeyPress = (selector) => {
  document.querySelector(selector).style.fill = "#745f92";
  setTimeout(function(){
    document.querySelector(selector).style.fill = "#453858";
  }, 200)
}

const selectSynthSound = () => {
  let effects = effectsAddedList.toString();

  switch(soundSelected) {
    case "Synth":
      synthType =  "new Tone.Synth().chain(" + effects + ").toMaster()";
      synth = eval(synthType);
      break;
    case "MonoSynth":
      synthType =  "new Tone.MonoSynth().chain(" + effects + ").toMaster()";
      synth = eval(synthType);
      break;
    case "AMSynth":
      synthType =  "new Tone.AMSynth().chain(" + effects + ").toMaster()";
      synth = eval(synthType);
      break;
    case "FMSynth":
      synthType =  "new Tone.FMSynth().chain(" + effects + ").toMaster()";
      synth = eval(synthType);
      break;
    case "MembraneSynth":
      synthType =  "new Tone.MembraneSynth().chain(" + effects + ").toMaster()";
      synth = eval(synthType);
      break;
    default:
      synth = new Tone.Synth().toMaster();
  }
  synth.oscillator.type = oscillatorType;
}

// ------------CHORUS EFFECTS

let chorusPower = document.getElementById("chorus-power"),
    chorusFreqSlider = document.getElementById("c-frequency"),
    chorusDelaySlider = document.getElementById("c-delay-time"),
    chorusDepthSlider = document.getElementById("c-depth");

function chorusEffectToggle() { 
  addRemoveEffects("chorus");
  chorusPower.style.color = effectsAddedList.includes("chorus") ? "#bd3578" : "#9ca0b1";
}

chorusFreqSlider.oninput = () => {
  chorus.frequency.value = chorusFreqSlider.value;
}

chorusDelaySlider.oninput = () => {
  chorus.delayTime = chorusDelaySlider.value;
}

chorusDepthSlider.oninput = () => {
  chorus.depth = chorusDepthSlider.value;
}

// ------------TREMOLO EFFECTS

let tremoloPower = document.getElementById("tremolo-power"),
    tremoloFreqSlider = document.getElementById("tremolo-frequency"),
    tremoloDepthSlider = document.getElementById("tremolo-depth");

function tremoloEffectToggle() { 
  addRemoveEffects("tremolo");
  tremoloPower.style.color = effectsAddedList.includes("tremolo") ? "#bd3578" : "#9ca0b1";
}

tremoloFreqSlider.oninput = () => {
  tremolo.frequency.value = tremoloFreqSlider.value;
}

tremoloDepthSlider.oninput = () => {
  tremolo.depth.input.value = tremoloDepthSlider.value;
}

// ------------VIBRATO EFFECTS

let vibratoPower = document.getElementById("vibrato-power"),
    vibratoFreqSlider = document.getElementById("vibrato-frequency"),
    vibratoDepthSlider = document.getElementById("vibrato-depth");

function vibratoEffectToggle() {
  addRemoveEffects("vibrato");
  vibratoPower.style.color = effectsAddedList.includes("vibrato") ? "#bd3578" : "#9ca0b1";
}

vibratoFreqSlider.oninput = () => {
  vibrato.frequency.value = vibratoFreqSlider.value;
}

vibratoDepthSlider.oninput = () => {
  vibrato.depth.input.value = vibratoDepthSlider.value;
}

// ------------PHASER EFFECTS
let phaserPower = document.getElementById("phaser-power"),
    phaserFreqSlider = document.getElementById("phaser-frequency"),
    phaserOctaveSlider = document.getElementById("phaser-octave"),
    phaserBaseFreqSlider = document.getElementById("phaser-baseFrequency");

function phaserEffectToggle() {
  addRemoveEffects("phaser");
  phaserPower.style.color = effectsAddedList.includes("phaser") ? "#bd3578" : "#9ca0b1";
}

phaserFreqSlider.oninput = () => {
  phaser.frequency.value = phaserFreqSlider.value;
}

phaserOctaveSlider.oninput = () => {
  phaser.octave = phaserOctaveSlider.value;
}

phaserBaseFreqSlider.oninput = () => {
  phaser.baseFrequency = phaserBaseFreqSlider.value;
}

// ------------REVERB EFFECTS

let reverbPower = document.getElementById("reverb-power"),
    reverbRoomSizeSlider = document.getElementById("reverb-room-size");

function reverbEffectToggle() {
  addRemoveEffects("reverb");
  reverbPower.style.color = effectsAddedList.includes("reverb") ? "#bd3578" : "#9ca0b1";
}

reverbRoomSizeSlider.oninput = () => {
  reverb.roomSize.input.value = reverbRoomSizeSlider.value;
}

// ------------DISTORTION EFFECTS

let distortionPower = document.getElementById("distortion-power"),
    distortionEffectSlider = document.getElementById("distortion");

function distortionEffectToggle() {
  addRemoveEffects("distortion");
  distortionPower.style.color = effectsAddedList.includes("distortion") ? "#bd3578" : "#9ca0b1";
}

distortionEffectSlider.oninput = () => {
  distortion.distortion = distortionEffectSlider.value;
}

// ------------BITCRUSHER EFFECTS

let bitCrusherPower = document.getElementById("bitCrusher-power"),
    bitCrusherBitSlider = document.getElementById("bitCrusher");

function bitCrusherEffectToggle() {
  addRemoveEffects("bitCrusher");
  bitCrusherPower.style.color = effectsAddedList.includes("bitCrusher") ? "#bd3578" : "#9ca0b1";
}

bitCrusherBitSlider.oninput = () => {
  bitCrusher.bits = bitCrusherBitSlider.value;
}

// ---------------------------------------------------

const addRemoveEffects = (effect) => {
  if(effectsAddedList.includes(effect)) {
    let index = effectsAddedList.indexOf(effect)
    effectsAddedList.splice(index, 1);
  } else {
    effectsAddedList.push(effect);
  }
}

// Stole this from https://codepen.io/PavelRodionoff/pen/XwKvVd?&page=1
function showSoundWave() {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(function(stream) {

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let gainNode = audioContext.createGain();
    let src = audioContext.createMediaStreamSource(stream);

    src.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0);

    let analyser = audioContext.createAnalyser();

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    src.connect(analyser);
    gainNode.connect(analyser);

    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Float32Array(bufferLength);
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    function draw() {
      drawVisual = requestAnimationFrame(draw);
      analyser.getFloatTimeDomainData(dataArray);

      ctx.fillStyle = '#33304a';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.beginPath();

      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      for (var i = 0; i < bufferLength; i++) {
        let v = dataArray[i] * 50;
        let y = HEIGHT / 2 + v;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }
    draw();
  })
    .catch(function(err) {
    console.log("error:");
    console.log(err);
  });
}

showSoundWave();