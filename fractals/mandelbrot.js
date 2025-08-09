import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';

export class MandelbrotExplorer {
  constructor(container, app, maxIterations = 100) {
    this.container = container;
    this.app = app;
    this.width = app.screen.width;
    this.height = app.screen.height;
    this.maxIterations = maxIterations;
    this.zoom = 250;
    this.offsetX = this.width / 2;
    this.offsetY = this.height / 2;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

this.sprite = PIXI.Sprite.from(this.canvas);
this.sprite.anchor.set(0.5);
this.sprite.position.set(0, 0);
this.container.addChild(this.sprite);


    this.render();
  }

  render(newMaxIterations) {
    if (newMaxIterations) this.maxIterations = newMaxIterations;

    const imageData = this.ctx.createImageData(this.width, this.height);
    const data = imageData.data;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let zx = 0, zy = 0;
        const cx = (x - this.offsetX) / this.zoom;
        const cy = (y - this.offsetY) / this.zoom;
        let i = 0;

        while (zx * zx + zy * zy < 4 && i < this.maxIterations) {
          const temp = zx * zx - zy * zy + cx;
          zy = 2 * zx * zy + cy;
          zx = temp;
          i++;
        }

        const idx = (y * this.width + x) * 4;

        const r = i === this.maxIterations ? 11 : (138 * i / this.maxIterations);
        const g = i === this.maxIterations ? 0 : (43 * i / this.maxIterations);
        const b = i === this.maxIterations ? 26 : (130 * i / this.maxIterations);

        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
    this.sprite.texture.update();
  }

  destroy() {
    this.container.removeChild(this.sprite);
    this.sprite.destroy();
  }
}