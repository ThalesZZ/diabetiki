'use client'

import GlucoseEventModal from '@/components/glucose-event-modal'
import { deleteGlucoseEvent, updateGlucoseEvent } from '@/lib/api/glucose'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, List, Modal, notification } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EventsList({ events }: { events: any[] }) {
  const router = useRouter()
  const [focusedEvent, setFocusedEvent] =
    React.useState<(typeof events)[number]>()
  const [isDeleting, doDelete] = React.useTransition()

  function onDelete(event: any) {
    Modal.confirm({
      title: 'Delete event?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        doDelete(async () => {
          await deleteGlucoseEvent(event.id)
            .then(() => {
              router.refresh()
              notification.success({
                placement: 'top',
                message: 'Event deleted successfuly.',
              })
            })
            .catch(() => {
              notification.error({
                placement: 'top',
                message: 'Error trying to delete event.',
              })
            })
        })
      },
    })
  }

  return (
    <>
      <List
        size="small"
        dataSource={events}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                key="edit-btn"
                icon={<EditOutlined />}
                onClick={() => setFocusedEvent(() => item)}
              />,
              <Button
                key="delete-btn"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(item)}
                loading={isDeleting}
                danger
              />,
            ]}
          >
            {`${dayjs(item.timestamp).format('YYYY-MM-DD HH:mm')} ${item.value} mg/dL ${item.comment}`}
          </List.Item>
        )}
      />

      <GlucoseEventModal
        key={focusedEvent?.id}
        open={!!focusedEvent}
        event={focusedEvent}
        onSubmit={updateGlucoseEvent}
        onClose={() => setFocusedEvent(() => undefined)}
      />
    </>
  )
}
