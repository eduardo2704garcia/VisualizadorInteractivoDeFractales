import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';

export function drawSierpinski(container, x, y, size, depth) {
  const height = (Math.sqrt(3) / 2) * size;

  function drawFilledTriangle(g, x, y, size, depth) {
    const h = (Math.sqrt(3) / 2) * size;
    const greenValue = Math.max(0, 255 - depth * 30);
    const color = (0x00 << 16) | (greenValue << 8) | 0x00;

    g.beginFill(color);
    g.moveTo(x, y);
    g.lineTo(x + size / 2, y + h);
    g.lineTo(x - size / 2, y + h);
    g.lineTo(x, y);
    g.endFill();
  }

  function recursiveDraw(x, y, size, depth) {
    if (depth === 0) {
      const graphics = new PIXI.Graphics();
      drawFilledTriangle(graphics, x, y, size, depth);
      container.addChild(graphics);
    } else {
      const newSize = size / 2;
      const h = (Math.sqrt(3) / 2) * newSize;

      recursiveDraw(x, y, newSize, depth - 1);
      recursiveDraw(x - newSize / 2, y + h, newSize, depth - 1);
      recursiveDraw(x + newSize / 2, y + h, newSize, depth - 1);
    }
  }

  recursiveDraw(x, y, size, depth);
}
