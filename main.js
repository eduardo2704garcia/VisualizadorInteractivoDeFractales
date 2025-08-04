import { drawKoch } from './Fractals/koch.js';
import { drawSierpinski } from './Fractals/sierpinski.js';
import { drawMandelbrot } from './Fractals/mandelbrot.js';
import { drawJulia } from './Fractals/julia.js';
import { drawTree } from './Fractals/fractalTree.js';

import { movePan, getPan, resetPan } from './interactions/pan.js';
import { zoomIn, zoomOut, rotateLeft, rotateRight, getZoomAndRotation, resetZoomAndRotation } from './interactions/zoom.js';

const canvas = document.getElementById("fractalCanvas");
const ctx = canvas.getContext("2d");

const fractalType = document.getElementById("fractalType");
const depthSlider = document.getElementById("depthSlider");
const depthValue = document.getElementById("depthValue");

const offscreenCanvas = document.createElement("canvas");
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
const offCtx = offscreenCanvas.getContext("2d");

function drawToOffscreen() {
  offCtx.clearRect(0, 0, canvas.width, canvas.height);
  const type = fractalType.value;
  const depth = parseInt(depthSlider.value);

  switch (type) {
    case 'koch': drawKoch(offCtx, depth); break;
    case 'sierpinski': drawSierpinski(offCtx, depth); break;
    case 'mandelbrot': drawMandelbrot(offCtx); break;
    case 'julia': drawJulia(offCtx); break;
    case 'tree': drawTree(offCtx, depth); break;
  }
}

function applyTransformations() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const { offsetX, offsetY } = getPan();
  const { scale, rotation } = getZoomAndRotation();

  ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
  ctx.scale(scale, scale);
  ctx.rotate(rotation);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  ctx.drawImage(offscreenCanvas, 0, 0);
}

function drawFractal() {
  drawToOffscreen();
  applyTransformations();
}

function handleKey(event) {
  switch (event.key) {
    case 'ArrowUp': movePan('up'); break;
    case 'ArrowDown': movePan('down'); break;
    case 'ArrowLeft': movePan('left'); break;
    case 'ArrowRight': movePan('right'); break;
    case 'w': case 'W': zoomIn(); break;
    case 's': case 'S': zoomOut(); break;
    case 'a': case 'A': rotateLeft(); break;
    case 'd': case 'D': rotateRight(); break;
    case 'r': case 'R':
      resetPan();
      resetZoomAndRotation();
      break;
  }
  applyTransformations();
}

fractalType.addEventListener("change", drawFractal);
depthSlider.addEventListener("input", () => {
  depthValue.textContent = depthSlider.value;
  drawFractal();
});
document.getElementById("saveBtn").addEventListener("click", () => {
  const link = document.createElement('a');
  link.download = 'fractal.png';
  link.href = canvas.toDataURL();
  link.click();
});

window.addEventListener("keydown", handleKey);
window.onload = drawFractal;
