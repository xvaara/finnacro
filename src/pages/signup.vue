<template>
  <div v-if="!session.user?.id">
    {{ error }}
    <form @submit.prevent="login">
      <BFormInput v-model="email" type="email" trim placeholder="Email" />
      <!-- <BFormInput v-model="password" trim placeholder="Password"></BFormInput> -->
      <BButton @click="login">
        Login
      </BButton>
    </form>
  </div>
  <div v-else>
    <div class="border rounded p-3 mb-1">
      <div class="d-flex gap-2 flex-wrap">
        <div>
          <button class="btn btn-sm btn-primary" @click="logout">
            Logout
          </button>
        </div>
        <div>
          {{ session.user.email }}
        </div>
        <div>
          <BFormGroup label="name" label-cols="auto" label-for="input-floating-1">
            <BFormInput id="input-floating-1" v-model="userdata.name" trim @change="saveData" />
          </BFormGroup>
        </div>
        <BFormCheckbox v-model="full" switch>
          All
        </BFormCheckbox>
        <BFormCheckbox v-model="past" switch>
          Show past
        </BFormCheckbox>
        <div class="ms-auto">
          <router-link class="btn btn-sm btn-primary" to="/bingo">
            Bingo
          </router-link>
        </div>
      </div>
    </div>
    <div class="border rounded p-3 mb-1">
      Bingo top 10:
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
            <tr v-for="(child, rowindex) in children" :key="rowindex" :class="child.active && 'table-active'">
              <td class="d-flex d-md-table-cell">
                <span class="text-nowrap">
                  {{ dayjs(child.from).format('H:mm') }} - {{ child.to ? dayjs(child.to).format('H:mm') : '' }}
                </span>
                <span v-if="!child.ws" class=" d-block d-md-none ms-3">
                  {{ child.topic2 ?? child.topic }}
                </span>
              </td>
              <td v-if="!child.ws" colspan="4" class=" d-none d-md-table-cell">
                {{ child.topic2 ?? child.topic }}
              </td>
              <template v-else>
                <td
                  v-for="(ws, index) in child.ws"
                  :key="index"
                  class="d-flex d-md-table-cell flex-column p-3 p-md-1 mx-1"
                  :class="`workshop-${index}${userdata.selection && userdata.selection[child.wsid] === index ? ' ws-selection' : ''}`"
                >
                  <div class="w-100 d-flex flex-column justify-content-between rounded">
                    <div v-if="ws.teachers" class="card">
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
                    <div v-if="userdata.selection && userdata.selection[child.wsid] === index" class="bg-primary d-flex justify-content-around rounded p-1 mt-1 flex-wrap">
                      <BPopover manual>
                        <template #target="{ toggle, showState }">
                          <button class="btn btn-secondary btn-sm" @click.prevent.stop="toggle">
                            <PeopleIcon />
                          </button>
                        </template>
                        <div class="d-flex flex-wrap gap-1">
                          <span v-for="p in participants[child.wsid]?.[index]?.list" :key="p" class="badge">{{ p }}</span>
                        </div>
                      </BPopover>
                      <button :class="userdata.role?.[child.wsid] === 0 ? 'bg-primary-subtle' : 'bg-light text-black'" class="btn btn-sm m-1 border flex-fill" @click.stop="roleSelection(child.wsid, 0)">
                        Base <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[0] }}</span>
                      </button>
                      <button :class="userdata.role?.[child.wsid] === 1 ? 'bg-primary-subtle' : 'bg-light text-black'" class="btn btn-sm m-1 border flex-fill" @click.stop="roleSelection(child.wsid, 1)">
                        Flyer <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[1] }}</span>
                      </button>
                      <button :class="userdata.role?.[child.wsid] === 2 ? 'bg-primary-subtle' : 'bg-light text-black'" class="btn btn-sm m-1 border flex-fill" @click.stop="roleSelection(child.wsid, 2)">
                        Mixed <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[2] }}</span>
                      </button>
                    </div>
                    <div v-else class="bg-light text-black d-flex justify-content-around rounded p-1 my-1 cursor-pointer" @click="(!ws.max || (participants[child.wsid]?.[index]?.total || 0) < ws.max) && selection(child.wsid, index)">
                      <BPopover manual>
                        <template #target="{ toggle, showState }">
                          <button class="btn btn-secondary btn-sm flex-shrink-1" @click.prevent.stop="toggle">
                            <PeopleIcon />
                          </button>
                        </template>
                        <div class="d-flex flex-wrap gap-1">
                          <span v-for="p in participants[child.wsid]?.[index]?.list" :key="p" class="px-1 text-nowrap">{{ p }}</span>
                        </div>
                      </BPopover>
                      <div class="p-1 pt-2 text-center flex-shrink-1 d-flex flex-wrap justify-content-center gap-1">
                        <small>
                          Base
                        </small>
                        <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[0] }}</span>
                      </div>
                      <div class="p-1 pt-2 text-center flex-shrink-1 d-flex flex-wrap justify-content-center gap-1">
                        <small>
                          Flyer
                        </small>
                        <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[1] }}</span>
                      </div>
                      <div v-if="participants[child.wsid]?.[index]?.[2]" class="p-1 pt-2 text-center flex-shrink-1 d-flex flex-wrap justify-content-center gap-1">
                        <small>
                          Mixed
                        </small>
                        <span class="badge bg-secondary">{{ participants[child.wsid]?.[index]?.[2] }}</span>
                      </div>
                    </div>
                    <div v-if="ws.max" class="text-center rounded text-black p-1" :class=" participants[child.wsid]?.[index]?.total >= ws.max ? 'bg-warning ' : 'bg-light'">
                      {{ participants[child.wsid]?.[index]?.total || 0 }} / {{ ws.max }}
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

