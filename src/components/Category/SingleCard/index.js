import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import CustomIcon from '../../CustomIcon/CustomIcon'
import './index.less'

export default class SingleCard extends Component{
  render(){
    const { book } = this.props
    return(
      <div>
         <div className="mask"></div>
         { book.bookUrl ? <a href={book.bookUrl} style={{color:'#77787E'}} target="_blank"><img src={book.img} /></a>
           :
           <Link to={`/book/${book._id}`} style={{color:'#77787E'}}><img src={book.img} /></Link>
         }
         <p>
           { book.bookUrl ? <a href={book.bookUrl} style={{color:'#77787E'}} target="_blank" rel="external nofollow">{book.title}</a>
             :
             <Link to={`/book/${book._id}`} style={{color:'#77787E'}}>{book.title}</Link>
           }
         </p>
         <div>
            <div>
              test
            </div>
            <div>{book.tag}</div>
         </div>
      </div>
    )
  }
}
