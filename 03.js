const fs = require('node:fs')

function part1(data) {
  const banks = data.toString().split('\n')

  let answer = 0
  for (const bank of banks) {
    let largest = 0
    for (let i = 0; i < bank.length - 1; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const val = Number(`${bank[i]}${bank[j]}`)
        if (val > largest) {
          largest = val
        }
      }
    }
    console.log(`Bank: ${bank}, largest pair: ${largest}`)
    answer += largest
  }

  console.log(`Answer: ${answer}`)
}

function part2(data) {
  // find the largest digit and note its index, leaving
  // enough remainder in the string for subsequent iterations
  function findLargestDigit(bank, remainder_necessary) {
    let largest = 0
    let index = 0
    for (let i = 0; i < bank.length - remainder_necessary; i++) {
      const digit = Number(bank[i])
      if (digit > largest) {
        largest = digit
        index = i
      }
    }
    return [largest, index]
  }

  const max_length = 12
  let answer = 0
  for (const bank of data.toString().split('\n')) {
    let temp = bank

    // build the string of max digit length
    let str = ''
    while (str.length < max_length) {
      const [largest_digit, index] = findLargestDigit(temp, max_length - str.length - 1)
      str += largest_digit

      // maintain the remainder of the string to keep cutting from
      temp = temp.slice(index + 1)
    }

    console.log(`Bank: ${bank}, largest value: ${str}`)
    answer += Number(str)
  }

  console.log(`Answer: ${answer}`)
}

// part1(fs.readFileSync('./inputs/03-example.txt'))
// part1(fs.readFileSync('./inputs/03-input.txt'))

// part2(fs.readFileSync('./inputs/03-example.txt'))
part2(fs.readFileSync('./inputs/03-input.txt'))