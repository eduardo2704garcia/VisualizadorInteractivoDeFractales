export function drawKoch(ctx, depth) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const start = { x: 50, y: height / 2 };
  const end = { x: width - 50, y: height / 2 };

  drawSegment(ctx, start, end, depth);
}

function drawSegment(ctx, p1, p2, depth) {
  if (depth === 0) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = "white";
    ctx.stroke();
    return;
  }

  const dx = (p2.x - p1.x) / 3;
  const dy = (p2.y - p1.y) / 3;

  const a = p1;
  const b = { x: p1.x + dx, y: p1.y + dy };
  const d = { x: p1.x + 2 * dx, y: p1.y + 2 * dy };
  const e = p2;

  const angle = Math.PI / 3;
  const c = {
    x: b.x + Math.cos(angle) * (dx) - Math.sin(angle) * (dy),
    y: b.y + Math.sin(angle) * (dx) + Math.cos(angle) * (dy)
  };

  drawSegment(ctx, a, b, depth - 1);
  drawSegment(ctx, b, c, depth - 1);
  drawSegment(ctx, c, d, depth - 1);
  drawSegment(ctx, d, e, depth - 1);
}
