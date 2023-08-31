import React from 'react'
import { Alert, Space } from 'antd'

import './ErrorHandling.css'

function ErrorHandling({ errorMessage }) {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message="Error" description={errorMessage} type="error" showIcon />
    </Space>
  )
}

export default ErrorHandling
