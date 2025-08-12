import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';

export class JuliaExplorer {
    constructor(container, app, options = {}, maxIter = 150) {
        this.container = container;
        this.app = app;
        this.width = app.screen.width;
        this.height = app.screen.height;

        this.cRe = options.cRe ?? -0.8;
        this.cIm = options.cIm ?? 0.156;

        this.zoom = 1.0;
        this.maxIter = maxIter;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');

        this.texture = null;
        this.sprite = null;

        this.render();
    }

    render() {
        const imageData = this.ctx.createImageData(this.width, this.height);
        const pixels = imageData.data;
        const scale = 3.0 / this.zoom;

        for (let py = 0; py < this.height; py++) {
            for (let px = 0; px < this.width; px++) {
                let zx = (px - this.width / 2) * scale / this.width;
                let zy = (py - this.height / 2) * scale / this.width;
                let iter = 0;

                while (zx * zx + zy * zy < 4 && iter < this.maxIter) {
                    const xtemp = zx * zx - zy * zy + this.cRe;
                    zy = 2 * zx * zy + this.cIm;
                    zx = xtemp;
                    iter++;
                }

                const i = (py * this.width + px) * 4;
                const value = iter < this.maxIter ? 1 : 0;

                const r = value ? 0 : 0;
                const g = value ? (204 * iter / this.maxIter) : 26;
                const b = value ? (153 + 102 * iter / this.maxIter) : 11;

                pixels[i] = r;
                pixels[i + 1] = g;
                pixels[i + 2] = b;
                pixels[i + 3] = 255;
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
        this.updateTexture();
    }

    updateTexture() {
        if (this.sprite) this.container.removeChild(this.sprite);
        this.sprite = PIXI.Sprite.from(this.canvas);
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(0, 0);
        this.container.addChild(this.sprite);
    }

    destroy() {
        if (this.sprite) {
            this.container.removeChild(this.sprite);
            this.sprite.destroy();
        }
    }
}