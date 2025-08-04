export function drawSierpinski(ctx, depth) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const p1 = { x: width / 2, y: 50 };
  const p2 = { x: 50, y: height - 50 };
  const p3 = { x: width - 50, y: height - 50 };

  ctx.fillStyle = "white";
  drawTriangle(ctx, p1, p2, p3, depth);
}

function drawTriangle(ctx, p1, p2, p3, depth) {
  if (depth === 0) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fill();
    return;
  }

  const mid12 = midpoint(p1, p2);
  const mid23 = midpoint(p2, p3);
  const mid31 = midpoint(p3, p1);

  drawTriangle(ctx, p1, mid12, mid31, depth - 1);
  drawTriangle(ctx, mid12, p2, mid23, depth - 1);
  drawTriangle(ctx, mid31, mid23, p3, depth - 1);
}

function midpoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  };
}
