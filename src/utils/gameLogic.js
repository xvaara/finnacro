import { shuffleArray } from './shuffleArray'
import { tasks } from './tasks'

// Calculate how many squares of each difficulty should be in the grid
export function calculateDistribution(preferredDifficulty) {
  const totalCells = 25

  // Base distribution percentages
  const distribution = {
    preferred: Math.floor(totalCells * 0.4), // 40% preferred difficulty
    adjacent: Math.floor(totalCells * 0.3), // 30% adjacent difficulties
    other: Math.floor(totalCells * 0.2), // 20% other difficulties
    random: totalCells - Math.floor(totalCells * 0.9), // 10% random
  }

  // Ensure minimum squares for each difficulty
  return {
    1: Math.max(3, preferredDifficulty === 1 ? distribution.preferred : distribution.other / 2),
    2: Math.max(3, preferredDifficulty === 2 ? distribution.preferred : distribution.adjacent / 2),
    3: Math.max(3, preferredDifficulty === 3 ? distribution.preferred : distribution.adjacent / 2),
    4: Math.max(3, preferredDifficulty === 4 ? distribution.preferred : distribution.other / 2),
  }
}

export function getAdjustedDifficulty(taskIndex, userRole) {
  const task = tasks[taskIndex]
  const baseDifficulty = task.difficulty
  // Increase difficulty by 1 if role is 1 or 2 and role doesn't match
  if (task.role === 1 || task.role === 2) {
    return task.role !== userRole
      ? baseDifficulty + 1
      : baseDifficulty
  }
  return baseDifficulty
}

// Group tasks by difficulty
function getTasksByDifficulty() {
  return tasks.reduce((acc, task, index) => {
    acc[task.difficulty] = acc[task.difficulty] || []
    acc[task.difficulty].push(index)
    return acc
  }, {})
}

export function generateGrid(preferredDifficulty) {
  const tasksByDifficulty = getTasksByDifficulty()
  const distribution = calculateDistribution(preferredDifficulty)
  let selectedIndices = []

  // Add tasks from each difficulty level according to distribution
  Object.entries(distribution).forEach(([difficulty, count]) => {
    const difficultyTasks = tasksByDifficulty[Number.parseInt(difficulty)] || []
    selectedIndices = selectedIndices.concat(
      shuffleArray(difficultyTasks).slice(0, Math.floor(count)),
    )
  })
  // Fill remaining slots with random tasks
  const remainingCount = 25 - selectedIndices.length
  if (remainingCount > 0) {
    const remainingTasks = tasks
      .map((_, index) => index)
      .filter(index => !selectedIndices.includes(index))

    selectedIndices = selectedIndices.concat(
      shuffleArray(remainingTasks).slice(0, remainingCount),
    )
  }

  // Create 5x5 grid
  const shuffledIndices = shuffleArray(selectedIndices)
  const grid = []
  for (let i = 0; i < 5; i++) {
    grid.push(shuffledIndices.slice(i * 5, (i + 1) * 5))
  }

  return grid
}

// Calculate individual cell score
function calculateCellScore(taskIndex, userRole) {
  const adjustedDifficulty = getAdjustedDifficulty(taskIndex, userRole)
  return adjustedDifficulty
}

// Calculate bonus for completed bingo lines
function calculateBingoBonus(indices, grid, marked, userRole) {
  if (indices.every(i => marked[i])) {
    const bonus = indices.reduce((sum, i) => {
      const row = Math.floor(i / 5)
      const col = i % 5
      const taskIndex = grid[row][col]
      return sum + calculateCellScore(taskIndex, userRole)
    }, 0)
    // return bonus * 2;
    return 10
  }
  return 0
}

export function calculateScore(grid, marked, userRole) {
  let baseScore = 0

  // Calculate individual square scores
  for (let i = 0; i < marked.length; i++) {
    if (marked[i]) {
      const row = Math.floor(i / 5)
      const col = i % 5
      const taskIndex = grid[row][col]
      baseScore += calculateCellScore(taskIndex, userRole)
    }
  }

  // Check rows
  for (let i = 0; i < 5; i++) {
    baseScore += calculateBingoBonus([0, 1, 2, 3, 4].map(j => i * 5 + j), grid, marked, userRole)
  }

  // Check columns
  for (let j = 0; j < 5; j++) {
    baseScore += calculateBingoBonus([0, 1, 2, 3, 4].map(i => i * 5 + j), grid, marked, userRole)
  }

  // Check diagonals
  baseScore += calculateBingoBonus([0, 6, 12, 18, 24], grid, marked, userRole)
  baseScore += calculateBingoBonus([4, 8, 12, 16, 20], grid, marked, userRole)

  return baseScore
}
