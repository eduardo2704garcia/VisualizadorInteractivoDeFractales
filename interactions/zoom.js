let scale = 1;
let rotation = 0;

export function zoomIn(factor = 0.1) {
  scale += factor;
}

export function zoomOut(factor = 0.1) {
  scale = Math.max(0.1, scale - factor);
}

export function rotateLeft(angleStep = Math.PI / 180 * 5) {
  rotation -= angleStep;
}

export function rotateRight(angleStep = Math.PI / 180 * 5) {
  rotation += angleStep;
}

export function getZoomAndRotation() {
  return { scale, rotation };
}

export function resetZoomAndRotation() {
  scale = 1;
  rotation = 0;
}
