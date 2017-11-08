import React from 'react'
import { TabBar } from 'antd-mobile';

import CustomIcon from '../CustomIcon/CustomIcon.js'
import Index from './Index.js'

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        hello,world! 暂无内容!
      </div>
    );
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={
              <CustomIcon type={require('../../svg/index.svg')} size="xxs" />
            }
            selectedIcon={
              <CustomIcon type={require('../../svg/indexActive.svg')} size="xxs" />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <Index />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <CustomIcon type={require('../../svg/index.svg')} size="xxs" />
            }
            selectedIcon={
              <CustomIcon type={require('../../svg/indexActive.svg')} size="xxs" />
            }
            title="暂无"
            key="none1"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('none1')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <CustomIcon type={require('../../svg/index.svg')} size="xxs" />
            }
            selectedIcon={
              <CustomIcon type={require('../../svg/indexActive.svg')} size="xxs" />
            }
            title="暂无"
            key="none2"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('none2')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <CustomIcon type={require('../../svg/index.svg')} size="xxs" />
            }
            selectedIcon={
              <CustomIcon type={require('../../svg/indexActive.svg')} size="xxs" />
            }
            title="暂无"
            key="none3"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('none3')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}