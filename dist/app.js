/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var loadSample = function loadSample(ac, sampleFile) {
	  var file = new XMLHttpRequest();
	  file.open("get", sampleFile);
	  file.responseType = "arraybuffer";
	  file.addEventListener("load", function () {
	    console.log(this.response);
	    ac.decodeAudioData(this.response, function (decodedBuffer) {
	      window.clapSound = decodedBuffer;
	    });
	  });
	  file.send();
	};

	var playBuffer = function playBuffer(ac, buffer, startTime) {
	  var offset = 1;
	  var source = ac.createBufferSource();
	  source.buffer = buffer;
	  source.connect(ac.destination);
	  source.start(offset + startTime);
	};

	var reader = {
	  push: function push(ac, beats) {
	    beats.map(function (beat, index) {
	      if (beat == "X") {
	        playBuffer(ac, window.clapSound, index * .25);
	      }
	    });
	  }
	};

	window.addEventListener("load", function () {
	  var audioContext = new AudioContext();
	  loadSample(audioContext, "clap1.wav");
	  setTimeout(function () {
	    var melody = "XXX_XX_X_XX_";
	    var melody2 = "XX_XX_X_XX_X";
	    var splitMelody = melody.split("");
	    var splitMelody2 = melody2.split("");
	    reader.push(audioContext, splitMelody);
	    reader.push(audioContext, splitMelody2);
	  }, 1000);
	});

/***/ }
/******/ ]);