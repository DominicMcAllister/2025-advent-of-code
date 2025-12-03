const fs = require('node:fs')

function part1(data) {
  let answer = 0
  let current_position = 50

  for (const line of data.toString().split('\n')) {
    const direction = line[0]
    let clicks = parseInt(line.slice(1)) // after the directional

    // in case the input is larger than 100
    clicks %= 100

    switch (direction) {
      case 'L':
        if (clicks > current_position) {
          current_position = 100 - (clicks - current_position) // wrap around
        } else {
          current_position -= clicks
        }
        break
      case 'R':
        current_position += clicks
        current_position %= 100 // wrap around
        break
    }

    console.log(`${line}, Current: ${current_position}`)
    if (current_position === 0) {
      answer += 1
    }
  }

  console.log(`Answer: ${answer}`)
}

function part2(data) {
  let answer = 0
  let current_position = 50

  for (const line of data.toString().split('\n')) {
    const direction = line[0]
    let clicks = parseInt(line.slice(1)) // after the directional

    switch (direction) {
      case 'L':
        // full rotations
        const left_rotations = Math.floor(clicks / 100)
        if (left_rotations > 0) {
          console.log(`added from left rotations: ${left_rotations}`)
        }
        answer += left_rotations
        clicks %= 100 // remaining clicks after full rotations

        if (clicks > current_position) {
          // don't accidentally double count if starting at 0
          if (current_position != 0) {
            console.log('added from left')
            answer += 1 // went around
          }
          current_position = 100 - (clicks - current_position)
        } else {
          current_position -= clicks
        }

        if (current_position == 0) {
          console.log('left stopped at 0')
          answer += 1
        }
        break
      case 'R':
        current_position += clicks

        const additions = Math.floor(current_position / 100)
        if (additions > 0) {
          console.log(`added from right: ${additions}`)
        }

        answer += additions
        current_position %= 100
        break
    }

    console.log(`${line}, Current: ${current_position}`)
  }

  console.log(`Answer: ${answer}`)
}

// part1(fs.readFileSync('./inputs/01-example.txt'))
// part1(fs.readFileSync('./inputs/01-input.txt'))

// part2(fs.readFileSync('./inputs/01-example.txt'))
part2(fs.readFileSync('./inputs/01-input.txt'))