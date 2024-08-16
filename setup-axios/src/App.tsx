import { useState } from 'react'
import './App.css'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import service from './services';
import { User } from './services/auth';

function App() {
  const [dataList,setDataList] = useState<any[]>([])

  const onFinish: FormProps<User>['onFinish'] = async (values) => {
      const data = await service.auth.login(values)
  };

  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default App
