import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routerConfig } from './Router';

const { Header, Sider, Content } = Layout;

export default class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderMenu = (config) => {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {
          config.map(item => (
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                <Icon type={item.iconType} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    );
  };

  renderContent = (config) => {
    return config.map(item => <Route key={item.path} path={item.path} exact component={item.content} />);
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            {this.renderMenu(routerConfig)}
          </Sider>
          <div style={{ flex: 'auto', overflow: 'scroll' }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              {this.renderContent(routerConfig)}
            </Content>
          </div>
        </Layout>
      </Router>
    );
  }
}