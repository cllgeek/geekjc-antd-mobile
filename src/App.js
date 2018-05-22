import React from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'//导入的方式跟之前有点变化
// import Bundle from './components/Bundle'

import { observable } from 'mobx';
import { Provider } from 'mobx-react';

import Loadable from 'react-loadable'

// import Tabs from './functions/Index/Tabs'
// import ArticleDetail from './functions/ArticleDetail'
// import BookDetail from './functions/BookDetail'

import './App.less'

const One = () => (
    <div>
        <h2>首页</h2>
    </div>
)

const Two = () => (
    <div>
        <h2>我是第二页</h2>
    </div>
)

const Lists = ({ match }) => (
    <div>
        <h3>{match.params.ListsId}</h3>
    </div>
)

const List = ({ match }) => (
    <div>
        <h2>我是一个列表</h2>
        <ul>
            <li>
                <Link to={`${match.url}/我是第一个哈哈`}>
                    列表下边的第一个
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/我是第二个呵呵`}>
                    列表下边的第二个
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/我是第三个嘿嘿`}>
                    列表下边的第三个
                </Link>
            </li>
        </ul>
        <Route path={`${match.url}/:ListsId`} component={Lists}/>
        <Route exact path={match.url} render={() => (
            <h3>点击上边的列表项此处显示与url地址一样的...</h3>
        )}/>
    </div>
)

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const LoadableTabs= Loadable({
  loader: () => import('./functions/Index/Tabs'),
	loading: Loading,
	delay: 300
});

const LoadableArticleDetail= Loadable({
  loader: () => import('./functions/ArticleDetail'),
	loading: Loading,
	delay: 300
});

const LoadableBookDetail= Loadable({
  loader: () => import('./functions/BookDetail'),
	loading: Loading,
	delay: 300
});

// const Tabs = (props) => (
// 	<Bundle load={ () => import('./functions/Index/Tabs')}>
// 		{ (Tabs) => <Tabs {...props} /> }
// 	</Bundle>
// )

// const ArticleDetail = (props) => (
// 	<Bundle load={ () => import('./functions/ArticleDetail')}>
// 		{ (ArticleDetail) => <ArticleDetail {...props} /> }
// 	</Bundle>
// )

// const BookDetail = (props) => (
// 	<Bundle load={ () => import('./functions/BookDetail')}>
// 		{ (BookDetail) => <BookDetail {...props} /> }
// 	</Bundle>
// )

// const RouterList = () => (
//     <Router>
//         <div>
//             <Switch>
//               <Route exact path="/" component={Tabs}/>
//               <Route exact path="/post/:id" component={ArticleDetail}/>
// 							<Route exact path="/book/:id" component={BookDetail}/>
//               <Route exact path="/Lists" component={List}/>
//             </Switch>
//         </div>
//     </Router>
// )

// 运用react-loading 进行划分
const RouterList = () => (
	<Router>
			<div>
					<Switch>
						<Route exact path="/" component={LoadableTabs}/>
						<Route exact path="/post/:id" component={LoadableArticleDetail}/>
						<Route exact path="/book/:id" component={LoadableBookDetail}/>
						<Route exact path="/Lists" component={List}/>
					</Switch>
			</div>
	</Router>
)

const testObj = observable({
	a: '2',
	b: '3'
})

class GEEK extends React.Component {
	constructor(props){
		super(props)
		this.state={}
	}
	componentDidMount() {

	}
	render(){
		return(
			<div>这是一个极客教程组件</div>
		)
	}
}

console.log(<GEEK><div>这是GEEK组件</div></GEEK>)

const App = () => (
    <Provider testObj={testObj}>
        <RouterList />
    </Provider>
)

export default App
