export function drawMandelbrot(ctx) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const imageData = ctx.createImageData(width, height);
  const maxIter = 100;

  // Coordenadas en el plano complejo
  const xmin = -2.5, xmax = 1;
  const ymin = -1, ymax = 1;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      const x0 = xmin + (px / width) * (xmax - xmin);
      const y0 = ymin + (py / height) * (ymax - ymin);

      let x = 0, y = 0, iteration = 0;
      while (x * x + y * y <= 4 && iteration < maxIter) {
        const xtemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xtemp;
        iteration++;
      }

      const color = iteration === maxIter ? 0 : (iteration * 255) / maxIter;
      const index = (py * width + px) * 4;
      imageData.data[index] = color;       // R
      imageData.data[index + 1] = 0;       // G
      imageData.data[index + 2] = color;   // B
      imageData.data[index + 3] = 255;     // A
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
