import NewGlucoseEventButton from '@/components/new-glucose-event-button'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, Layout } from 'antd'
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
          <App>
            <Layout>
              <Sider />

              <LayoutContent className="px-4">{children}</LayoutContent>
            </Layout>

            <NewGlucoseEventButton />
          </App>
        </AntdRegistry>
      </body>
    </html>
  )
}
