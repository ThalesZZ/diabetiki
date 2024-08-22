import { getGlucoseEvents } from '@/lib/api/glucose'
import EventsList from './list'

export default async function GlucoseEvents() {
  const events = await getGlucoseEvents()

  return <EventsList events={events} />
}
