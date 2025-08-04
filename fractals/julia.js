export function drawJulia(ctx) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const imageData = ctx.createImageData(width, height);
  const maxIter = 100;

  const xmin = -1.5, xmax = 1.5;
  const ymin = -1.0, ymax = 1.0;

  // Constante para conjunto de Julia (puedes probar otras)
  const cx = -0.7;
  const cy = 0.27015;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      let x = xmin + (px / width) * (xmax - xmin);
      let y = ymin + (py / height) * (ymax - ymin);

      let iteration = 0;
      while (x * x + y * y <= 4 && iteration < maxIter) {
        const xtemp = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = xtemp;
        iteration++;
      }

      const color = iteration === maxIter ? 0 : (iteration * 255) / maxIter;
      const index = (py * width + px) * 4;
      imageData.data[index] = 0;         // R
      imageData.data[index + 1] = color; // G
      imageData.data[index + 2] = color; // B
      imageData.data[index + 3] = 255;   // A
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
