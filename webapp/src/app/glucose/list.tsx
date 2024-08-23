'use client'

import GlucoseEventModal from '@/components/glucose-event-modal'
import {
  deleteGlucoseEvent,
  getGlucoseEvents,
  updateGlucoseEvent,
} from '@/lib/api/glucose'
import { GlucoseEvent } from '@/lib/model'
import { DeleteOutlined, DownOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Dropdown,
  DropdownProps,
  Flex,
  List,
  Modal,
  notification,
  Space,
} from 'antd'
import dayjs from 'dayjs'
import { CalendarArrowDown, CalendarArrowUp } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import Controls, { defaultSpanOption } from './controls'
import ListItem, { ListItemProps } from './list-item'

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

const format = 'YYYY-MM-DD'

export default function EventsList() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [startParam, endParam] = React.useMemo(() => {
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    return [start, end]
  }, [searchParams])

  const [selectedSortKey, setSelectedSortKey] =
    React.useState<SortOptionKey>('Newest first')
  const [checkedEvents, setCheckedEvents] = React.useState<
    GlucoseEvent['id'][]
  >([])

  const [rawEvents, setRawEvents] = React.useState<GlucoseEvent[]>([])
  const events = React.useMemo(() => {
    return rawEvents.sort((ev1, ev2) => {
      const diff = ev1.timestamp.valueOf() - ev2.timestamp.valueOf()
      const toggler = selectedSortKey === 'Oldest first' ? 1 : -1
      return diff * toggler
    })
  }, [rawEvents, selectedSortKey])

  const focusedEventId = searchParams.get('id')
  const [spanStart, spanEnd] = React.useMemo(() => {
    const getDatesFromParams = (startParam: string, endParam: string) => {
      const startTs = Number(startParam)
      const endTs = Number(endParam)

      const start = dayjs(startTs)
      const end = dayjs(endTs)
      return [start, end]
    }

    if (!startParam && !endParam) {
      const [_defaultStart, _defaultEnd] = defaultSpanOption.getValue()
      const defaultStart = _defaultStart.valueOf().toString()
      const defaultEnd = _defaultEnd.valueOf().toString()
      return getDatesFromParams(defaultStart, defaultEnd)
    }

    return getDatesFromParams(startParam, endParam)
  }, [endParam, startParam])

  const focusedEvent = React.useMemo(() => {
    return events.find((e) => e.id === focusedEventId)
  }, [events, focusedEventId])

  const toggleCheckEvent: ListItemProps['setChecked'] = (event, check) => {
    setCheckedEvents((prev) => {
      const curr = [...prev]
      if (check) curr.push(event.id)
      else curr.splice(curr.indexOf(event.id), 1)
      return curr
    })
  }

  function onCancelEdit() {
    router.push(pathname)
  }

  const [isDeleting, doDelete] = React.useTransition()
  function onDelete(
    eventsIds: typeof checkedEvents,
    src: 'delete-selected-items' | 'delete-item',
  ) {
    Modal.confirm({
      title: eventsIds.length > 1 ? 'Delete events?' : 'Delete event?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        doDelete(async () => {
          await deleteGlucoseEvent(eventsIds)
            .then(() => {
              setCheckedEvents((prev) => {
                if (src === 'delete-selected-items') return []

                const next = [...prev]
                const [deletedId] = eventsIds
                const index = next.indexOf(deletedId)
                if (index >= 0) next.splice(index, 1)
                return next
              })

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

  React.useEffect(() => {
    const filters = { start: spanStart.valueOf(), end: spanEnd.valueOf() }
    getGlucoseEvents(filters).then((response) => {
      setRawEvents(response)
    })
  }, [spanEnd, spanStart])

  return (
    <Flex vertical gap="small">
      <Controls />

      <List
        header={
          <Flex justify="space-between" align="center">
            <Space>
              <span>{`Showing ${events.length} events from ${spanStart.format(format)} to ${spanEnd.format(format)}`}</span>
              {checkedEvents.length > 0 && (
                <>
                  <Divider type="vertical" />
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    size="small"
                    danger
                    onClick={() =>
                      onDelete(checkedEvents, 'delete-selected-items')
                    }
                  >
                    {'Delete selected events'}
                  </Button>

                  <Button
                    type="link"
                    size="small"
                    onClick={() => setCheckedEvents([])}
                  >
                    {'Clear selection'}
                  </Button>
                </>
              )}
            </Space>

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
        renderItem={(item, index) => {
          const isChecked = checkedEvents.includes(item.id)
          return (
            <ListItem
              item={item}
              index={index}
              isChecked={isChecked}
              disableActions={isDeleting}
              setChecked={toggleCheckEvent}
              deleteItem={(event) => onDelete([event.id], 'delete-item')}
            />
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
