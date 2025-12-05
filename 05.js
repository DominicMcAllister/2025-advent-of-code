const fs = require('node:fs')


function parseInput(filePath) {
  const ranges = []
  const ingredients = []

  const data = fs.readFileSync(filePath)
  const rows = data.toString().split('\n')
  for (const row of rows) {
    if (row.includes('-')) {
      const [start, end] = row.split('-').map(Number)
      ranges.push({start, end})
    } else if (row != '') {
      ingredients.push(Number(row))
    }
  }

  return {
    ranges,
    ingredients
  }
}

function part1({ranges, ingredients} = opts) {
  const answer = ingredients.filter(ingredient => !!ranges.find(range => ingredient >= range.start && ingredient <= range.end))
  console.log(`answer: ${answer.length}`)
}

function part2({ranges} = opts) {
  const ordered_ranges = ranges.sort((a, b) => a.start - b.start)

  const new_ranges = []
  for (let i = 0; i < ordered_ranges.length; i++) {
    // does this range fall into a previous range?
    const current_range = ordered_ranges[i]
    const included_in_previous_range = new_ranges.find(range => current_range.start >= range.start && current_range.start <= range.end)

    // if not, add it
    if (!included_in_previous_range) {
      new_ranges.push(current_range)
    // else does the current range extend the previous range
    } else if (included_in_previous_range.end < current_range.end) {
      included_in_previous_range.end = current_range.end
    }
  }

  let answer = 0
  for (const range of new_ranges) {
    answer += (range.end - range.start + 1)
  }

  console.log(`answer: ${answer}`)
}

// part1(parseInput('./inputs/05-example.txt'))
// part1(parseInput('./inputs/05-input.txt'))

// part2(parseInput('./inputs/05-example.txt'))
part2(parseInput('./inputs/05-input.txt'))
