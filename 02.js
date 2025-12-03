const fs = require('node:fs')

function part1(data) {
  const ranges = data.toString().split(',')

  let answer = 0
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number)

    for (let i = start; i <= end; i++) {
      const as_str = i.toString()
      if (as_str.length % 2 === 0) {
        const mid = as_str.length / 2
        const left = as_str.slice(0, mid)
        const right = as_str.slice(mid)

        if (left === right) {
          answer += i
          console.log(`Found even double: ${as_str} (${left} vs ${right})`)
        }
      }
    }
  }

  console.log(`Answer: ${answer}`)
}

function part2(data) {
  function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  const ranges = data.toString().split(',')

  let answer = 0
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number)

    for (let i = start; i <= end; i++) {
      const as_str = i.toString()
      const as_str_len = as_str.length

      // gonna need to break into groups of x chars
      // then make sure each grouping is the same value
      for (let size = 1; size <= Math.floor(as_str_len / 2); size++) {
        if (as_str_len % size !== 0) {
          continue // can't evenly chunk things
        }

        const chunks = chunkArray(as_str, size)
        const first_chunk = chunks[0]
        if (chunks.every(chunk => chunk === first_chunk)) {
          answer += i
          console.log(`Found repeating pattern: ${as_str} (pattern ${first_chunk})`)
          break
        }
      }
    }
  }

  console.log(`Answer: ${answer}`)
}

// part1(fs.readFileSync('./inputs/02-example.txt'))
// part1(fs.readFileSync('./inputs/02-input.txt'))

// part2(fs.readFileSync('./inputs/02-example.txt'))
part2(fs.readFileSync('./inputs/02-input.txt'))