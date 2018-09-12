var  JOY_DIVISON_FILE = 'assets/Joy_Division-Disorder.mp3';
var start = 60;
var end = 80;
var NUMLINES = 32;
var p = 0;
var CUT_SPEC = NUMLINES*4

function preload() {
	joydivtrack = loadSound(JOY_DIVISON_FILE);
}

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.mouseClicked(togglePlay);
	stroke(255);
	joydivtrack.setVolume(0.5);
	// joydivtrack.amp(0.2);
	joydivtrack.play();
	fft = new p5.FFT(0.9, 1024);
}

function draw() {
	background(0);
	rect(0, 0 , 1, 1);

	var spectrum = fft.analyze();
	stroke(255);
	strokeWeight(2);
	fill(0);
	var sep = 0;
	var mult = 4;
	for (var j = 0; j < (spectrum.length - CUT_SPEC); j+=NUMLINES) {
		beginShape();
		p = 0;
		mult += 2;
		for (var i = j; i < (j + NUMLINES + 1); i++) {
			var beforeY = cos(map(p, 0, NUMLINES/2, radians(-180), radians(0)));
			var x = map(p, 0, NUMLINES, 0, width);
			var y = map(beforeY*spectrum[i], 0, 255, end + sep, start + sep);
			curveVertex(x, y);
			p++;
		}
		endShape();
		sep += 20;
	}

	// var waveform = fft.waveform();
	// // var avgs = fft.linAverages(86);
	// fill(0);
	// beginShape();
	// stroke(255);
	// strokeWeight(1);
	// for (var i = 0; i< avgs.length; i++){
	// 	sinc = sin(PI*radians(avgs[i]))/(PI*radians(avgs[i]));
	// 	var x = map(i, 0, avgs.length, 0, width);
	// 	var y = map(sinc, -1, 1, 0, height);
	// 	vertex(x,y);
	// }
	// endShape();
}

function togglePlay() {
	if (joydivtrack.isPlaying()) {
	  joydivtrack.pause();
	} else {
	  joydivtrack.loop();
	}
  }