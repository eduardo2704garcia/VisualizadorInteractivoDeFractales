import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';

export function drawSierpinski(container, x, y, size, depth) {
  const colors = [0x4FC3F7, 0x9575CD, 0x4DB6AC]; // azul claro, morado suave, verde agua

  function drawFilledTriangle(g, x, y, size, depthLevel) {
    const h = (Math.sqrt(3) / 2) * size;
    const color = colors[depthLevel % colors.length]; // alterna según el nivel

    g.beginFill(color);
    g.moveTo(x, y);
    g.lineTo(x + size / 2, y + h);
    g.lineTo(x - size / 2, y + h);
    g.lineTo(x, y);
    g.endFill();
  }

  function recursiveDraw(x, y, size, currentDepth) {
    if (currentDepth === 0) {
      const graphics = new PIXI.Graphics();
      // Aquí usamos depth - currentDepth para saber el nivel real
      const depthLevel = depth - currentDepth;
      drawFilledTriangle(graphics, x, y, size, depthLevel);
      container.addChild(graphics);
    } else {
      const newSize = size / 2;
      const h = (Math.sqrt(3) / 2) * newSize;

      recursiveDraw(x, y, newSize, currentDepth - 1);
      recursiveDraw(x - newSize / 2, y + h, newSize, currentDepth - 1);
      recursiveDraw(x + newSize / 2, y + h, newSize, currentDepth - 1);
    }
  }

  recursiveDraw(x, y, size, depth);
}
