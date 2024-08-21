import { getGlucoseEvents } from '@/lib/api/glucose'
import React from 'react'

export default async function GlucoseEvents() {
  const events = await getGlucoseEvents()

  return <div>{JSON.stringify(events)}</div>
}
