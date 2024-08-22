'use client'

import {
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import LayoutSider from 'antd/es/layout/Sider'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Sider() {
  const pathname = usePathname()
  const router = useRouter()

  const onSelect = React.useCallback(
    (route: string) => () => {
      router.push(route)
    },
    [router],
  )

  return (
    <LayoutSider collapsible>
      <Menu
        selectedKeys={[pathname]}
        theme="dark"
        items={[
          {
            key: '/',
            label: 'Home',
            icon: <HomeOutlined />,
            onClick: onSelect('/'),
          },
          {
            key: '/glucose',
            label: 'Book',
            icon: <BookOutlined />,
            onClick: onSelect('/glucose'),
          },
          {
            key: '/profile',
            label: 'Profile',
            icon: <UserOutlined />,
            onClick: onSelect('/profile'),
          },
          {
            key: '/settings',
            label: 'Settings',
            icon: <SettingOutlined />,
            onClick: onSelect('/settings'),
          },
        ]}
      />
    </LayoutSider>
  )
}
