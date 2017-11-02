import React,{ Component } from 'react'
import { Tabs, Button, WhiteSpace } from 'antd-mobile'
import {BrowserRouter as Router,Route,Link,withRouter} from 'react-router-dom'//导入的方式跟之前有点变化

import {observable, action, useStrict, runInAction} from 'mobx'
import { observer } from 'mobx-react'

import './Article.less'

import request from '../../utils/request'

class MyState {
  @observable data = null
  @observable num = 0
  @action addNum = () => {
    this.num++
  }
  @action deleteNum = () => {
    this.num--
  }
  @action initData = (url) => {
    request.get(url)
    .then((response)=>{
      this.data = response.data.result
    })
  }
}

const newState = new MyState()

@observer
class ArticleTab extends Component{
	constructor(props){
		super(props)
		this.state={
			isCurrent:0,
			tabs:[
             {title:"前端开发"},
             {title:"后台开发"},
             {title:"移动开发"},
             {title:"相关工具"},
             {title:"其它相关"},
             {title:"福利页面"}
			]
		}
	}
	componentDidMount() {
		newState.initData('/fetch/results?cat=前端开发&p=0')
	}
	render(){
	    return (
	         <Tabs tabs={this.state.tabs}>
	           {this.state.tabs.map((val,i)=>
                 <div key={i}>
			       <p className="nav">Content of {val.title}</p>
			       <Button onClick={newState.addNum}>mobx</Button>
			       <p>结果：{newState.num}</p>
			     </div>
	           )}
	         </Tabs>
	    )
    }
}

class Article extends Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	render(){
		return(
          <div className="articleContainer">
            <ArticleTab />
          </div>    
		)
	}
}


export default withRouter(Article)