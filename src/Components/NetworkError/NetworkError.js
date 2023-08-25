import React from 'react'
import { Alert, Space } from 'antd'

function NetworkError() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message="Error" description="Unable to load website due to no internet connection" type="error" showIcon />
    </Space>
  )
}

export default NetworkError
