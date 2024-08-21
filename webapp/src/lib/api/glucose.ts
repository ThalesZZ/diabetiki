import api from '.'

export async function createGlucoseRecord(record) {
  return api.post('/glucose', record).then((response) => {
    return response.data
  })
}
