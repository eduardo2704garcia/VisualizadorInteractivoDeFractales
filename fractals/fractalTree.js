import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.2.4/dist/pixi.min.mjs';

export function drawTree(container, x, y, length, angle, depth) {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(1.5, 0x556b2f); // verde oliva

    function recursiveDraw(x, y, length, angle, depth) {
        if (depth === 0) return;

        const x2 = x + Math.cos(angle) * length;
        const y2 = y - Math.sin(angle) * length;

        graphics.moveTo(x, y);
        graphics.lineTo(x2, y2);

        const newLength = length * 0.7;
        const spread = Math.PI / 2;
        const startAngle = angle - spread / 2;
        const branches = 5;

        for (let i = 0; i < branches; i++) {
            const branchAngle = startAngle + (i / (branches - 1)) * spread;
            recursiveDraw(x2, y2, newLength, branchAngle, depth - 1);
        }
    }

    recursiveDraw(x, y, length, angle, depth);
    container.addChild(graphics);
}