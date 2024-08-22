import NewGlucoseEventButton from '@/components/new-glucose-event-button'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Layout } from 'antd'
import { Content as LayoutContent } from 'antd/es/layout/layout'
import React from 'react'
import './globals.css'
import Sider from './sider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout>
            <Sider />

            <LayoutContent>{children}</LayoutContent>
          </Layout>

          <NewGlucoseEventButton />
        </AntdRegistry>
      </body>
    </html>
  )
}
