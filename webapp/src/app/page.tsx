import { PlusOutlined as NewIcon } from '@ant-design/icons'
import { FloatButton } from 'antd'

export default function Page() {
  return (
    <>
      Hello, Next.js!
      <FloatButton type="primary" icon={<NewIcon />} tooltip={'New record'} />
    </>
  )
}
