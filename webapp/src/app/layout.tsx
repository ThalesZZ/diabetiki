import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Layout } from 'antd'
import { Content as LayoutContent } from 'antd/es/layout/layout'
import React from 'react'
import CreateGlucoseRecordModal from './(create-modals)/create-glucose-record-modal'
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

          <CreateGlucoseRecordModal />
        </AntdRegistry>
      </body>
    </html>
  )
}
