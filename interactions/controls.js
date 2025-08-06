export function enableKeyboardControls(app, container) {
  const baseMoveSpeed = 20;
  const zoomSpeed = 0.1;
  const minScale = 0.2;
  const maxScale = 5.0;

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    const currentScale = container.scale.x;
    const adjustedMove = baseMoveSpeed / currentScale;

    switch (e.key.toLowerCase()) {
      case 'w':
        container.y += adjustedMove;
        break;
      case 's':
        container.y -= adjustedMove;
        break;
      case 'a':
        container.x += adjustedMove;
        break;
      case 'd':
        container.x -= adjustedMove;
        break;
      case '+':
      case '=':
        zoom(1);
        break;
      case '-':
        zoom(-1);
        break;
    }
  });

  function zoom(direction) {
    const currentScale = container.scale.x;
    const delta = zoomSpeed * direction;
    const newScale = Math.min(Math.max(currentScale + delta, minScale), maxScale);

    // Mantener centro en pantalla
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;

    const worldPos = {
      x: (centerX - container.x) / currentScale,
      y: (centerY - container.y) / currentScale,
    };

    container.scale.set(newScale);
    container.x = centerX - worldPos.x * newScale;
    container.y = centerY - worldPos.y * newScale;
  }
}
