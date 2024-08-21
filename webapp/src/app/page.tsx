import { Button } from 'antd'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Link href={'/glucose'}>
        <Button>{'Glucose Events'}</Button>
      </Link>
    </>
  )
}
