import NchanSubscriber from 'nchan'
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
  fetch('https://test.mhx.fi/finnacro-data.json')
    .then((res) => res.json())
    .then((rdata) => {
      // console.log(rdata)
      data.value = rdata
    })

  const nchan = new NchanSubscriber('https://test.mhx.fi/finnacro-sub')
  nchan.on('message', (event: string) => {
    const ndata = JSON.parse(event)
    // console.log(ndata)
    data.value = ndata
  })

  nchan.start()
  console.log(data)
  return data
}

