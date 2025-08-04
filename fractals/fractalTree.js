export function drawTree(ctx, depth) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const startX = width / 2;
  const startY = height - 50;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  drawBranch(ctx, startX, startY, -90, depth, 100);
}

function drawBranch(ctx, x, y, angle, depth, length) {
  if (depth === 0) return;

  const rad = angle * (Math.PI / 180);
  const x2 = x + Math.cos(rad) * length;
  const y2 = y + Math.sin(rad) * length;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  drawBranch(ctx, x2, y2, angle - 25, depth - 1, length * 0.7);
  drawBranch(ctx, x2, y2, angle + 25, depth - 1, length * 0.7);
}
