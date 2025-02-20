<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { useColorMode } from 'bootstrap-vue-next'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import useLive, { type Live } from '~/composables/live'
import { calculateScore } from '~/utils/gameLogic'
import 'dayjs/locale/fi'
import 'dayjs/locale/en'

const dark = useColorMode({
  persist: true,
})

dayjs.extend(isBetween)
dayjs.extend(localizedFormat)
dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.locale('en')

const data = useLive()
const full = ref(true)
const past = ref(false)
const time = ref(dayjs())
const filteredData = computed(() => {
  return data.value.filter(item => !full.value && item.topic === 'Workshops' || full.value)
    .filter(item => !past.value && (dayjs(time.value).isBefore(item.to) || !item.to && dayjs(time.value).subtract(1, 'hour').isBefore(item.from)) || past.value)
    .reduce((acc, item) => {
      const { day, ...rest } = item
      if (!acc[day])
        acc[day] = []
      rest.active = dayjs(time.value).isBetween(rest.from, rest.to) || !rest.to && dayjs(time.value).isAfter(rest.from) && dayjs(time.value).subtract(1, 'hour').isBefore(rest.from)
      acc[day].push(rest)
      return acc
    }, {} as Record<string, Omit<Live, 'day'>[]>)
})
useIntervalFn(() => {
  if (time.value.minute() !== dayjs().minute())
    time.value = dayjs()
}, 1000)

const dataUrl = 'https://data.mhx.fi'
const userList: any = ref([])
onMounted(() => {
  const usersEV = new EventSource(`${dataUrl}/user/**`)
  usersEV.onmessage = (event) => {
    const id = event.lastEventId.split('|')[0]
    const index = userList.value.findIndex((e: any) => e.id === id)
    // console.log(id, event)
    if (index >= 0) {
      userList.value[index] = { ...JSON.parse(event.data), id }
    }
    else {
      userList.value.push({ ...JSON.parse(event.data), id })
    }
  }
  usersEV.onerror = (event) => {
    console.log(event)
  }
  setTimeout(() => {
    console.log(JSON.stringify(userList.value))
  }, 1000 * 5)
})

const participants = computed(() =>
  userList.value.reduce((acc, user) => {
    if (user.selection) {
      const s = user.selection
      const r = user.role
      console.log(s)
      for (const wsid of Object.keys(s)) {
        console.log(wsid, s[wsid], r[wsid])
        const i = s[wsid]
        // console.log('woo', wsid, s[wsid], r[wsid])
        acc[wsid] = acc[wsid] || {}
        acc[wsid][i] = acc[wsid][i] || {}
        acc[wsid][i][r[wsid]] = acc[wsid][i][r[wsid]] + 1 || 1
        acc[wsid][i].total = acc[wsid][i].total + 1 || 1
        acc[wsid][i].list = acc[wsid][i].list || []
        acc[wsid][i].list.push(user.name)
      }
    }
    return acc
  }, {}),

)

function calculateGridScore(grid, markedCells, role) {
  // Use existing scoring logic from gameLogic.js
  return calculateScore(grid, markedCells, role)
}

const bingoScores = computed(() => {
  return userList.value
    .filter(e => e.bingo)
    .map((e) => {
      const score = e.bingo.grids.reduce((total, grid, index) => {
        return total + calculateGridScore(grid, e.bingo.markedCells[index], e.bingo.role)
      }, 0)
      return { id: e.id, name: e.name, score }
    })
    .filter(e => e)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
})
</script>

<template>
  <div class="live">
    <div class="d-flex flex-wrap gap-3 mb-3">
      <div class="ps-4">
        <!-- <h2>finnacro.fi/signup</h2> -->
        <h2>finnacro.fi/palaute</h2>
      </div>
      <div class="ms-auto" @click="dark = dark === 'light' ? 'dark' : 'light'">
        <h2>
          {{ time.format('H:mm') }}
        </h2>
      </div>
    </div>
    <div class="border rounded p-2 mb-1">
      <span v-for="u in bingoScores" :key="u.id" class="border rounded p-1 m-1">
        {{ u.name }}
        <small class="rounded px-1 bg-secondary">
          {{ u.score }}

        </small>
      </span>
    </div>
    <div
      v-for="(children, day) in filteredData"
      :key="day"
      class="card"
    >
      <div class="card-header d-flex align-items-center">
        <div class="text-bg-secondary py-1 px-2 rounded me-3">
          {{ dayjs(day).locale('fi').format('DD') }}
        </div>
        <div class="">
          {{ dayjs(day).format('dddd') }} -
          {{ dayjs(day).locale('fi').format('dddd') }}
        </div>
      </div>
      <div class="table-responsive">
        <table class="table h-100">
          <tbody>
            <tr v-for="(child, index) in children" :key="index" :class="child.active && 'table-active'">
              <td class="text-nowrap text-left">
                {{ dayjs(child.from).format('H:mm') }} - {{ child.to ? dayjs(child.to).format('H:mm') : '' }}
              </td>
              <td v-if="!child.ws" colspan="4" class="text-center">
                {{ child.topic2 ?? child.topic }}
              </td>
              <template v-else>
                <td v-for="(ws, index) in child.ws" class="h-100" :class="`workshop-${index}`">
                  <div class="h-100 w-100 d-flex flex-column justify-content-between rounded">
                    <div class="card">
                      <div class="card-header d-flex gap-1 flex-wrap">
                        <div class="w-100">
                          {{ ws.teachers }}
                        </div>
                        <div>
                          {{ ws.topic }}
                        </div>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li v-if="ws.content" class="list-group-item">
                          {{ ws.content }}
                        </li>
                        <li v-if="ws.prereqs" class="list-group-item">
                          <span class="badge text-bg-secondary">
                            prereqs
                          </span>
                          {{ ws.prereqs }}
                        </li>
                        <li v-if="ws.gym" class="list-group-item">
                          <span class="badge text-bg-secondary">
                            gym
                          </span>
                          {{ ws.gym }}
                        </li>
                      </ul>
                    </div>
                    <div class="bg-light text-black d-flex justify-content-around rounded p-1 my-1 participants">
                      <div class="p-1 pt-2 text-center">
                        Base <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[0] }}</span>
                      </div>
                      <div class="p-1 pt-2 text-center">
                        Flyer <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[1] }}</span>
                      </div>
                      <div v-if="participants[child.wsid]?.[index]?.[2]" class="p-1 pt-2 text-center">
                        Mixed <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[2] }}</span>
                      </div>
                    </div>
                    <div v-if="ws.max" class="participants text-center rounded text-black p-1" :class=" participants[child.wsid]?.[index]?.total >= ws.max ? 'bg-warning ' : 'bg-light'">
                      {{ participants[child.wsid]?.[index]?.total }} / {{ ws.max }}
                    </div>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.live {
  font-size: 28px;
  .participants {
    font-size: 16px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