<script setup>
import { useIntervalFn, useStorage } from '@vueuse/core'
import {
  BPopover,
} from 'bootstrap-vue-next'
import dayjs from 'dayjs'

import advancedFormat from 'dayjs/plugin/advancedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import PeopleIcon from '~icons/bi/people'
import useLive from '~/composables/live'
import { calculateScore } from '~/utils/gameLogic'
import { appInfoKey } from '../keys'
import 'dayjs/locale/fi'
import 'dayjs/locale/en'

dayjs.extend(isBetween)
dayjs.extend(localizedFormat)
dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.locale('en')
const appInfo = inject(appInfoKey, ref({ toc: null }))
appInfo.value.toc = null
const data = useLive()
const full = ref(false)
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
    }, {})
})
useIntervalFn(() => {
  if (time.value.minute() !== dayjs().minute())
    time.value = dayjs()
}, 1000)

const dataUrl = 'https://data.mhx.fi'

const email = ref(null)
const password = ref(null)
const error = ref(null)
const session = useStorage('fa-u2', {})
const userdata = ref({})
const userList = ref([])

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

let usersEV = null
watch(session, (ns, os) => {
  if (ns?.token && ns?.token !== os?.token) {
    if (usersEV) {
      usersEV.close()
    }
    usersEV = new EventSource(`${dataUrl}/user/**/finnacro`)
    usersEV.onmessage = (event) => {
      const id = event.lastEventId.split('|')[0]
      const index = userList.value.findIndex(e => e.id === id)
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
    // refreshUserList()
  }
}, { immediate: true })

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

async function login() {
  const res = await fetch(`${dataUrl}/_auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value.trim(), password: password.value }),
  })
  if (res.status !== 200) {
    console.error('Login failed')
    error.value = 'Login failed'
    return
  }
  session.value = await res.json()
  error.value = null
}

function selection(wsid, index) {
  console.log(wsid, index)
  userdata.value.selection = userdata.value.selection || {}
  userdata.value.selection[wsid] = index
  if (!userdata.value.role) {
    userdata.value.role = {}
  }
  if (!userdata.value.role[wsid]) {
    userdata.value.role[wsid] = userdata.value.previousrole || 0
  }
  saveData()
}
function roleSelection(wsid, index) {
  console.log(wsid, index)
  userdata.value.role = userdata.value.role || {}
  userdata.value.role[wsid] = index
  userdata.value.previousrole = index
  saveData()
}

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

function logout() {
  session.value = {}
}
</script>

<route lang="yaml">
  meta:
    layout: home
</route>
