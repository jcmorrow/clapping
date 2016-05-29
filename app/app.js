class MusicRound {
  get audioContext() {
    if(this._audioContext != undefined) {
      return this._audioContext
    } else {
      this._audioContext = new AudioContext()
      return this._audioContext
    }
  }

  get clapSample() {
    if(this._clapSample != undefined) {
      return this._clapSample
    } else {
      this._clapSample = this.loadClapSample("clap1.wav")
      return this._clapSample
    }
  }

  play(pattern) {
    this.loadClapSample("clap1.wav")
    let fixedPattern = pattern.repeat(pattern.length)
    let splitPattern = fixedPattern.split("")
    let variablePattern = this.fullShift(pattern)
    setTimeout(function() {
      this.queue(splitPattern)
      this.queue(variablePattern)
    }.bind(this), 1000)
  }

  queue(pattern) {
    pattern.map((beat, index) => {
      if(beat == "X")
      {
        this.playClap(index * .25)
      }
    })
  }

  loadClapSample(sample) {
    let file = new XMLHttpRequest()
    let self = this
    file.open("get", sample)
    file.responseType = "arraybuffer"
    file.addEventListener("load",  function() {
      self.audioContext.decodeAudioData(this.response, function(decodedBuffer) {
        // this line is really problematic
        self._clapSample = decodedBuffer
      })
    })
    file.send()
  }

  playClap(startTime) {
    //we could change offset later
    let offset = 1
    var source = this.audioContext.createBufferSource()
    source.buffer = this.clapSample
    source.connect(this.audioContext.destination)
    source.start(offset + startTime)
  }

  shift(pattern, count) {
    if(count == 0) {
      return pattern
    }
    let shift_portion = pattern.slice(0, count)
    return pattern.slice(count).concat(shift_portion)
  }

  fullShift(pattern) {
    let splitPattern = pattern.split("")
    let nested_melodies = Array.
      apply(null, Array(splitPattern.length + 1)).
      map(function (_, i) {
        return this.shift(splitPattern, i)
      }.bind(this))
    return [].concat.apply([], nested_melodies)
  }
}

window.addEventListener("load", () => {
  new MusicRound().play("XXX_XX_X_XX_")
})
