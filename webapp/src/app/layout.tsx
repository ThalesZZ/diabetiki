import React from 'react'
import CreateGlucoseRecordModal from './(create-modals)/create-glucose-record-modal'
import Header from './header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <CreateGlucoseRecordModal />
      </body>
    </html>
  )
}
