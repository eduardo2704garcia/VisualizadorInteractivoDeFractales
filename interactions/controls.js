let active = true;
export function setKeyboardActive(v){ active = !!v; }

export function enableKeyboardControls(app, viewport) {
  const baseMoveSpeed = 20, zoomSpeed = 0.1, minScale = 0.2, maxScale = 5.0;

  window.addEventListener('keydown', (e) => {
    if (!active) return;                                   // <<— clave
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    const currentScale = viewport.scale.x;
    const adjustedMove = baseMoveSpeed / currentScale;

    const k = e.key.toLowerCase();
    if (k === 'w') viewport.y += adjustedMove;
    else if (k === 's') viewport.y -= adjustedMove;
    else if (k === 'a') viewport.x += adjustedMove;
    else if (k === 'd') viewport.x -= adjustedMove;
    else if (k === '+' || k === '=' || e.code === 'NumpadAdd') zoom(1);
    else if (k === '-' || e.code === 'NumpadSubtract')       zoom(-1);

    function zoom(direction){
      const delta = zoomSpeed * direction;
      const newScale = Math.min(Math.max(currentScale + delta, minScale), maxScale);
      const cx = app.screen.width/2, cy = app.screen.height/2;
      const wx = (cx - viewport.x) / currentScale;
      const wy = (cy - viewport.y) / currentScale;
      viewport.scale.set(newScale);
      viewport.x = cx - wx * newScale;
      viewport.y = cy - wy * newScale;
    }
  });
}
