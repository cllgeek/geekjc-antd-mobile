import React from 'react'
import { Flex,SearchBar,WingBlank } from 'antd-mobile'

import './Index.less'

import Article from '../Article/Article'

class Index extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	render(){
		return(
		  <div className="indexContainer">
            <div className="header">
              <WingBlank>
	              <Flex> 
				     <Flex.Item>
	                   <img src="https://geekjc-img.geekjc.com/logo-rn.png" alt="logo.png" className="logo" />
				     </Flex.Item>
				     <Flex.Item style={{flex:3}}>
				       <SearchBar placeholder="请输入搜索关键词" />
				     </Flex.Item>
				  </Flex>
			  </WingBlank>
            </div>
            <Article />
		  </div>
		)
	}
}

export default Index