const fs = require('node:fs')

function parseRows(filePath) {
    const matrix = []
    const data = fs.readFileSync(filePath)
    const rows = data.toString().split('\n').map(l => l.trimEnd('\r'))
    return rows
}

function replaceIndex(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}

function part1(filePath) {
    const rows = parseRows(filePath)

    let answer = 0

    // instead of processing the entire line,
    // attempt to stay in a short bounds
    let left = 0
    let right = rows[0].length

    //initial tracer off the S
    const s = rows[0].indexOf('S')
    rows[1] = replaceIndex(rows[1], s, '|')
    left = (s - 1)

    // row by row starting on 2nd row
    for (let r = 1; r < rows.length - 1; r++) {
        const row = rows[r]
        for (let v = left; v < right; v++) {
            // did we encounter a beam?
            if (row[v] == '|') {
                // should it go straight down?
                if (rows[r+1][v] == '.') {
                    rows[r+1] = replaceIndex(rows[r+1], v, '|')
                // should it split?
                } else if (rows[r+1][v] == '^') {
                    answer++
                    rows[r+1] = replaceIndex(rows[r+1], v-1, '|')
                    rows[r+1] = replaceIndex(rows[r+1], v+1, '|')
                    if (v - 1 < left) {
                        left = (v-1)
                    }
                    if (v + 1 > right) {
                        right = (v+1)
                    }
                }
            }
        }
    }

    console.log(`answer: ${answer}`)
}

function part2(filePath) {
    const rows = parseRows(filePath)

    // build a matching matrix of rows, representing the counts of paths to any given point
    const new_rows = Array.from({ length: rows.length }, () => []);

    const row_length = rows[0].length
    for (let i = 0; i < rows.length; i++) {
        for (let v = 0; v < row_length; v++) {
            switch (rows[i][v]) {
                case 'S':
                    // start is 1
                    new_rows[i].push(1)
                    break
                case '^':
                    // at the split, already processed the left (blank)
                    // so at to its value whatever is above
                    new_rows[i][v-1] += new_rows[i-1][v]

                    // no value for the split itself
                    new_rows[i].push(0)

                    // next value is from above, plus whatever is above it
                    // then skip the next processing
                    new_rows[i].push(new_rows[i-1][v] + new_rows[i-1][v+1])
                    v++
                    break
                case '.':
                    // otherwise we bring the value down from above
                    if (i) {
                        new_rows[i].push(new_rows[i-1][v])
                    } else {
                        // first row, the blanks are all zero
                        new_rows[i].push(0)
                    }
                    break
                default:
                    throw new Error(`unhandled input value: "${rows[i][v]}"`)
            }
        }
    }

    // sum all the path values from the final row which should
    // be the maximum number of paths
    const answer = new_rows[new_rows.length - 1].reduce((a,c) => a + c, 0)
    console.log(`answer: ${answer}`)
}
    

part1('./inputs/07-example.txt')
part1('./inputs/07-input.txt')

part2('./inputs/07-example.txt')
part2('./inputs/07-input.txt')