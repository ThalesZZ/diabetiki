import { GlucoseEvent } from '@/lib/model'
import { blue } from '@ant-design/colors'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, List, Space, Tooltip, Typography } from 'antd'
import { Droplet, MessageCircleMore } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export type ListItemProps = {
  item: GlucoseEvent
  index: number
  isChecked: boolean
  disableActions: boolean
  setChecked: (event: GlucoseEvent, check: boolean) => void
  deleteItem: (event: GlucoseEvent) => void
}

export default function ListItem({
  item,
  isChecked,
  disableActions,
  setChecked,
  deleteItem,
}: ListItemProps) {
  const pathname = usePathname()
  const router = useRouter()

  function onEdit({ id }: GlucoseEvent) {
    const params = new URLSearchParams({ id })
    const route = pathname.concat('?', params.toString())
    router.push(route)
  }

  const style = React.useMemo<React.CSSProperties>(() => {
    if (!isChecked) return
    return {
      backgroundColor: blue.at(0)
    }
  }, [isChecked])

  return (
    <List.Item
      style={style}
      key={item.id}
      actions={[
        <Button
          key="edit-btn"
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(item)}
          disabled={disableActions}
        />,
        <Button
          key="delete-btn"
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => deleteItem(item)}
          disabled={disableActions}
          danger
        />,
      ]}
    >
      <Space size="middle">
        <Checkbox
          checked={isChecked}
          onClick={() => setChecked(item, !isChecked)}
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
}
