const fs = require('node:fs')

function part1(filePath) {
    const matrix = []
    const data = fs.readFileSync(filePath)
    const rows = data.toString().split('\n')

    // read the data, but rotate into a single line
    for (let i = 0; i < rows.length; i++) {
        const items = rows[i].trimEnd().split(' ').filter(Boolean)
        for (let j = 0; j < items.length; j++) {
            if (!matrix[j]) {
                matrix[j] = []
            }
            matrix[j].push(items[j])
        }
    }

    let answer = 0
    for (let row of matrix) {
        const symbol = row[row.length - 1] // last item is the symbol
        const numbers = row.slice(0, row.length - 1) // these are the numbers
        switch (symbol) {
            case '+':
                const sum = numbers.reduce((acc, curr) => acc + Number(curr), 0)
                answer += sum
                break
            case '*':
                const mult = numbers.reduce((acc, curr) => acc * Number(curr), 1)
                answer += mult
                break;
        }
    }

    console.log(`answer: ${answer}`)
}

function part2(filePath) {
    const matrix = []
    const data = fs.readFileSync(filePath)
    const rows = data.toString().split('\n').map(r => r.trimEnd('\r'))

    const row_length = rows[0].length

    let answer = 0
    let numbers = []
    for (let i = row_length; i >= 0; i--) {
        let number = ''
        let performed_math = false
        for (let j = 0; j < rows.length; j++) {
            const char = rows[j][i]

            if (char == '' || char == undefined || char == ' ') {
                // do nothing
            } else if (char == '+') {
                let sum = numbers.reduce((acc, curr) => acc + Number(curr), 0)
                sum += Number(number)
                answer += sum
                performed_math = true
            } else if (char == '*') {
                let mult = numbers.reduce((acc, curr) => acc * Number(curr), 1)
                mult *= Number(number)
                answer += mult
                performed_math = true
            } else {
                number += char
            }
        }

        // if performed the math, reset the temporary placeholders
        // and skip to the vertical with values
        if (performed_math) {
            numbers = []
            i--;
        } else if (number.length > 0) {
            numbers.push(number)
        }
    }

    console.log(`answer: ${answer}`)
}

part1('./inputs/06-example.txt')
part1('./inputs/06-input.txt')

part2('./inputs/06-example.txt')
part2('./inputs/06-input.txt')