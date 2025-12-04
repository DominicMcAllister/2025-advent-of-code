const fs = require('node:fs')

// maximum number of adjacent paper rolls
const MAX_COUNT = 4

function getMatrix(filePath) {
  const data = fs.readFileSync(filePath)
  const rows = data.toString().split('\n')
  const matrix = []
  for (const row of rows) {
    matrix.push(row.split(''))
  }

  return matrix
}

function isPaperRoll(matrix, i, j) {
  return matrix[i]?.[j] === '@'
}

function countAdjacentPaperRolls(matrix, i, j) {
  const directions = [
    [-1 + i, -1 + j],
    [-1 + i, 0 + j],
    [-1 + i, 1 + j],
    [0 + i, -1 + j],
    [0 + i, 1 + j],
    [1 + i, -1 + j],
    [1 + i, 0 + j],
    [1 + i, 1 + j]
  ]
  let count = 0
  for (const [di, dj] of directions) {
    if (isPaperRoll(matrix, di, dj)) {
      count++

      // short circuit if we reach max count
      if (count >= MAX_COUNT) {
        break
      }
    }
  }

  return count
}

function part1(matrix) {
  let answer = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (isPaperRoll(matrix, i, j)) {
        const adjacentRolls = countAdjacentPaperRolls(matrix, i, j)
        if (adjacentRolls < MAX_COUNT) {
          answer++ //could be moved
        }
      }
    }
  }

  console.log(`Answer: ${answer}`)
}

function part2(matrix) {
  let count_moved = 0

  let moved_roll = undefined
  do {
    // assume no rolls moved
    moved_roll = false

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (isPaperRoll(matrix, i, j)) {
          const adjacentRolls = countAdjacentPaperRolls(matrix, i, j)
          if (adjacentRolls < MAX_COUNT) {
            count_moved++
            matrix[i][j] = 'x'
            moved_roll = true
          }
        }
      }
    }
  } while (moved_roll)

  console.log(`Count Moved: ${count_moved}`)
}

part1(getMatrix('./inputs/04-example.txt'))
part1(getMatrix('./inputs/04-input.txt'))

part2(getMatrix('./inputs/04-example.txt'))
part2(getMatrix('./inputs/04-input.txt'))
