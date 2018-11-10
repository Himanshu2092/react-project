/**
 *
 * HocHeader
 *
 */

import React from 'react';

import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

function HocHeader(WrappedComponent, key) {
  class HOC extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        selected: [key],
      };
    }

    handle = item => {
      let { selected } = this.state;
      selected = [];
      const index = selected.findIndex(x => x === item.key);
      if (index === -1) {
        selected.push(item.key);
        this.setState({
          selected,
        });
      }
    };

    render() {
      const { selected } = this.state;
      return (
        <div>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={selected}
                style={{ lineHeight: '64px' }}
                onClick={this.handle}
                // selectedKeys={selected}
              >
                <Menu.Item key="1">
                  <Link to="/">Create</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/poll">Poll</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/stats">Stats</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px', margin: '16px 0' }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <WrappedComponent />
              </div>
            </Content>
          </Layout>
        </div>
      );
    }
  }

  return HOC;
}

export default HocHeader;
