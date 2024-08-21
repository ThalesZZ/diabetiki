import api from '.'

export async function getGlucoseEvents() {
  return api.get('/glucose').then((response) => {
    return response.data
  })
}

export async function createGlucoseEvent(record) {
  return api.post('/glucose', record).then((response) => {
    return response.data
  })
}
