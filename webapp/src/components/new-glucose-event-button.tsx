'use client'

import { createGlucoseEvent } from '@/lib/api/glucose'
import { PlusOutlined as NewIcon } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React from 'react'
import GlucoseEventModal from './glucose-event-modal'

export default function NewGlucoseEventButton() {
  const [openModal, setOpenModal] = React.useState(false)

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
        onSubmit={createGlucoseEvent}
        onClose={() => setOpenModal(() => false)}
      />
    </>
  )
}
