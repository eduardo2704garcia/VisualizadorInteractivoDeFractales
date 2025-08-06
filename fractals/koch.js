import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';

export function drawKoch(container, x, y, size, depth) {
  const graphics = new PIXI.Graphics();
  graphics.lineStyle(1.5, 0x87ceeb); // azul cielo

  const h = Math.sqrt(3) / 2 * size;
  const p1 = { x: x, y: y };
  const p2 = { x: x + size, y: y };
  const p3 = { x: x + size / 2, y: y - h };

  drawKochSide(p1, p2, depth);
  drawKochSide(p2, p3, depth);
  drawKochSide(p3, p1, depth);

  container.addChild(graphics);

  function drawKochSide(a, b, depth) {
    if (depth === 0) {
      graphics.moveTo(a.x, a.y);
      graphics.lineTo(b.x, b.y);
      return;
    }

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const p1 = { x: a.x + dx / 3, y: a.y + dy / 3 };
    const p2 = { x: a.x + 2 * dx / 3, y: a.y + 2 * dy / 3 };

    const angle = Math.PI / 3;
    const px = p1.x + Math.cos(angle) * (p2.x - p1.x) - Math.sin(angle) * (p2.y - p1.y);
    const py = p1.y + Math.sin(angle) * (p2.x - p1.x) + Math.cos(angle) * (p2.y - p1.y);
    const peak = { x: px, y: py };

    drawKochSide(a, p1, depth - 1);
    drawKochSide(p1, peak, depth - 1);
    drawKochSide(peak, p2, depth - 1);
    drawKochSide(p2, b, depth - 1);
  }
}