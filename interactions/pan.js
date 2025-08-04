let offsetX = 0;
let offsetY = 0;

export function movePan(direction, step = 10) {
  switch (direction) {
    case 'up': offsetY -= step; break;
    case 'down': offsetY += step; break;
    case 'left': offsetX -= step; break;
    case 'right': offsetX += step; break;
  }
}

export function getPan() {
  return { offsetX, offsetY };
}

export function resetPan() {
  offsetX = 0;
  offsetY = 0;
}
