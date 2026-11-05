// Run: node --test src/lib/maze.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"

import { floodFill, goalCells, makeMaze, shortestPath } from "./maze.ts"

const SIZE = 10

test("every cell of a generated maze is reachable from the goal", () => {
  for (const seed of [1, 7, 2027]) {
    const maze = makeMaze(SIZE, seed)
    const dist = floodFill(maze, goalCells(SIZE))
    assert.ok(dist.every((d) => d >= 0), `seed ${seed} left a cell walled off`)
  }
})

test("goal cells sit at distance 0 and their neighbours further out", () => {
  const maze = makeMaze(SIZE, 1)
  const goals = goalCells(SIZE)
  const dist = floodFill(maze, goals)
  for (const g of goals) assert.equal(dist[g], 0)
  assert.equal(dist.filter((d) => d === 0).length, goals.length)
})

test("the shortest path steps down one distance at a time and ends on a goal", () => {
  const maze = makeMaze(SIZE, 42)
  const goals = goalCells(SIZE)
  const dist = floodFill(maze, goals)
  const start = (SIZE - 1) * SIZE // bottom-left corner, like a real start cell
  const path = shortestPath(maze, dist, start)

  assert.equal(path[0], start)
  assert.equal(path.length, dist[start] + 1)
  for (let i = 1; i < path.length; i++) {
    assert.equal(dist[path[i]], dist[path[i - 1]] - 1)
  }
  assert.ok(goals.includes(path[path.length - 1]))
})

test("the same seed always builds the same maze", () => {
  assert.deepEqual(makeMaze(SIZE, 5).walls, makeMaze(SIZE, 5).walls)
})
