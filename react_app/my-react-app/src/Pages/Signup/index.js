import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./signup.css";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const Signup = () => {
    // State for form input values
    const [formData, setFormData] = useState({
        username : '',
        email: '',
        password: ''
    });

    // Handler function to update form input values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onFinish = async () => {
        try {
            const { username, email, password } = formData;
            console.log(formData);
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username , email, password })
            });
             
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="signup-title">Create User Account</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                                type: 'email',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Sign up
                        </Button>
                        Or <a href="">Login Now!</a>
                    </Form.Item>
                </Form>
            </div>
            <div className="login-image">
                <img
                    src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Dummy Image"
                />
            </div>
        </div>
    );
};

export default Signup;
