function generarSudoku (dificultad = 1) {
  // Creamos un tablero vacío de 9x9
  const tablero = Array.from({ length: 9 }, () => new Array(9).fill(0))

  // Rellenamos la diagonal principal con números aleatorios del 1 al 9
  // Rellenar diagonal principal con números aleatorios
  for (let i = 0; i < 9; i += 3) {
    const numero = Math.floor(Math.random() * 9) + 1 // número aleatorio entre 1 y 9
    tablero[i][i] = numero
  }

  // Rellenamos el resto del tablero con backtracking
  rellenarTablero(tablero)

  // Creamos una copia del tablero para ir quitando casillas según la dificultad
  const tableroIncompleto = tablero.map((fila) => [...fila])

  // Quitamos casillas según la dificultad
  const numCasillas = dificultad * 5
  for (let i = 0; i < numCasillas; i++) {
    let fila, columna
    do {
      fila = Math.floor(Math.random() * 9)
      columna = Math.floor(Math.random() * 9)
    } while (tableroIncompleto[fila][columna] === 0)
    tableroIncompleto[fila][columna] = 0
  }

  return tableroIncompleto
}

function rellenarTablero (tablero) {
  // Buscamos la siguiente casilla vacía
  const [fila, columna] = buscarCasillaVacia(tablero)

  // Si no hay casillas vacías, hemos terminado
  if (fila === -1) {
    return true
  }

  // Probamos números del 1 al 9
  for (let i = 1; i <= 9; i++) {
    if (esNumeroValido(tablero, fila, columna, i)) {
      tablero[fila][columna] = i
      if (rellenarTablero(tablero)) {
        return true
      }
      tablero[fila][columna] = 0
    }
  }

  // Si no hay ningún número válido, retrocedemos
  return false
}

function buscarCasillaVacia (tablero) {
  for (let fila = 0; fila < 9; fila++) {
    for (let columna = 0; columna < 9; columna++) {
      if (tablero[fila][columna] === 0) {
        return [fila, columna]
      }
    }
  }
  return [-1, -1]
}

function esNumeroValido (tablero, fila, columna, numero) {
  // Comprobamos si el número ya está en la fila
  for (let i = 0; i < 9; i++) {
    if (tablero[fila][i] === numero) {
      return false
    }
  }

  // Comprobamos si el número ya está en la columna
  for (let i = 0; i < 9; i++) {
    if (tablero[i][columna] === numero) {
      return false
    }
  }
  // Comprobamos si el número ya está en el cuadrante
  const cuadranteFila = Math.floor(fila / 3) * 3
  const cuadranteColumna = Math.floor(columna / 3) * 3
  for (let i = cuadranteFila; i < cuadranteFila + 3; i++) {
    for (let j = cuadranteColumna; j < cuadranteColumna + 3; j++) {
      if (tablero[i][j] === numero) {
        return false
      }
    }
  }

  // Si no se ha encontrado el número en la fila, columna o cuadrante, es válido
  return true
}

const resolverSudoku = (t) => {
  const tablero = [...t].map(row => [...row])

  rellenarTablero(tablero)

  return tablero
}

export { generarSudoku, resolverSudoku, buscarCasillaVacia }

// La función `generarSudoku` recibe como parámetro la dificultad, un número entero del 1 al 10. Primero crea un tablero vacío de 9x9 y lo rellena con la diagonal principal con números aleatorios del 1 al 9. Luego llama a la función `rellenarTablero`, que rellena el resto del tablero con backtracking siguiendo las reglas del Sudoku.

// Una vez que el tablero está completo, la función crea una copia del tablero para ir quitando casillas según la dificultad. El número de casillas que se quitan depende de la dificultad, y se calcula multiplicando la dificultad por 5. Finalmente, la función devuelve el tablero incompleto.

// Cada vez que se ejecuta la función, se generará un tablero de Sudoku diferente gracias a los números aleatorios que se utilizan para rellenar la diagonal principal y para quitar las casillas según la dificultad.

// Espero que te sea útil esta implementación. Si tienes alguna duda o necesitas más ayuda, no dudes en preguntar.
