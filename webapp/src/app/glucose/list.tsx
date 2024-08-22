'use client'

import { deleteGlucoseEvent } from '@/lib/api/glucose'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, List, Modal, notification } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

export default function EventsList({ events }: { events: any[] }) {
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
    <List
      size="small"
      dataSource={events}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Button key="edit-btn" icon={<EditOutlined />} />,
            <Button
              key="delete-btn"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(item)}
              loading={isDeleting}
              danger
            />,
          ]}
        >
          {`${dayjs(item.timestamp).format('YYYY-MM-DD HH:mm')} ${item.value} mg/dL`}
        </List.Item>
      )}
    />
  )
}
