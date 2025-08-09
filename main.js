import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';
import { drawSierpinski } from './fractals/sierpinski.js';
import { drawKoch } from './fractals/koch.js';
import { drawTree } from './fractals/fractalTree.js';
import { MandelbrotExplorer } from './fractals/mandelbrot.js';
import { JuliaExplorer } from './fractals/julia.js';
import { enableKeyboardControls, setKeyboardActive } from './interactions/controls.js';

let mandelbrotExplorer = null;
let juliaExplorer = null;
let currentFractal = 'sierpinski';

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x000000
});
document.body.appendChild(app.view);

const viewport = new PIXI.Container();
const content  = new PIXI.Container();
viewport.addChild(content);
app.stage.addChild(viewport);
viewport.position.set(app.screen.width / 2, app.screen.height / 2);

// UI Elements
const depthSlider = document.getElementById('depthSlider');
const depthValue = document.getElementById('depthValue');
const rotationSlider = document.getElementById('rotationSlider');
const rotationValue = document.getElementById('rotationValue');
const saveBtn = document.getElementById('saveBtn');

// Update depth and re-render
depthSlider.addEventListener('input', () => {
  depthValue.textContent = depthSlider.value;
  renderFractal({ recenter: false }); // <— mantiene pan/zoom
});


// Update rotation
rotationSlider.addEventListener('input', () => {
  if (rotationSlider.disabled) return; // no hacer nada si está off
  rotationValue.textContent = rotationSlider.value;
  content.rotation = parseFloat(rotationSlider.value) * (Math.PI / 180);
});


window.addEventListener('keydown', (e) => {
  let angle = parseFloat(rotationSlider.value);
  if (e.key === 'ArrowRight') angle = (angle + 5) % 360;
  else if (e.key === 'ArrowLeft') angle = (angle - 5 + 360) % 360;
  else return;

  // Ignora en fractales de píxeles
  if (currentFractal === 'julia' || currentFractal === 'mandelbrot') return;

  rotationSlider.value = angle;
  rotationValue.textContent = angle;
  content.rotation = angle * (Math.PI / 180);
});



// Zoom/Pan activation
function toggleZoomPan(enable) {
  if (enable) {
    enableKeyboardControls(app, viewport);
  } else {
    // Desactiva eventos del viewport si no quieres mover en mandelbrot/julia
    viewport.eventMode = 'none';
    viewport.removeAllListeners();
    // OJO: no reseteamos scale/position aquí para no perder la vista
  }
}


// Render fractal
function renderFractal({ recenter = false } = {}) {
  if (mandelbrotExplorer) { mandelbrotExplorer.destroy(); mandelbrotExplorer = null; }
  if (juliaExplorer) { juliaExplorer.destroy(); juliaExplorer = null; }

  // limpiar SOLO el contenido
  content.removeChildren();


  const depth = parseInt(depthSlider.value);
  const mandelbrotIterations = depth * 50;
  const juliaIterations = depth * 50;

  switch (currentFractal) {
    case 'sierpinski':
      toggleZoomPan(true);
      // Dibuja relativo a pantalla si ya lo tenías así; luego el pivot lo centra
      setRotationEnabled(true);
      content.rotation = parseFloat(rotationSlider.value) * (Math.PI / 180);
      drawSierpinski(content, app.screen.width / 2, 200, 400, depth);
      break;

    case 'koch':
      toggleZoomPan(true);
      setRotationEnabled(true);
      content.rotation = parseFloat(rotationSlider.value) * (Math.PI / 180);
      const size = Math.min(app.screen.width, app.screen.height) * 0.6;
      const centerX = app.screen.width / 2;
      const centerY = app.screen.height / 2 + size * Math.sqrt(3) / 6;
      drawKoch(content, centerX - size / 2, centerY, size, depth);
      break;

    case 'fractalTree':
      toggleZoomPan(true);
      setRotationEnabled(true);
      content.rotation = parseFloat(rotationSlider.value) * (Math.PI / 180);
      const trunkLength = app.screen.height / 4;
      const startX = app.screen.width / 2;
      const startY = app.screen.height - 20;
      drawTree(content, startX, startY, trunkLength, Math.PI / 2, depth);
      break;

    case 'mandelbrot':
      toggleZoomPan(false);
      setRotationEnabled(false);
      content.rotation = 0;
      mandelbrotExplorer = new MandelbrotExplorer(content, app, mandelbrotIterations);
      break;

    case 'julia':
      toggleZoomPan(false);
      setRotationEnabled(false);
      content.rotation = 0;
      juliaExplorer = new JuliaExplorer(content, app, { cRe: -0.70176, cIm: -0.3842 }, juliaIterations);
      break;
  }

  // Centrar el FRACTAL respecto a sí mismo (pivot + pos local), sin mover la cámara
  const b = content.getLocalBounds();
  content.pivot.set(b.x + b.width / 2, b.y + b.height / 2);
  content.position.set(0, 0);

  // Solo si quieres “resetear la cámara” (p.ej. al cambiar de fractal)
  if (recenter) {
    viewport.scale.set(1);
    viewport.rotation = 0;
    viewport.position.set(app.screen.width / 2, app.screen.height / 2);
  }

  document.body.style.backgroundColor = '#000';
}



// Handle fractal button clicks
document.querySelectorAll('#fractalButtons button').forEach(button => {
  button.addEventListener('click', () => {
    currentFractal = button.getAttribute('data-fractal');
    renderFractal({ recenter: true }); // <— opcional; pon false si prefieres mantener vista
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

function setRotationEnabled(enabled) {
  rotationSlider.disabled = !enabled;
  rotationSlider.classList.toggle('disabled', !enabled);

  if (!enabled) {
    rotationSlider.value = 0;
    rotationValue.textContent = '0';
    content.rotation = 0; // asegúrate de que no quede rotado
  }
}



// Initial render
renderFractal();
