import api from '.'

export async function getGlucoseEvents(): Promise<any[]> {
  return api.get('/glucose').then((response) => {
    const { data } = response
    return data
  })
}

export async function createGlucoseEvent(record) {
  return api.post('/glucose', record).then((response) => {
    return response.data
  })
}

export async function deleteGlucoseEvent(id: string) {
  return api.delete('/glucose/' + id)
}
