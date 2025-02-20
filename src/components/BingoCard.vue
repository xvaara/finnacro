<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { getAdjustedDifficulty } from '../utils/gameLogic'
import { roles, tasks } from '../utils/tasks'

const props = defineProps({
  grid: {
    type: Array,
    required: true,
  },
  markedCells: {
    type: Array,
    required: true,
  },
  userRole: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['cellToggle'])

function toggleCell(row, col) {
  const index = row * 5 + col
  emit('cellToggle', index, !props.markedCells[index])
}

function getCellDifficulty(taskIndex) {
  return getAdjustedDifficulty(taskIndex, props.userRole)
}

function resizeText() {
  const elements = document.querySelectorAll('.bingo-cell')
  elements.forEach((el) => {
    let fontSize = 30 // Initial font size
    const textEl = el.querySelector('.bingo-text')
    textEl.style.fontSize = `${fontSize}px`
    // console.log(el)
    while (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) {
      // console.log(el.scrollHeight, el.clientHeight, el.scrollWidth, el.clientWidth)
      fontSize -= 1
      textEl.style.fontSize = `${fontSize}px`
      if (fontSize <= 7)
        break // Minimum font size
    }
  })
}

onMounted(() => {
  resizeText()
  requestAnimationFrame(resizeText)
  window.addEventListener('resize', resizeText)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeText)
})
</script>

<template>
  <div class="bingo-grid">
    <div v-for="(row, rowIndex) in grid" :key="`row${rowIndex}`" class="row g-0">
      <div v-for="(taskIndex, colIndex) in row" :key="`${rowIndex}-${taskIndex}`" class="col">
        <div
          class="bingo-cell"
          :class="{
            marked: markedCells[rowIndex * 5 + colIndex],
            [`difficulty-${getCellDifficulty(taskIndex)}`]: true,
          }"
          @click="toggleCell(rowIndex, colIndex)"
        >
          <span v-if="tasks[taskIndex].action === 'say'" class="bingo-verb">
            Say
          </span>
          <span v-else-if="tasks[taskIndex].action === 'move'" class="bingo-verb">
            {{ roles[tasks[taskIndex].role] }}
          </span>
          <span v-else />
          <span class="bingo-text">
            {{ tasks[taskIndex].text }}

          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bingo-grid {
  /* max-width: 800px; */
  margin: 0 auto;
}
.row {
  flex-wrap: nowrap;
}
.col, .bingo-cell {
  width: 19vw;
  max-width: 280px;
  height: 19vw;
  max-height: 280px;
}
.bingo-cell {
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid #dee2e6;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  font-size: clamp(0.85rem, 2vw, 1rem);
  /* font-size: calc((75vw - 4.5rem) / 18); */
  /* font-size: 80px; */
  line-height: 1.1;
  word-break: break-word;
  background-color: var(--bs-body-bg);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.bingo-cell .bingo-verb {
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-weight: bold;
  background: var(--the-color);
  color: rgb(64, 64, 64);
}
@media screen and (max-width: 500px) {
  .bingo-cell .bingo-verb {
    font-size: 0.6rem;
  }

}
.bingo-cell .bingo-text {
  width: 100%;
  display: flex;
  flex: 1 0 auto;
  /* overflow: hidden; */
  /* height: 100%; */
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  /* margin-top: auto;
  margin-bottom: auto; */
}
.bingo-cell .bingo-text-inner {
  /* margin: auto; */
  /* display: inline-block; */
    /* overflow: auto; */

}

/* .bingo-cell:hover {
  background-color: #f8f9fa;
} */

.bingo-cell.marked {
  background-color: #198754;
  color: white;
  border-color: #198754;
}

.difficulty-1 { --the-color:  #28a745; border-color: var(--the-color); }
.difficulty-2 { --the-color:  #ffc107; border-color: var(--the-color);}
.difficulty-3 { --the-color: #fd7e14; border-color: var(--the-color);}
.difficulty-4 { --the-color: #dc3545; border-color: var(--the-color);}
.difficulty-5 { --the-color: #cc00d3; border-color: var(--the-color);}

.role-buttons .btn {
  min-width: 200px;
}
</style>
