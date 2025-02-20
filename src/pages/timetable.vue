<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import useLive, { type Live } from '~/composables/live'
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
onMounted(() => {
  if (window?.location.search) {
    console.log(window.location.search)
    full.value = false
  }
})
</script>

<template>
  <div>
    <div class="d-flex flex-wrap gap-3 mb-3">
      <BFormCheckbox v-model="full" switch>
        All
      </BFormCheckbox>
      <BFormCheckbox v-model="past" switch>
        Show past
      </BFormCheckbox>
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
                  :class="`workshop-${index}`"
                >
                  <div class="w-100 d-flex flex-column justify-content-between rounded">
                    <div v-if="ws.teachers" class="card mb-0">
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

<route lang="yaml">
meta:
  layout: default
</route>
