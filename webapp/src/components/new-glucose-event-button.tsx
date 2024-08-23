'use client'

import { createGlucoseEvent } from '@/lib/api/glucose'
import { GlucoseEvent } from '@/lib/model'
import { PlusOutlined as NewIcon } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React from 'react'
import GlucoseEventModal from './glucose-event-modal'

export default function NewGlucoseEventButton() {
  const [openModal, setOpenModal] = React.useState(false)

  async function onCreate(event: GlucoseEvent) {
    event.id = undefined
    return createGlucoseEvent(event)
  }

  return (
    <>
      <FloatButton
        type="primary"
        icon={<NewIcon />}
        tooltip={'New record'}
        onClick={() => setOpenModal(() => true)}
      />

      <GlucoseEventModal
        open={openModal}
        onSubmit={onCreate}
        onClose={() => setOpenModal(() => false)}
      />
    </>
  )
}
