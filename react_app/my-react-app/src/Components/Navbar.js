import React from 'react';
import { Layout, Menu, Button } from 'antd';
import './Navbar.css';
import { Link } from 'react-router-dom';


const { Header } = Layout;

const Navbar = () => {

  return (
    <div>
      <Layout className="layout">
        <Header className="header">
          <div className="nav-buttons">
            <Button type="primary">Login</Button>
            <Button type="primary" className='sign-up-button'>Sign Up</Button>
          </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} className="nav-menu">
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Services</Menu.Item>
            <Menu.Item key="4">Contact</Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <div className="dark-background"></div>
    </div>
  );
}

export default Navbar;
