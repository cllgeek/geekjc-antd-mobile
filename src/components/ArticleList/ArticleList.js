import React,{ Component } from 'react'
import { Tabs } from 'antd-mobile'
import {withRouter} from 'react-router-dom'//导入的方式跟之前有点变化

import {observable, action, useStrict, runInAction} from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment'
import marked from 'marked'

import './ArticleList.less'

import request from '../../utils/request'

useStrict(true)

class CallApi {
	getItemList = (url) => request.get(url)
}

class ArticleListState {
  @observable tabs =[
	 {title:"前端开发"},
	 {title:"后台开发"},
	 {title:"移动开发"},
	 {title:"相关工具"},
	 {title:"其它相关"},
	 {title:"福利页面"}
	]

	constructor(callApi){
		this.callApi = callApi
	}

  @observable data = null
  @observable num = 0
  @action initData = async (url) => {

		const data = await this.callApi.getItemList(url)
		runInAction("获取文章列表",()=>{
			this.data = data.data
		})
  }
}

const callApi = new CallApi()
const newState = new ArticleListState(callApi)

@observer
class ArticleListTab extends Component{
	componentWillMount() {
		newState.initData('/fetch/results?t=postlist&cat=前端开发&p=0')
	}
	tabChange = (tab,index) => {
		let url = `/fetch/results?t=postlist&cat=${tab.title}&p=0`
    newState.initData(url)
	}
	render(){
	    return (
	         <Tabs tabs={newState.tabs} onChange={this.tabChange} swipeable="false" useOnPan="false">
	           {newState.tabs.map((val,i)=>
                 <div key={i}>
			       <ul className="articleListUl">
			       	{newState.data&&newState.data.results.map((v,k)=>
                      <li key={k} className="articleListLi">
			            <p>{v.author}·<span>{ v.meta?moment(v.meta.createAt).format('MM/DD/YYYY'):''}</span></p>
			            <a onClick={()=>{this.props.history.push(`/post/${v._id}`)}} className="articleListTitle">{v.title}</a>
			            <a onClick={()=>{this.props.history.push(`/post/${v._id}`)}} className="articleListDescribe" dangerouslySetInnerHTML={{ __html:`${marked(v.content.slice(0,100))}...` }} />
			            <div className="articleListFooter">
			              <span>pv:{v.pv}</span>
			              <a onClick={()=>{this.props.history.push(`/post/${v._id}`)}} className="readAll">阅读全文</a>
			            </div>
			          </li>
			       	)}
			       </ul>
			     </div>
	           )}
	         </Tabs>
	    )
    }
}

const WrapperArticleListTab = withRouter(ArticleListTab)

class ArticleList extends Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	render(){
		return(
          <div className="articleListContainer">
            <WrapperArticleListTab />
          </div>
		)
	}
}


export default withRouter(ArticleList)
