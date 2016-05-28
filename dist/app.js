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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var loadSample = function loadSample(ac, sampleFile) {
	  var rawFile = new XMLHttpRequest();
	  rawFile.open("get", sampleFile);
	  rawFile.responseType = "arraybuffer";
	  rawFile.addEventListener("load", function () {
	    ac.decodeAudioData(this.response, function (decodedBuffer) {
	      window.clapSound = decodedBuffer;
	    });
	  });
	  rawFile.send();
	};

	var playBuffer = function playBuffer(ac, buffer) {
	  var source = ac.createBufferSource();
	  source.buffer = buffer;
	  source.connect(ac.destination);
	  source.start(0);
	};

	var reader = function reader(ac, beats) {
	  console.log(beats);
	  if (beats.pop() == "X") {
	    playBuffer(ac, window.clapSound);
	  }
	  if (!beats.length == 0) {
	    setTimeout(function () {
	      reader(ac, beats);
	    }, 250);
	  }
	};

	window.addEventListener("load", function () {
	  var melody = "XXX_XX_X_XX_";
	  var splitMelody = melody.split("");
	  var audioContext = new AudioContext();
	  loadSample(audioContext, "clap1.wav");
	  reader(audioContext, splitMelody);
	});

/***/ }
/******/ ]);