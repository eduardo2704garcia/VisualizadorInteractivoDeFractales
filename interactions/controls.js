// interactions/controls.js
export function enableKeyboardControls(app, viewport) {
  const baseMoveSpeed = 20;
  const zoomSpeed = 0.1;
  const minScale = 0.2;
  const maxScale = 5.0;

  // Para no registrar múltiples veces si llamas a enable varias veces
  // (opcional: guarda el handler en la propia función/objeto)
  const handler = (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    const currentScale = viewport.scale.x;
    const adjustedMove = baseMoveSpeed / currentScale;

    const k = e.key?.toLowerCase();
    switch (k) {
      case 'w': // mover arriba (recordando eje y hacia abajo en pantalla)
        viewport.y += adjustedMove;
        break;
      case 's':
        viewport.y -= adjustedMove;
        break;
      case 'a':
        viewport.x += adjustedMove;
        break;
      case 'd':
        viewport.x -= adjustedMove;
        break;
      default: {
        // Zoom con + / - y también con teclado numérico
        if (k === '+' || e.code === 'NumpadAdd' || k === '=') {
          zoom(1);
        } else if (k === '-' || e.code === 'NumpadSubtract') {
          zoom(-1);
        }
      }
    }
  };

  window.addEventListener('keydown', handler);

  function zoom(direction) {
    const currentScale = viewport.scale.x;
    const delta = zoomSpeed * direction;
    const newScale = Math.min(Math.max(currentScale + delta, minScale), maxScale);

    // Mantener el centro de la pantalla fijo durante el zoom
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;

    const worldPos = {
      x: (centerX - viewport.x) / currentScale,
      y: (centerY - viewport.y) / currentScale,
    };

    viewport.scale.set(newScale);
    viewport.x = centerX - worldPos.x * newScale;
    viewport.y = centerY - worldPos.y * newScale;
  }
}
