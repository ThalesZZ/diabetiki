import { GlucoseEvent } from '@/lib/model'
import api from '.'
import { fromDTO, GlucoseEventDTO } from '../model/GlucoseEvent'

export async function getGlucoseEvents() {
  return api.get<GlucoseEventDTO[]>('/glucose').then((response) => {
    const { data } = response
    return data.map(fromDTO)
  })
}

export async function createGlucoseEvent(event: Omit<GlucoseEvent, 'id'>) {
  return api.post<GlucoseEventDTO>('/glucose', event).then((response) => {
    const { data } = response
    return fromDTO(data)
  })
}

export async function updateGlucoseEvent(event: GlucoseEvent) {
  return api.post<GlucoseEventDTO>('/glucose/edit', event).then((response) => {
    const { data } = response
    return fromDTO(data)
  })
}

export async function deleteGlucoseEvent(id: string) {
  return api.delete('/glucose/' + id)
}
