import React,{ Component } from 'react'
import { Flex,WhiteSpace } from 'antd-mobile'
import { Link } from 'react-router-dom'
import SingleCard from '../SingleCard'
import CustomIcon from '../../CustomIcon/CustomIcon'
import './index.less'

const prefixClass = 'categorySingle'

export default class CategorySingle extends Component{
  constructor(props) {
    super(props);
  }
  handleClick(cat, p) {
    this.context.router.push(`/containerlist?t=postlist&cat=${cat}&p=${p}`)
  }
  render(){
    const { books } =this.props
    return(
      <div className={`${prefixClass}`}>
				<WhiteSpace size='md' />
        <div className={`${prefixClass}-title`}>
          <h2>
            {this.props.name}
            { books.length==6 ?
              <Link className={`${prefixClass}-link`} to={`/containerlist?t=booklist&cat=${this.props.name}&p=0`}><CustomIcon type={require('../../../svg/arrow_right.svg')} size='md' /></Link> : ''
            }
          </h2>
        </div>
        <Flex>
          {books.map((item,index)=> {
						if(index<3){
							return(
								<Flex.Item key={index}>
									<SingleCard book={item} />
								</Flex.Item>
							)
						}
					}
          )}
        </Flex>
      </div>
    )
  }
}
