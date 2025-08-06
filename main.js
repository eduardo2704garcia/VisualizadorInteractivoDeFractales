import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';
import { drawSierpinski } from './Fractals/sierpinski.js';
import { drawKoch } from './fractals/koch.js';
import { drawTree } from './fractals/fractalTree.js';
import { MandelbrotExplorer } from './fractals/mandelbrot.js';
import { JuliaExplorer } from './fractals/julia.js';
import { enableKeyboardControls } from './interactions/controls.js';

let mandelbrotExplorer = null;
let juliaExplorer = null;
let currentFractal = 'sierpinski';

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x000000
});
document.body.appendChild(app.view);

const fractalContainer = new PIXI.Container();
app.stage.addChild(fractalContainer);

// UI Elements
const depthSlider = document.getElementById('depthSlider');
const depthValue = document.getElementById('depthValue');
const rotationSlider = document.getElementById('rotationSlider');
const rotationValue = document.getElementById('rotationValue');
const saveBtn = document.getElementById('saveBtn');

// Update depth and re-render
depthSlider.addEventListener('input', () => {
  depthValue.textContent = depthSlider.value;
  renderFractal();
});

// Update rotation
rotationSlider.addEventListener('input', () => {
  rotationValue.textContent = rotationSlider.value;
  fractalContainer.rotation = parseFloat(rotationSlider.value) * (Math.PI / 180);
});

// Set rotation from keyboard
window.addEventListener('keydown', (e) => {
  let angle = parseFloat(rotationSlider.value);
  if (e.key === 'ArrowRight') {
    angle = (angle + 5) % 360;
  } else if (e.key === 'ArrowLeft') {
    angle = (angle - 5 + 360) % 360;
  } else {
    return;
  }
  rotationSlider.value = angle;
  rotationValue.textContent = angle;
  fractalContainer.rotation = angle * (Math.PI / 180);
});

// Zoom/Pan activation
function toggleZoomPan(enable) {
  if (enable) {
    enableKeyboardControls(app, fractalContainer);
  } else {
    fractalContainer.eventMode = 'none';
    fractalContainer.removeAllListeners();
    fractalContainer.scale.set(1);
    fractalContainer.position.set(app.screen.width / 2, app.screen.height / 2);
  }
}

// Render fractal
function renderFractal() {
  if (mandelbrotExplorer) {
    mandelbrotExplorer.destroy();
    mandelbrotExplorer = null;
  }
  if (juliaExplorer) {
    juliaExplorer.destroy();
    juliaExplorer = null;
  }

  fractalContainer.removeChildren();
  fractalContainer.rotation = parseFloat(rotationSlider.value) * (Math.PI / 180);
  fractalContainer.scale.set(1);
  fractalContainer.pivot.set(0); // No centrado
  fractalContainer.position.set(app.screen.width / 2, app.screen.height / 2);

  const depth = parseInt(depthSlider.value);
  const mandelbrotIterations = depth * 50;
  const juliaIterations = depth * 50;

  switch (currentFractal) {
    case 'sierpinski':
      toggleZoomPan(true);
      drawSierpinski(fractalContainer, app.screen.width / 2, 200, 400, depth);
      break;

    case 'koch':
      toggleZoomPan(true);
      const size = Math.min(app.screen.width, app.screen.height) * 0.6;
      const centerX = app.screen.width / 2;
      const centerY = app.screen.height / 2 + size * Math.sqrt(3) / 6;
      drawKoch(fractalContainer, centerX - size / 2, centerY, size, depth);
      break;

    case 'fractalTree':
      toggleZoomPan(true);
      const trunkLength = app.screen.height / 4;
      const startX = app.screen.width / 2;
      const startY = app.screen.height - 20;
      drawTree(fractalContainer, startX, startY, trunkLength, Math.PI / 2, depth);
      break;

    case 'mandelbrot':
      toggleZoomPan(false);
      mandelbrotExplorer = new MandelbrotExplorer(fractalContainer, app, mandelbrotIterations);
      break;

    case 'julia':
      toggleZoomPan(false);
      juliaExplorer = new JuliaExplorer(fractalContainer, app, {
        cRe: -0.70176,
        cIm: -0.3842
      }, juliaIterations);
      break;
  }

  document.body.style.backgroundColor = (currentFractal === 'julia') ? '#000' : '#000';
}

// Handle fractal button clicks
document.querySelectorAll('#fractalButtons button').forEach(button => {
  button.addEventListener('click', () => {
    currentFractal = button.getAttribute('data-fractal');
    renderFractal();
  });
});

// Save image
saveBtn.addEventListener('click', () => {
  const extractedCanvas = app.renderer.extract.canvas(app.stage);
  const link = document.createElement('a');
  link.download = 'fractal.png';
  link.href = extractedCanvas.toDataURL('image/png');
  link.click();
});

// Initial render
renderFractal();
