import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import CustomIcon from '../../CustomIcon/CustomIcon'
import './index.less'

const prefixclass = 'singleCard'
export default class SingleCard extends Component{
  render(){
    const { book } = this.props
    return(
      <div className={`${prefixclass}`}>
         <div className="mask"></div>
         { book.bookUrl ? <a href={book.bookUrl} style={{color:'#77787E'}} target="_blank"><img src={book.img} className={`${prefixclass}-img`}/></a>
           :
           <Link to={`/book/${book._id}`} style={{color:'#77787E'}}><img src={book.img} className={`${prefixclass}-img`}/></Link>
         }
         { book.bookUrl ? <a className={`${prefixclass}-p`} href={book.bookUrl} style={{color:'#77787E'}} target="_blank" rel="external nofollow">{book.title}</a>
					 :
					 <Link className={`${prefixclass}-p`} to={`/book/${book._id}`} style={{color:'#77787E'}}>{book.title}</Link>
				 }
         <div className={`${prefixclass}-labels`}>
            <div className={`${prefixclass}-icon`}>
							<CustomIcon type={require('../../../svg/tag.svg')} size='xxs' />
            </div>
            <div className={`${prefixclass}-s`}>{book.tag}</div>
         </div>
      </div>
    )
  }
}
