<script setup lang="ts">
import useLive, {type Live} from '~/composables/live'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import localeData from 'dayjs/plugin/localeData'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import 'dayjs/locale/fi'
import 'dayjs/locale/en'
import {useIntervalFn} from '@vueuse/core'
import {  useColorMode,
} from 'bootstrap-vue-next'

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
  return data.value.filter((item) => !full.value && item.topic === 'Workshops' || full.value)
    .filter((item) => !past.value && (dayjs(time.value).isBefore(item.to) || !item.to && dayjs(time.value).subtract(1, 'hour').isBefore(item.from) ) || past.value)
    .reduce((acc, item) => {
      const {day, ...rest} = item
      if (!acc[day]) acc[day] = []
      rest.active = dayjs(time.value).isBetween(rest.from, rest.to) || !rest.to && dayjs(time.value).isAfter(rest.from) && dayjs(time.value).subtract(1, 'hour').isBefore(rest.from)
      acc[day].push(rest)
      return acc
    }, {} as Record<string, Omit<Live, 'day'>[]>)
})
useIntervalFn(() => {
  if (time.value.minute() !== dayjs().minute())
    time.value = dayjs()
}, 1000)
</script>

<template>
  <div class="live">
    <div class="d-flex flex-wrap gap-3 mb-3">
      <div class="ps-4"><h2>finnacro.fi/timetable</h2></div>
      <div class="ms-auto" @click="dark = dark === 'light' ? 'dark': 'light'">
        <h2>
          {{ time.format('H:mm') }}
        </h2>
      </div>

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
        <table class="table">
          <tbody>
            <tr v-for="(child, index) in children" :key="index" :class="child.active && 'table-active'">
              <td class="text-nowrap text-left">
                {{ dayjs(child.from).format('H:mm') }} - {{ child.to ? dayjs(child.to).format('H:mm') : '' }}
              </td>
              <td v-if="!child.ws" colspan="4" class="text-center">
                {{ child.topic2 ?? child.topic }}
              </td>
              <template v-else>
                <td v-for="(ws,index) in child.ws" :class="'workshop-'+index">
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
  font-size: 30px;
}
</style>
<route lang="yaml">
meta:
  layout: home
</route>
