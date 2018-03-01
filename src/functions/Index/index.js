import React from 'react'
import { Flex, WingBlank } from 'antd-mobile'

import CustomIcon from '../../components/CustomIcon'
import Gmenu from '../../components/Gmenu'
import CarouselComponent from './Carousel'
import Category from '../Category'

import { inject } from 'mobx-react';

import './index.less'

const menus=[
	{
		title: '关于我',
		iconUrl: 'https://geekjc-img.geekjc.com/about_me.png',
	},
]
@inject('testObj')
class Index extends React.Component{
	constructor(props){
		super(props)
		this.state={
			show: false
		}
	}

	onMaskClick = () => {
    this.setState({
			show: false,
		})
	}
	onOpenChange = () => {
		this.setState({show: !this.state.show})
	}
	render(){
		const { show } = this.state;
		return(
		  <div className="indexContainer">
			 <div className="header">
					<WingBlank size='md'>
						<Flex justify={'center'}>
							<Flex.Item>
								<img src="https://geekjc-img.geekjc.com/logo-rn.png" alt="logo.png" className="logo" />
							</Flex.Item>
							{/* <Flex.Item style={{flex:3}}>
								<SearchBar placeholder="请输入搜索关键词" />
							</Flex.Item> */}
							<Flex.Item style={{flex:8}}>
								<h1>极客教程</h1>
							</Flex.Item>
							<Flex.Item>
								<CustomIcon type={require('../../svg/menu.svg')} size='md' onClick={this.onOpenChange} />
							</Flex.Item>
						</Flex>
					</WingBlank>
				</div>
				<WingBlank size='md'>
						<CarouselComponent />
				</WingBlank>
				<WingBlank size='md'>
					<Category />
				</WingBlank>
				<Gmenu
					data={menus}
					show={show}
					onMaskClick={this.onMaskClick}
				/>
		  </div>
		)
	}
}

export default Index
