<template>
  <div v-if="!session.user?.id">
    {{ error }}
    <form>
      <BFormInput v-model="email" type="email" placeholder="Email" />
      <BFormInput v-model="password" type="password" placeholder="Password" />
      <BButton @click="login">
        Login
      </BButton>
    </form>
  </div>
  <div v-else>
    <div class="border rounded p-3 m-1">
      <BButton @click="logout">
        Logout
      </BButton>
      {{ session.user.email }}
    </div>
    <div v-if="newUsersList.length === 0" class="border rounded p-3 m-1">
      <div>
        Lisää käyttäjiä
      </div>
      <div>
        muoto: email, nimi tai email [tab] nimi
      </div>
      <BFormTextarea v-model="newUsers" placeholder="add users" />
      <BButton @click="addUsers">
        parse
      </BButton>
    </div>
    <div v-else>
      <div class="d-flex flex-wrap">
        <div v-for="u, index in newUsersList" class="m-1 p-1 rounded bg-secondary text-nowrap">
          {{ u.email }} {{ u.name }} <button class="btn btn-sm bg-danger" @click="newUsersList.splice(index, 1)">
            &times;
          </button>
        </div>
      </div>
      <BButton @click="addUsers">
        add
      </BButton>
    </div>
    <div class="border rounded">
      <BButton @click="refreshUserList">
        refresh
      </BButton>
      <span v-for="u, in userList" :key="u.id" class="">
        {{ u.email }},
      </span>
      <div v-for="u, in userList" :key="u.id" class="border rounded p-1 m-1">
        {{ u.email }} {{ u.name }}
      </div>
    </div>
    <div class="border rounded">
      <h2> bingo winner </h2>
      <BButton @click="r = r + 1">
        refresh
      </BButton>
      <div>
        {{ winner.score }}: {{ winner.name }} {{ winner.user }}
      </div>

      <h2> bingo scores </h2>

      <div v-for="(u, i) in bingoScores" :key="u.id" class="border rounded p-1 m-1">
        {{ i + 1 }}: {{ u.score }}: {{ u.name }} {{ u.user }}
      </div>
      <pre>
        <!-- {{ userList }} -->
      </pre>
      <div v-for="u in userData" :key="u.id" class="border rounded p-1 m-1">
        {{ u }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
import { calculateScore } from '../utils/gameLogic'

const dataUrl = 'https://data.mhx.fi'

const email = ref(null)
const password = ref(null)
const error = ref(null)
const session = useStorage('fa-admin', {})

const userList = ref([])
const newUsers = ref(``)
const newUsersList = ref([])

async function refreshUserList() {
  const res = await fetch(`${dataUrl}/_admin/listuser`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.value.token}`,
    },
  })
  if (res.status !== 200) {
    console.error('user list failed')
    error.value = 'failed to get user list'
    return
  }
  userList.value = await res.json()
  console.log(userList.value)
  error.value = null
}

const userData = ref([])
let usersEV = null
watch(session, (ns, os) => {
  if (ns?.token && ns?.token !== os?.token) {
    if (usersEV) {
      usersEV.close()
    }
    usersEV = new EventSource(`${dataUrl}/user/**/finnacro`)
    usersEV.onmessage = (event) => {
      const id = event.lastEventId.split('|')[0]
      const index = userData.value.findIndex(e => e.id === id)
      // console.log(id, event)
      if (index >= 0) {
        userData.value[index] = { ...JSON.parse(event.data), id }
      }
      else {
        userData.value.push({ ...JSON.parse(event.data), id })
      }
    }
    usersEV.onerror = (event) => {
      console.log(event)
    }
    // refreshUserList()
  }
}, { immediate: true })

function calculateGridScore(grid, markedCells, role) {
  // Use existing scoring logic from gameLogic.js
  return calculateScore(grid, markedCells, role)
}

const bingoScores = computed(() => {
  return userData.value
    .filter(e => e.bingo)
    .map((e) => {
      const score = e.bingo.grids.reduce((total, grid, index) => {
        return total + calculateGridScore(grid, e.bingo.markedCells[index], e.bingo.role)
      }, 0)
      return { id: e.id, name: e.name, score, user: adminList.value.find(i => i.id === e.id) }
    })
    .filter(e => e)
    .sort((a, b) => b.score - a.score)
})
const r = ref(1)
const winner = computed(() => {
  if (bingoScores.value.length === 0)
    return {}
  console.log(r.value)
  return bingoScores.value.filter(score => score.score > 30)[Math.floor(Math.random() * bingoScores.value.filter(score => score.score > 30).length)]
})

const adminList = ref([])
onMounted(async () => {
  if (session.value.token) {
    refreshUserList()
    const list = await fetch(`${dataUrl}/admin/finnacro-users`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.value.token}`,
      },
    })
    adminList.value = await list.json()
  }
})

async function login() {
  const res = await fetch(`${dataUrl}/_auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
  if (res.status !== 200) {
    console.error('Login failed')
    error.value = 'Login failed'
    return
  }
  session.value = await res.json()
  refreshUserList()
  error.value = null
}
async function addUsers() {
  if (newUsersList.value.length === 0) {
    newUsersList.value = newUsers.value.split('\n').map(e => e.trim()).filter(e => e).map((e) => {
      const [email, name, ...rest] = e.split(/[ \t,]+/).map(e => e.trim())
      console.log(email, name, rest)
      return { email, name }
    }).filter(e => e.email.match(/@/))
    newUsers.value = ''
  }
  else {
    const data = newUsersList.value.map(e => ({ email: e.email, name: e.name, nodes: [{ path: '/user/{id}/finnacro', data: { name: e.name } }] }))
    const res = await fetch(`${dataUrl}/_admin/adduser`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.value.token}`,
      },
      body: JSON.stringify(data),
    })
    if (res.status !== 200) {
      console.error('user add failed')
      error.value = 'user add failed'
      return
    }
    error.value = null
    newUsersList.value = []
    refreshUserList()
  }
}

function logout() {
  session.value = {}
}
</script>
