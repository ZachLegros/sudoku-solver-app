import { Canvas, createCanvas, Image, ImageData, loadImage } from "canvas";
import { JSDOM } from "jsdom";
//const { writeFileSync } = require("fs");
import cv from "opencv.js";

export default async function detect(imgPath) {
  // before loading opencv.js we emulate a minimal HTML DOM. See the function declaration below.
  installDOM();
  // using node-canvas, we an image file to an object compatible with HTML DOM Image and therefore with cv.imread()
  const image = await loadImage(imgPath);
  const src = cv.imread(image);
  const dst = new cv.Mat();

  let width = src.cols;
  let height = src.rows;

  let r = 500 / width;
  let dsize = new cv.Size(500, height * r);
  cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);

  //test1
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
  let ksize = new cv.Size(9, 9);

  cv.GaussianBlur(dst, dst, ksize, 0);

  cv.adaptiveThreshold(
    dst,
    dst,
    255,
    cv.ADAPTIVE_THRESH_MEAN_C,
    cv.THRESH_BINARY_INV,
    7,
    7
  );

  // contour detection
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(
    dst,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );

  // sort all contours by their area
  let contourArr = [];

  for (let i = 0; i < contours.size(); i++) {
    contourArr[i] = contours.get(i);
  }

  //sort by descending order
  contourArr.sort(function (a, b) {
    return cv.contourArea(b) - cv.contourArea(a);
  });

  let sortedContours = new cv.MatVector();

  for (let i = 0; i < contourArr.length; i++) {
    sortedContours.push_back(contourArr[i]);
  }

  //find and draw the largest contour
  let result = cv.Mat.zeros(dst.cols, dst.rows, cv.CV_8UC3); // show contours
  let color = new cv.Scalar(255, 255, 255);

  let biggestContour = contourArr[0];

  let peri = cv.arcLength(biggestContour, true);
  let contourApprox = new cv.Mat();
  cv.approxPolyDP(biggestContour, contourApprox, 0.015 * peri, true);

  if (contourApprox.rows != 4) {
    console.log(`could not detect sudoku`);
    return false;
  }

  let a = new cv.MatVector();
  a.push_back(contourApprox);
  cv.drawContours(src, a, 0, color, 5, cv.LINE_8);
  /*  // we create an object compatible HTMLCanvasElement
  const canvas = createCanvas(300, 300);
  cv.imshow(canvas, src);
  //  writeFileSync(`./out/sudoku${i}.jpg`, canvas.toBuffer('image/jpeg'));
  src.delete();
  dst.delete(); */
  return true;
}

// Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
// Although a complete emulation can be archived, here we only define those globals used
// by cv.imread() and cv.imshow().
function installDOM() {
  const dom = new JSDOM();
  global.document = dom.window.document;
  // The rest enables DOM image and canvas and is provided by node-canvas
  global.Image = Image;
  global.HTMLCanvasElement = Canvas;
  global.ImageData = ImageData;
  global.HTMLImageElement = Image;
}
