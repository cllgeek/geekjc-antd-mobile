import React from 'react'
import { Flex, WingBlank } from 'antd-mobile'

import CustomIcon from '../CustomIcon/CustomIcon'
import CarouselComponent from './Carousel'
import Category from '../Category'

import { inject } from 'mobx-react';

import './Index.less'

@inject('testObj')
class Index extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	renderCarousel = () => {

	}
	render(){
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
								<CustomIcon type={require('../../svg/menu.svg')} size='md' />
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
		  </div>
		)
	}
}

export default Index
