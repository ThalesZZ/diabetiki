import React from 'react'
import CreateGlucoseRecordModal from './(create-modals)/create-glucose-record-modal'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>

        <CreateGlucoseRecordModal />
      </body>
    </html>
  )
}
