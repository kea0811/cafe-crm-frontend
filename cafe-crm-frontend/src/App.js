import React from 'react';
import { Layout, Menu } from 'antd';
import {
  CoffeeOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CafePage from './pages/Cafe';
import EmployeePage from './pages/Employee';
import EmployeeForm from './pages/EmployeeForm';
import CafeForm from './pages/CafeForm';

import './App.css';

const { Header, Content, Sider } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header" style={{ padding: 0 }}>
          <div className="logo">
            <p className="header">Cafe CRM</p>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['cafes']}
              style={{ height: '100%', borderRight: 0 }}
              items={[{
                key: 'cafes',
                icon: <CoffeeOutlined />,
                label: <Link to="/cafes">Cafés</Link>,
              }, {
                key: 'employees',
                icon: <TeamOutlined />,
                label: <Link to="/employees">Employees</Link>,
              }]}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: '#fff',
              }}
            >
              <Routes>
                <Route path="/cafes" element={<CafePage />} />
                <Route path="/add-cafe" element={<CafeForm />} />
                <Route path="/edit-cafe/:id" element={<CafeForm />} />
                <Route path="/employees" element={<EmployeePage />} />
                <Route path="/add-employee" element={<EmployeeForm />} />
                <Route path="/edit-employee/:id" element={<EmployeeForm />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
