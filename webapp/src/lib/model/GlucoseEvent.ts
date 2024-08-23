import dayjs, { Dayjs } from 'dayjs'

export type GlucoseEventDTO = {
  id: string
  timestamp: string
  value: number
  comment?: string
}

export interface GlucoseEvent {
  id: string
  timestamp: Dayjs
  value: number
  comment?: string
}

export function fromDTO(dto: GlucoseEventDTO): GlucoseEvent {
  return {
    id: dto.id,
    timestamp: dayjs(dto.timestamp),
    value: dto.value,
    comment: dto.comment,
  }
}
