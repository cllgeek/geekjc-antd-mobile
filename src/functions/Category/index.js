import React from 'react'
import CategorySingle from './CategorySingle'
import {observable, action, useStrict, runInAction} from 'mobx'
import { observer } from 'mobx-react'
import request from '../../utils/request'
import './index.less'

useStrict(true)
class CallApi {
	getCategoryList = (url) => request.get(url)
}

class IndexState {
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
  @action initData = async (url) => {

		const data = await this.callApi.getCategoryList(url)
		runInAction("获取首页列表",()=>{
			this.data = data.data
		})
  }
}

const callApi = new CallApi()
const newState = new IndexState(callApi)

@observer
class Category extends React.Component{
		componentWillMount() {
			newState.initData('/admin/categoryNote/list')
		}
    render(){
			// const { names,bookAll }= this.props
      return(
        <div>
					{newState.data&&newState.data.names.map((item,index)=>
            <CategorySingle key={index} name={item} books={newState.data&&newState.data.bookAll[index]} />
           )
					}
        </div>
      )
    }
}

export default Category
