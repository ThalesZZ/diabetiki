'use client'

import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Segmented, Space } from 'antd'
import { SegmentedLabeledOption } from 'antd/es/segmented'
import dayjs, { Dayjs } from 'dayjs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import React from 'react'

const options = {
  today: {
    label: 'Today',
    getValue() {
      return [dayjs().startOf('day'), dayjs().endOf('day')]
    },
  },
  last7Days: {
    label: 'Last 7 days',
    getValue() {
      return [
        dayjs().startOf('day').subtract(1, 'week'),
        dayjs().endOf('day').subtract(1, 'day'),
      ]
    },
  },
  last30Days: {
    label: 'Last 30 days',
    getValue() {
      return [
        dayjs().startOf('day').subtract(1, 'month'),
        dayjs().endOf('day').subtract(1, 'day'),
      ]
    },
  },
  last3Months: {
    label: 'Last 3 months',
    getValue() {
      return [
        dayjs().startOf('day').subtract(3, 'month'),
        dayjs().endOf('day').subtract(1, 'day'),
      ]
    },
  },
  custom: {
    label: 'Custom',
    getValue() {
      return [dayjs(), dayjs()]
    },
  },
}

type SpanOption = keyof typeof options
type Option = (typeof options)[SpanOption]

const defaultSpanOptionKey: SpanOption = 'today'
export const defaultSpanOption: Option = options[defaultSpanOptionKey]

export default function Controls() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [selectedSpanOption, setSelectedSpanOption] =
    React.useState<SpanOption>(defaultSpanOptionKey)

  const [customSpan, setCustomSpan] = React.useState<[Dayjs, Dayjs]>()

  const span: RangeValueType<Dayjs> = React.useMemo(() => {
    const getDatesFromOption = (option: Option): RangeValueType<Dayjs> => {
      const [start, end] = option.getValue()
      return [start, end]
    }

    if (selectedSpanOption === 'custom') {
      if (!customSpan) return getDatesFromOption(options.today)

      const [customstart, customEnd] = customSpan
      return [customstart.startOf('day'), customEnd.endOf('day')]
    }

    const option = options[selectedSpanOption]
    return getDatesFromOption(option)
  }, [customSpan, selectedSpanOption])

  const spanTs = React.useMemo(() => {
    const [spanStart, spanEnd] = span
    const startTs = spanStart.valueOf().toString()
    const endTs = spanEnd.valueOf().toString()

    return [startTs, endTs]
  }, [span])

  const onSearch = React.useCallback(() => {
    const [startTs, endTs] = spanTs
    const params = new URLSearchParams()
    params.set('start', startTs)
    params.set('end', endTs)

    const route = pathname.concat('?', params.toString())
    router.push(route)
  }, [pathname, router, spanTs])

  const disableSearch: boolean = React.useMemo(() => {
    const [startTs, endTs] = spanTs

    const currentStartTs = searchParams.get('start')
    const currentEndTs = searchParams.get('end')

    return startTs === currentStartTs && endTs === currentEndTs
  }, [searchParams, spanTs])

  return (
    <Space className="p-1">
      <Segmented
        value={selectedSpanOption}
        onChange={(value) => setSelectedSpanOption(value as SpanOption)}
        options={Object.entries(options).map<SegmentedLabeledOption>(
          ([key, { label }]) => ({
            label,
            value: key,
            icon: undefined,
          }),
        )}
      />
      <DatePicker.RangePicker
        value={span}
        onChange={setCustomSpan}
        onClick={() => setSelectedSpanOption('custom')}
      />
      <Button
        icon={<SearchOutlined />}
        type="primary"
        onClick={onSearch}
        disabled={disableSearch}
      >
        {'Search'}
      </Button>
    </Space>
  )
}
