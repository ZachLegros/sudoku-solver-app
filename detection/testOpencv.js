const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
const cv = require('opencv.js');
// This is our program. This time we use JavaScript async / await and promises to handle asynchronicity.
(async () => {
  // before loading opencv.js we emulate a minimal HTML DOM. See the function declaration below.
  installDOM();
  // using node-canvas, we an image file to an object compatible with HTML DOM Image and therefore with cv.imread()
  const image = await loadImage('./images/sudoku1.jpg');
  const src = cv.imread(image);
  const dst = new cv.Mat();
  // const M = cv.Mat.ones(9, 9, cv.CV_8U);
  // const anchor = new cv.Point(-1, -1);
  // cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());


  //test1
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
  let ksize = new cv.Size(11, 11);
  cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.adaptiveThreshold(dst, dst, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY_INV, 3, 2);

  let M = cv.Mat.ones(3, 3, cv.CV_8U);
  let anchor = new cv.Point(-1, -1);


  cv.dilate(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  // cv.erode(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

  ksize = new cv.Size(15, 15);
  cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.threshold(dst, dst, 120, 255, cv.THRESH_BINARY);

  M = cv.Mat.ones(11, 11, cv.CV_8U);
  // You can try more different parameters
  cv.morphologyEx(dst, dst, cv.MORPH_CLOSE, M);

  
  // contour detection
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  // You can try more different parameters
  cv.findContours(dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);


  // sort all contours by their area
  let contourArr = [];

  for (let i=0; i < contours.size(); i++) {
    contourArr[i] = contours.get(i);
  }

  //sort by descending order
  contourArr.sort(function(a, b){return cv.contourArea(b) - cv.contourArea(a)});

  let sortedContours = new cv.MatVector();

  for (let i=0; i < contourArr.length; i++) {
    sortedContours.push_back(contourArr[i]);
  }

  //find and draw the largest contour
  let result = cv.Mat.zeros(dst.cols, dst.rows, cv.CV_8UC3)  // show contours
  let color = new cv.Scalar(255, 255, 255);
  // cv.drawContours(result, sortedContours, 0, color, 5, cv.LINE_8, hierarchy, 100);
  
  let biggestContour = contourArr[0];
  
  

  let peri = cv.arcLength(biggestContour, true);
  let contourApprox = new cv.Mat();
  cv.approxPolyDP(biggestContour, contourApprox, 0.015 * peri, true);

  if (contourApprox.rows != 4) {
    // return false or something like that
  }

  let a = new cv.MatVector()
  a.push_back(contourApprox);
  cv.drawContours(result, a, 0, color, 5, cv.LINE_8);
  
  
  console.log(contourApprox.intPtr(3, 0));

  

  // we create an object compatible HTMLCanvasElement
  const canvas = createCanvas(300, 300);
  cv.imshow(canvas, result);
  writeFileSync('./output.jpg', canvas.toBuffer('image/jpeg'));
  src.delete();
  dst.delete();
})();
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