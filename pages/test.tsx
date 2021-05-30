import React from 'react'
import {useRouter} from 'next/router'
const test = () => {
  const router = useRouter();
  return (
    <div>
      <pre>{router.asPath}</pre>
    </div>
  )
}

export default test
