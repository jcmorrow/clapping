const loadSample = (ac, sampleFile) => {
  let rawFile = new XMLHttpRequest();
  rawFile.open("get", sampleFile);
  rawFile.responseType = "arraybuffer";
  rawFile.addEventListener("load",  function() {
    ac.decodeAudioData(this.response, function(decodedBuffer) {
      window.clapSound = decodedBuffer;
    });
  });
  rawFile.send();
}

const playBuffer = (ac, buffer) => {
  var source = ac.createBufferSource();
  source.buffer = buffer;
  source.connect(ac.destination);
  source.start(0);
}

const reader = (ac, beats) => {
  console.log(beats)
  if(beats.pop() == "X")
  {
    playBuffer(ac, window.clapSound);
  }
  if(!beats.length == 0)
  {
    setTimeout(() => { reader(ac, beats) }, 250);
  }
}

window.addEventListener("load", () => {
  const melody = "XXX_XX_X_XX_"
  const splitMelody = melody.split("");
  const audioContext = new AudioContext();
  loadSample(audioContext, "clap1.wav");
  reader(audioContext, splitMelody);
});
