var  JOY_DIVISON_FILE = 'assets/Joy_Division-Disorder.mp3';
var start = 100;
var end = 135;
var NUMLINES = 32;
var p = 0;
var CUT_SPEC = NUMLINES*10;
var inc = 0.001;
var starting = 0.0;
var LEN = 1024/NUMLINES - 10;
var randoms = new Array(LEN).fill(0);

function preload() {
	joydivtrack = loadSound(JOY_DIVISON_FILE);
}

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.mouseClicked(togglePlay);
	stroke(255);
	joydivtrack.setVolume(0.5);
	joydivtrack.play();
	fft = new p5.FFT(0.9, 1024);
	noiseDetail(8, 0.8);
	for (var i = 0; i < 1024/NUMLINES - 10; i++)
		randoms[i] = random();
}

function draw() {
	background(0);
	textAlign(CENTER);
	fill(255);
	textSize(36);
	text("Joy Division", width/2, 40);
	textSize(24);
	text("Unknown Pleasures", width/2, 80);
	fill(0);
	textSize(24);
	text("Click to Play/Pause", width/2, height - 10);
	var spectrum = fft.analyze();
	stroke(255);
	strokeWeight(2);
	var sep = 0;
	var mult = 1.5;
	for (var j = 0; j < (spectrum.length - CUT_SPEC); j+=NUMLINES) {
		var xoff = randoms[j/NUMLINES] + starting;
		beginShape();
		p = 0;
		// mult *= 1.15;
		mult *= 1.1;
		for (var i = j; i < (j + NUMLINES + 1); i++) {
			var beforeY = 0.0;
			if (p <= NUMLINES/2) {
				beforeY = mult*cos(map(p, 0, NUMLINES/2, radians(-180), radians(0)));
				if (beforeY <= 0.0)
					beforeY = 0.0;
			} else {
				beforeY = mult*cos(map(p, NUMLINES/2 + 1, NUMLINES, radians(0), radians(180)));
				if (beforeY <= 0.0)
					beforeY = 0.0;
			}
			var addNoise = map(noise(xoff), 0, 1, -10, 5);
			xoff += 0.08;
			var x = map(p, 0, NUMLINES, width/5, 4*width/5);
			var y = 0;
			if (joydivtrack.isPlaying()) {
				if (beforeY*spectrum[i] == 0) {
					y = end + sep - addNoise;
					if (addNoise < 0) {
						y = end + sep;
					}
				} else {
					if (addNoise < 0) {
						addNoise = 0;
					}
					y = map(beforeY*spectrum[i], 0, 255, end + sep, start + sep) - addNoise;
				}
			} else {
				y = map(beforeY*spectrum[i], 0, 255, end + sep, start + sep);
			}
			// console.log(start + sep, end + sep, y);
			curveVertex(x, y);
			p++;	
		}
		endShape();
		sep += 22;
	}
	starting += inc;
}

function togglePlay() {
	if (joydivtrack.isPlaying()) {
	  joydivtrack.pause();
	} else {
	  joydivtrack.loop();
	}
  }