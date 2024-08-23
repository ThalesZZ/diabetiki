import { GlucoseEvent } from '@/lib/model'
import api from '.'
import { GlucoseEventDTO } from '../model/GlucoseEvent'

export async function getGlucoseEvents() {
  return api.get<GlucoseEventDTO[]>('/glucose').then((response) => {
    const { data } = response
    return data
  })
}

export async function createGlucoseEvent(event: Omit<GlucoseEvent, 'id'>) {
  return api.post<GlucoseEventDTO>('/glucose', event).then((response) => {
    const { data } = response
    return data
  })
}

export async function updateGlucoseEvent(event: GlucoseEvent) {
  return api.post<GlucoseEventDTO>('/glucose/edit', event).then((response) => {
    const { data } = response
    return data
  })
}

export async function deleteGlucoseEvent(eventsIds: GlucoseEvent['id'][]) {
  const params = new URLSearchParams({ ids: eventsIds.join(',') })
  return api.delete('/glucose'.concat('?', params.toString()))
}
