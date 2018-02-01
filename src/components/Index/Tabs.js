import React from 'react'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import ArticleList from '../ArticleList/ArticleList'

import CustomIcon from '../CustomIcon/CustomIcon.js'
import Index from './Index.js'

import getUrlQuery from '../../utils/getUrlQuery'

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
	}


	componentWillMount() {
		const { search } = this.props.location
		if(search !== ''){
			const query = getUrlQuery(search)
			console.log(query)
			switch(query.type){
				case 'article':
					this.setState({selectedTab: query.type})
					break;
				default:
					return
			}
		}
	}


  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        hello,world! 暂无内容!
      </div>
    );
  }

  render() {
		const { props } = this
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
              <CustomIcon type={require('../../svg/index_active.svg')} size="xxs" />
            }
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
							props.history.push('/')
              this.setState({
                selectedTab: 'home',
              });
            }}
            data-seed="logId"
          >
						{ this.state.selectedTab === 'home' ?
							<Index /> : ''
						}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <CustomIcon type={require('../../svg/article.svg')} size="xxs" />
            }
            selectedIcon={
              <CustomIcon type={require('../../svg/article_active.svg')} size="xxs" />
            }
            title="文章"
            key="none1"
            selected={this.state.selectedTab === 'article'}
            onPress={() => {
							props.history.push('/?type=article')
              this.setState({
                selectedTab: 'article',
              });
            }}
            data-seed="logId1"
          >
						{ this.state.selectedTab === 'article' ?
							<ArticleList /> : ''
						}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <CustomIcon type={require('../../svg/index.svg')} size="xxs" />
            }
            selectedIcon={
              <CustomIcon type={require('../../svg/index_active.svg')} size="xxs" />
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
              <CustomIcon type={require('../../svg/index_active.svg')} size="xxs" />
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

export default withRouter(Tabs)
