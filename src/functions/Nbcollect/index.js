import React,{ Component } from 'react'
import { Modal,Pagination,WingBlank,WhiteSpace,Grid } from 'antd-mobile'
import {withRouter} from 'react-router-dom'

import {observable, action, useStrict, runInAction} from 'mobx'
import { observer } from 'mobx-react'

import getUrlQuery from '../../utils/getUrlQuery'
import request from '../../utils/request'
import './index.less'

useStrict(true)

class CallApi {
	getNbcollectList = (url) => request.get(url)
}

class NbcollectListState {

	constructor(callApi){
		this.callApi = callApi
	}

  @observable data = null

  @action initData = async (url) => {

		const data = await this.callApi.getNbcollectList(url)
		runInAction("获取牛人列表",()=>{
			this.data = data.data
		})
  }
}

const callApi = new CallApi()
const newState = new NbcollectListState(callApi)

@observer
class Nbcollect extends Component{
  constructor(props){
      super(props)
      this.state={
        modalVisile:false
      }
	}

	componentWillMount() {
		const { props } = this
		const query = getUrlQuery(props.location.search)
		const p=query.p ? query.p : 0
		newState.initData(`/fetch/nbcollect?p=${p}`)
	}
  onPageChange = (page) => {
		const { props } = this
    const oldHref=props.location.search;
    const nPage=page-1;
		const newHref=oldHref.replace(/p=\d/,`p=${nPage}`).split('/')[0];
		props.history.push(`/${newHref}`)
    newState.initData(`/fetch/nbcollect?p=${nPage}`)
  }
	render(){
    const { state } = this
    const isTops = newState.data&&newState.data.results.filter((val,i)=> val.isTop===1)
		const notTops = newState.data&&newState.data.results.filter((val,i)=> val.isTop===0)
		const prefixclass = 'nbcollect'
		let pageSize = 12,total
		total = Math.ceil(newState.data&&newState.data.total/pageSize)
		return(
          <div className={`${prefixclass}`}>
						 <WhiteSpace />
						 <WingBlank>
             <div className={`${prefixclass}-container`}>
                <div className="ad"></div>
                <div className={`${prefixclass}-topPanel`}>
                  <h2 style={{marginBottom:"10px"}}>程序名人汇</h2>
                  <span>推荐一些比较知名的程序开发大神、他们的github和他们个人开发教程网站等，跟随大神的脚步，学习最新的程序开发知识，时刻让自己走在前面！欢迎邮箱推荐或者自荐。更多好站推荐</span>
                </div>
								<div>
									<div className={`${prefixclass}-isTop`}>
										{ isTops&&isTops.map((val,i)=>
											<a className={`${prefixclass}-aItem`} key={i} onClick={()=>{this.setState({modalVisile:true,currentNb:val})}}>
											<img src={val.img_url} width="80" height="80" alt={val.name}/>
										</a>
										)}
									</div>
								<ul className={`${prefixclass}-ul`}>
									<Grid
										style={{clear:'both'}}
										hasLine={false}
										data={notTops}
										columnNum={3}
										renderItem={val => (
											<a className={`${prefixclass}-singleCard`} onClick={()=>{this.setState({modalVisile:true,currentNb:val})}}>
												<img src={val.img_url} width="80" height="80" alt={val.name} />
												<span className={`${prefixclass}-tit`}>{val.name}</span>
												<span className={`${prefixclass}-tag`}>{val.introduce}</span>
											</a>
										)}
									/>
								</ul>
								</div>
                <Pagination
                  style={{margin:"20px 0"}}
                  className="ant-table-pagination"
                  total={total}
                  current={newState.data&&newState.data.currentPage}
									locale={{
										prevText: 'Prev',
										nextText: 'Next',
									}}
                  onChange={this.onPageChange}
                />
             </div>
						 </WingBlank>
             <Modal
							title="详情"
							transparent
		          visible={this.state.modalVisile}
              onClose={()=>{this.setState({modalVisile:false})}}
              footer={[]}
		        >
		          <div>
                <a className={`${prefixclass}-modal-a`} href={state.currentNb&&state.currentNb.personalWebsite} target="_blank" rel="external nofollow">
                  <img className={`${prefixclass}-modal-img`} src={state.currentNb&&state.currentNb.img_url} alt={state.currentNb&&state.currentNb.name}/>
                </a>
                <div>
                  <h2 style={{marginBottom:"10px"}}>{state.currentNb&&state.currentNb.name}</h2>
                  <span>
                    领域：<a href={`https://www.geekjc.com/containerlist?t=postlist&cat=${state.currentNb&&state.currentNb.subject}开发&p=0`} target="_blank">{state.currentNb&&state.currentNb.subject}</a>
                  </span>
                  <div>
                    <p style={{marginTop:"10px",whiteSpace:"normal"}}>{state.currentNb&&state.currentNb.introduce}</p>
                  </div>
                </div>
                <div style={{marginTop:"20px",textAlign:"center"}}>
                  <a style={{marginRight:"5px"}} className={`${prefixclass}-btn`} href={state.currentNb&&state.currentNb.github} target="_blank" rel="external nofollow">{state.currentNb&&state.currentNb.name}的github</a>
                  <a className={`${prefixclass}-btn ${prefixclass}-btn-primary`} href={state.currentNb&&state.currentNb.personalWebsite} target="_blank" rel="external nofollow">{state.currentNb&&state.currentNb.name}的网站</a>
                </div>
              </div>
		        </Modal>
          </div>
		)
	}
}

export default withRouter(Nbcollect)
