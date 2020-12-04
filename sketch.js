let urlJ = "https://api.particle.io/v1/devices/1a002f001847393035313138/pot_value?access_token=ab43326b5e198c725060d07f3c43d4666db7f6c5";
let urlQ = "https://api.particle.io/v1/devices/320026000447393035313138/lit_value?access_token=45d88a4718a60a6c4a60fdde00384ab9c32a2344";
let data = "";
let data2 = "";
let currentTime, prevTime;
let value = 10;
let value2 = 10;


let kMax;
let step;
let n = 80; // number of blobs
let radius = 20; // diameter of the circle
let inter = 1; // difference between the sizes of two blobs
let maxNoise = 250;

let noiseProg = (x) => (x);

function setup() {
  createCanvas(1725, 940);
  //colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();
	//noLoop();
	kMax = random(0.8, 1.0);
	step = 0.01;
	noStroke();
}

function draw() {
   currentTime = millis() %1000;
   if(currentTime < prevTime){
         data = loadJSON(urlJ, processData);
         data2 = loadJSON(urlQ, processData2);
    }

	  blendMode(BLEND);
    background(0);
	  blendMode(ADD);
  let t = frameCount/120;
  for (let i = n; i > 0; i--) {
		let alpha = pow(1 - noiseProg(i / n), 1/value *250);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
		
		fill(255, 0, 0, alpha*255);
    blob(size, width/2, height/2, k, t - i * step, noisiness);
		
		fill(0, 255, 0, alpha*255);
    blob(size, width/2, height/2, k, t - i * step + 0.2, noisiness);
		
		fill(0, 0, 255, alpha*255);
    blob(size, width/2, height/2, k, t - i * step + 0.4, noisiness);
  }

  fill(255,80,0);
  textSize(24 + value/15);
  text('I NEED MORE LIGHT', 30, 80);

  prevTime = currentTime;
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 8;
  for (let theta = 0; theta <= 720 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		/*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
		*/
		r1 = cos(theta)+4;
		r2 = sin(theta)+4;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}

function processData(data){
    console.log(data.result);
    value = map(parseInt(data.result), 0, 4096, 0, 400);
    console.log(value);
}
function processData2(data2){
    console.log(data2.result);
    value2 = map(parseInt(data2.result), 0, 4096, 0, 400);
    console.log(value2);
}