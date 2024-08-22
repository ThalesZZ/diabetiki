import { HomeFilled as HomeIcon } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'

export default function Sider() {
  return (
    <section>
      <Link href={'/'}>
        <Button icon={<HomeIcon />} />
      </Link>
    </section>
  )
}
