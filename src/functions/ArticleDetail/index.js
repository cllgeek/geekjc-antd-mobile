import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom"; //导入的方式跟之前有点变化

import { observable, action, useStrict, runInAction } from "mobx";
import { observer } from "mobx-react";
import moment from "moment";

import "./index.less";

import request from "../../utils/request";

useStrict(true);

class ArticleDetailState {
	@observable data = null;
	@action
	initData = url => {
		request.get(url).then(response => {
			runInAction("获取文章内容", () => {
				this.data = response.data;
			});
		});
	};
}

const newState = new ArticleDetailState();

@observer
class ArticleDetail extends Component {
	componentWillMount() {
		const { props } = this;
		const id = props.match.params.id;
		newState.initData(`/fetch/post/${id}`);
	}
	render() {
		return (
			<div>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={[
						<Icon key="0" type="search" style={{ marginRight: "16px" }} />,
						<Icon key="1" type="ellipsis" />
					]}
				/>
				<div className="articleDetailContainer">
					<h2>{newState.data && newState.data.post.title}</h2>
					<div className="articleDetailInfo">
						<span>{newState.data && newState.data.post.author}</span>
						<div className="right">
							<span className="time">
								{moment(newState.data && newState.data.post.meta.updateAt).format("MM/DD/YYYY")}
							</span>
							<span>{newState.data && newState.data.post.pv}</span>
						</div>
					</div>
					<div
						className="articleDetailContent"
						dangerouslySetInnerHTML={{ __html: newState.data && newState.data.post.content }}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(ArticleDetail);
