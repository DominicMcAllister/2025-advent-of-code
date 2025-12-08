const fs = require('node:fs')


function parseInput(filePath) {
  const points = []

  const data = fs.readFileSync(filePath)
  const rows = data.toString().split('\n')
  for (const row of rows) {
    const [x,y,z] = row.split(',').map(Number)
    points.push({x,y,z, display: row}) // display to make lookup comparisons easier
  }

  return points
}

function calculateDistance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.z - pointB.z, 2))
}

function buildAndSortDistances(points) {
  const distances = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = calculateDistance(points[i], points[j])
      distances.push({distance, points: [points[i], points[j]]})
    }
  }
  
  // sort ascending
  distances.sort((a, b) => a.distance - b.distance)
  return distances
}

function part1(points, compareFirstCount) {
  const distances = buildAndSortDistances(points)

  const circuits = []
  for (let i = 0; i < compareFirstCount; i++) {
    const entry = distances[i]
    const existing_with_point_a = circuits.find(c => c.points.includes(entry.points[0].display))
    const existing_with_point_b = circuits.find(c => c.points.includes(entry.points[1].display))

    // both points already in circuits
    if (existing_with_point_a && existing_with_point_b) {
      // both points already in the same circuit
      if (existing_with_point_a === existing_with_point_b) {
        continue
      } else {
        // combine the two circuits and drop the second one (lame distinct of the points using a set)
        existing_with_point_a.points = [...new Set(existing_with_point_a.points.concat(existing_with_point_b.points))]
        const index_to_remove = circuits.indexOf(existing_with_point_b)
        circuits.splice(index_to_remove, 1)
      }
    // add to an existing circuit
    } else if (existing_with_point_a) {
      existing_with_point_a.points.push(entry.points[1].display)
    } else if (existing_with_point_b) {
      existing_with_point_b.points.push(entry.points[0].display)
    // new circuit
    } else {
      circuits.push({points: [entry.points[0].display, entry.points[1].display]})
    }
  }

  // top 3 circuits of length
  const sorted_circuits = circuits.sort((a, b) => b.points.length - a.points.length)
  const answer = sorted_circuits[0].points.length
               * sorted_circuits[1].points.length
               * sorted_circuits[2].points.length

  console.log(`answer: ${answer}`)
}

function part2(points) {
  const distances = buildAndSortDistances(points)

  // build the circuits
  const circuits = []

  for (let i = 0; i < distances.length; i++) {
    const entry = distances[i]
    const existing_with_point_a = circuits.find(c => c.points.includes(entry.points[0].display))
    const existing_with_point_b = circuits.find(c => c.points.includes(entry.points[1].display))

    // both points already in circuits
    if (existing_with_point_a && existing_with_point_b) {
      // both points already in the same circuit
      if (existing_with_point_a === existing_with_point_b) {
        continue
      } else {
        // combine the two circuits and drop the second one (lame distinct of the points using a set)
        existing_with_point_a.points = [...new Set(existing_with_point_a.points.concat(existing_with_point_b.points))]
        const index_to_remove = circuits.indexOf(existing_with_point_b)
        circuits.splice(index_to_remove, 1)
      }
    // add to an existing circuit
    } else if (existing_with_point_a) {
      existing_with_point_a.points.push(entry.points[1].display)
    } else if (existing_with_point_b) {
      existing_with_point_b.points.push(entry.points[0].display)
    // new circuit
    } else {
      circuits.push({points: [entry.points[0].display, entry.points[1].display]})
    }

    // any circuits containing all the points?
    if (circuits.find(c => c.points.length === points.length)) {
      console.log(`answer: ${entry.points[0].x * entry.points[1].x}`)
      break
    }
  }

  
}

part1(parseInput('./inputs/08-example.txt'), 10)
part1(parseInput('./inputs/08-input.txt'), 1000)

part2(parseInput('./inputs/08-example.txt'))
part2(parseInput('./inputs/08-input.txt'))