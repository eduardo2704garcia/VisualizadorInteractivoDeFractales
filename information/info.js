// information/info.js
const INFO = {
  sierpinski: {
    title: "Triángulo de Sierpinski",
    description: `
      El triángulo de Sierpinski se genera dividiendo un triángulo equilátero en
      cuatro subtriángulos y eliminando el central, repitiendo recursivamente.
      Es auto-similar, simple en reglas y complejo en resultado.
    `,
    image: "/information/img/sierpinski.jpeg"
  },
  koch: {
    title: "Curva de Koch",
    description: `
      Parte de un segmento. En cada iteración se divide en tres partes y la central
      se reemplaza por dos lados de un triángulo equilátero. Longitud infinita,
      área finita: un clásico de geometría fractal.
    `,
    image: "/information/img/kOCH.png"
  },
  fractalTree: {
    title: "Árbol Fractal",
    description: `
      A partir de un tronco surgen ramas a cierto ángulo y escala, y cada rama
      repite el proceso. Modela crecimiento natural con auto-similitud.
    `,
    image: "/information/img/tree.jpeg"
  },
  mandelbrot: {
    title: "Conjunto de Mandelbrot",
    description: `
      Se basa en la iteración z_{n+1} = z_n² + c (plano complejo) con z₀=0.
      Si la secuencia permanece acotada, c pertenece al conjunto. El borde
      revela patrones infinitos y auto-similares.
    `,
    image: "/information/img/mandelbrot.png"
  },
  julia: {
    title: "Conjunto de Julia",
    description: `
      Similar a Mandelbrot, pero fijando una constante c y variando z₀.
      Según c, el conjunto puede ser conexo o disconexo y produce formas
      muy diversas y artísticas.
    `,
    image: "/information/img/julia.jpeg"
  }
};

export function getInfo(key) {
  return INFO[key] ?? null;
}

export default INFO;
