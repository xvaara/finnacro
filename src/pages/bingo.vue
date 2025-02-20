<template>
  <div v-if="!session.user?.id">
    <div class="text-center">
      Login at signup page to play bingo!
    </div>
    <div class="text-center">
      <router-link class="btn btn-sm btn-primary" to="/signup">
        Signup
      </router-link>
    </div>
  </div>
  <div v-else class="mt-3 px-2">
    <div class="text-center">
      <router-link class="btn btn-sm btn-primary" to="/signup">
        Signup
      </router-link>
    </div>
    <h1 class="text-center mb-3">
      Acro Bingo
    </h1>
    <div v-if="notStarted" class="text-center">
      <button class="btn btn-sm btn-primary" @click="initializeGrids">
        Suffle
      </button>
    </div>
    <!-- <pre>{{ userdata }}</pre> -->
    <!-- Role Selection -->
    <div v-if="!userdata.bingo?.role" class="row mb-3">
      <div class="col text-center">
        <h3 class="mb-3">
          Select Your Role
        </h3>
        <div class="role-buttons">
          <button
            v-for="roleKey in [1, 2]"
            :key="roleKey"
            class="btn btn-lg btn-outline-primary me-2 mb-2"
            @click="selectRole(roleKey)"
          >
            {{ roles[roleKey] }}
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- Total Score Display -->
      <div class="text-center mb-4">
        <h2>Total Score: {{ totalScore }}</h2>
        <p class="text-muted">
          Playing as: {{ roles[userdata.bingo.role] }}
        </p>
      </div>

      <!-- Grid Container -->
      <div class="grids-container">
        <div v-for="(grid, index) in grids" :key="index" class="grid-wrapper mb-4">
          <!-- <h3 class="text-center mb-3">
            {{ ['Easy', 'Medium', 'Hard', 'Superhard'][index] }}
          </h3> -->
          <BingoCard
            :grid="grid"
            :marked-cells="allMarkedCells[index]"
            :user-role="userdata.bingo.role"
            @cell-toggle="(cellIndex, isMarked) => handleCellToggle(index, cellIndex, isMarked)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BingoCard from '../components/BingoCard.vue'
import { calculateScore, generateGrid } from '../utils/gameLogic'
import { roles, tasks } from '../utils/tasks'

const dataUrl = 'https://data.mhx.fi'
const session = useStorage('fa-u2', {})
const userdata = ref({})

const grids = computed(() => userdata.value.bingo?.grids || [])
const allMarkedCells = computed(() => userdata.value.bingo?.markedCells || [])
const notStarted = computed(() => !userdata.value.bingo?.markedCells.some(cells => cells.some(cell => cell)))
// Initialize 4 separate grids and marked cells arrays
function initializeGrids() {
  const usedIndices = new Set()
  userdata.value.bingo.grids = []
  // allMarkedCells.value = []
  userdata.value.bingo.markedCells = []
  // Generate grid for each difficulty level
  for (let difficulty = 1; difficulty <= 4; difficulty++) {
    const availableTasks = tasks
      .map((_, index) => index)
      .filter(index => !usedIndices.has(index))

    // Generate grid with remaining available tasks
    const grid = generateGrid(difficulty, availableTasks)

    // Add used indices to tracking set
    grid.flat().forEach(index => usedIndices.add(index))

    userdata.value.bingo.grids.push(grid)
    userdata.value.bingo.markedCells.push(Array.from({ length: 25 }).fill(false))
  }
  saveData()
}

function selectRole(role) {
  userdata.value.bingo = userdata.value.bingo || {}
  userdata.value.bingo.role = Number.parseInt(role)
  initializeGrids()
  saveData()
}

// Calculate total score across all grids
const totalScore = computed(() => {
  if (!userdata.value.bingo?.role)
    return 0

  return grids.value.reduce((total, grid, index) => {
    return total + calculateGridScore(grid, allMarkedCells.value[index], userdata.value.bingo.role)
  }, 0)
})

function calculateGridScore(grid, markedCells, role) {
  // Use existing scoring logic from gameLogic.js
  return calculateScore(grid, markedCells, role)
}

// Handle cell toggle for specific grid
function handleCellToggle(gridIndex, cellIndex, isMarked) {
  userdata.value.bingo.markedCells[gridIndex][cellIndex] = isMarked
  saveData()
}

let eventSource = null
watch(session, (ns, os) => {
  if (ns?.user && ns?.user?.id !== os?.user?.id) {
    if (eventSource) {
      eventSource.close()
    }
    eventSource = new EventSource(`${dataUrl}/user/${ns.user.id}/finnacro`)
    eventSource.onmessage = (event) => {
      userdata.value = JSON.parse(event.data)
    }
    eventSource.onerror = (event) => {
      console.log(event)
    }
  }
}, { immediate: true })

async function saveData() {
  await fetch(`${dataUrl}/user/${session.value.user.id}/finnacro`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.value.token}`,
    },
    body: JSON.stringify(userdata.value),
  })
}
</script>

<style scoped>
.grids-container {
  display: grid;
  grid-template-columns:  1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.grid-wrapper {
  min-width: 300px;
}

/* @media (max-width: 768px) {
  .grids-container {
    grid-template-columns: 1fr;
  }
} */
</style>

<route lang="yaml">
  meta:
    layout: home
</route>
