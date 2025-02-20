export interface Live {
  day: string
  from: string
  active: boolean
  to: string
  topic: string
  topic2: string
  ws: Workshop[]
}

interface Workshop {
  teachers: string
  topic: string
  content: string
  prereqs: string
  gym: string
}
const data = ref<Live[]>([])
export default function useLive() {
  // fetch('https://data.mhx.fi/finnacro-data')
  //   .then((res) => res.json())
  //   .then((rdata) => {
  //     // console.log(rdata)
  //     data.value = rdata
  //   })
  if (typeof EventSource === 'undefined') {
    console.log('EventSource not supported')
    return data
  }
  const e = new EventSource('https://data.mhx.fi/finnacro-data')
  e.onmessage = (event) => {
    data.value = JSON.parse(event.data)
  }
  e.onerror = (event) => {
    console.log(event)
  }
  console.log(data)
  return data
}
