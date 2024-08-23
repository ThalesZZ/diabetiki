'use client'

import GlucoseEventModal from '@/components/glucose-event-modal'
import { deleteGlucoseEvent, updateGlucoseEvent } from '@/lib/api/glucose'
import { GlucoseEvent } from '@/lib/model'
import { GlucoseEventDTO, parse } from '@/lib/model/GlucoseEvent'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownProps,
  Flex,
  List,
  Modal,
  notification,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import {
  CalendarArrowDown,
  CalendarArrowUp,
  Droplet,
  MessageCircleMore,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import Controls, { defaultSpanOption } from './controls'

type SortOptionKey = 'Newest first' | 'Oldest first'
type SortOption = DropdownProps['menu']['items'][number] & {
  key: SortOptionKey
}

const sortOptions: SortOption[] = [
  {
    key: 'Newest first',
    label: 'Newest first',
    icon: <CalendarArrowDown className="w-4 h-4" />,
  },
  {
    key: 'Oldest first',
    label: 'Oldest first',
    icon: <CalendarArrowUp className="w-4 h-4" />,
  },
]

export default function EventsList({
  events: eventsDTO,
}: {
  events: GlucoseEventDTO[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [selectedSortKey, setSelectedSortKey] =
    React.useState<SortOptionKey>('Oldest first')
  const [checkedEvents, setCheckedEvents] = React.useState<string[]>([])

  const events = React.useMemo(() => {
    return eventsDTO.map(parse).sort((ev1, ev2) => {
      const diff = ev1.timestamp.valueOf() - ev2.timestamp.valueOf()
      const toggler = selectedSortKey === 'Oldest first' ? 1 : -1
      return diff * toggler
    })
  }, [eventsDTO, selectedSortKey])

  const focusedEventId = searchParams.get('id')
  const [spanStart, spanEnd] = React.useMemo(() => {
    const getDatesFromParams = (startParam: string, endParam: string) => {
      const startTs = Number(startParam)
      const endTs = Number(endParam)

      const format = 'YYYY-MM-DD'
      const start = dayjs(startTs).format(format)
      const end = dayjs(endTs).format(format)
      return [start, end]
    }

    const startParam = searchParams.get('start')
    const endParam = searchParams.get('end')

    if (!startParam && !endParam) {
      const [_defaultStart, _defaultEnd] = defaultSpanOption.getValue()
      const defaultStart = _defaultStart.valueOf().toString()
      const defaultEnd = _defaultEnd.valueOf().toString()
      return getDatesFromParams(defaultStart, defaultEnd)
    }

    return getDatesFromParams(startParam, endParam)
  }, [searchParams])

  const focusedEvent = React.useMemo(() => {
    return events.find((e) => e.id === focusedEventId)
  }, [events, focusedEventId])

  function toggleCheckEvent(event: GlucoseEvent, check: boolean) {
    setCheckedEvents((prev) => {
      const curr = [...prev]
      if (check) curr.push(event.id)
      else curr.splice(curr.indexOf(event.id), 1)
      return curr
    })
  }

  function onEdit(event: GlucoseEvent) {
    const params = new URLSearchParams()
    params.set('id', event.id)
    const route = pathname.concat('?', params.toString())
    router.push(route)
  }

  function onCancelEdit() {
    router.push(pathname)
  }

  const [isDeleting, doDelete] = React.useTransition()
  function onDelete(event: GlucoseEvent) {
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
    <Flex vertical gap="small">
      <Controls />

      <List
        header={
          <Flex justify="space-between" align="center">
            <span>{`Showing ${events.length} events from ${spanStart} to ${spanEnd}`}</span>
            <Dropdown
              menu={{
                items: sortOptions,
                onClick: (evt) => setSelectedSortKey(evt.key as SortOptionKey),
                selectedKeys: [selectedSortKey],
              }}
            >
              <Button icon={<DownOutlined />} iconPosition="end" type="link">
                {selectedSortKey}
              </Button>
            </Dropdown>
          </Flex>
        }
        bordered
        size="small"
        dataSource={events}
        renderItem={(item) => {
          const isChecked = checkedEvents.includes(item.id)

          return (
            <List.Item
              key={item.id}
              actions={[
                <Button
                  key="edit-btn"
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(item)}
                />,
                <Button
                  key="delete-btn"
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(item)}
                  loading={isDeleting}
                  danger
                />,
              ]}
            >
              <Space size="middle">
                <Checkbox
                  checked={isChecked}
                  onClick={() => toggleCheckEvent(item, !isChecked)}
                />
                <Typography.Text type="secondary">
                  <Space>
                    {<CalendarOutlined />}
                    {item.timestamp.format('YYYY-MM-DD')}
                  </Space>
                </Typography.Text>
                <Typography.Text type="secondary">
                  <Space>
                    {<ClockCircleOutlined />}
                    {item.timestamp.format('HH:mm')}
                  </Space>
                </Typography.Text>
                <Typography.Text>
                  <Space>
                    <Droplet className="w-4 h-4" />
                    {item.value}
                  </Space>
                </Typography.Text>
                {item.comment && (
                  <Typography.Text type="secondary">
                    <Tooltip title={item.comment} placement="rightTop">
                      <MessageCircleMore className="w-4 h-4" />
                    </Tooltip>
                  </Typography.Text>
                )}
              </Space>
            </List.Item>
          )
        }}
      />

      <GlucoseEventModal
        key={focusedEventId}
        open={!!focusedEvent}
        event={focusedEvent}
        onSubmit={updateGlucoseEvent}
        onClose={onCancelEdit}
      />
    </Flex>
  )
}
