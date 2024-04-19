import React from 'react';
import { Form, Input, Button } from 'antd';
import './login.css'; 

const Login = () => {
  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const loginData = { email, password };

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login, e.g., redirect user to dashboard
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error, e.g., display error message to user
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <Form onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="login-image">
        <img src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dummy Image" />
      </div>
    </div>
  );
};

export default Login;
