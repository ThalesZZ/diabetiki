'use client'

import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Segmented, Space } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { SegmentedLabeledOption } from 'antd/es/segmented'
import dayjs, { Dayjs } from 'dayjs'
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

export default function Controls() {
  const [selectedSpanOption, setSelectedSpanOption] =
    React.useState<SpanOption>('today')

  const [customSpan, setCustomSpan] = React.useState<[Dayjs, Dayjs]>()
  const onChangeCustomSpan: RangePickerProps['onChange'] = (dates) => {
    setCustomSpan(dates)
  }

  const span: RangeValueType<Dayjs> = React.useMemo(() => {
    if (selectedSpanOption === 'custom' && !!customSpan) {
      const [customstart, customEnd] = customSpan
      return [customstart.startOf('day'), customEnd.endOf('day')]
    }

    const option = options[selectedSpanOption]
    const [start, end] = option.getValue()
    return [start, end]
  }, [customSpan, selectedSpanOption])

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
      <Space.Compact>
        <DatePicker.RangePicker
          value={span}
          onChange={onChangeCustomSpan}
          disabled={selectedSpanOption !== 'custom'}
        />
        <Button
          icon={<SearchOutlined />}
          disabled={selectedSpanOption !== 'custom'}
        />
      </Space.Compact>
    </Space>
  )
}
