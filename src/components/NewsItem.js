// import React, {Component} from 'react'
import React from 'react'

const NewsItem = (props) =>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
            <span class="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={!imageUrl ? "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2022/03/09/246450-jupiter.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small class="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem

// export class NewsItem extends Component {
//   render() {
//     let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
//     return (
//       <div className="my-3">
//         <div className="card">
//           <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
//             <span class="badge rounded-pill bg-danger">{source}</span>
//           </div>
//           <img src={!imageUrl ? "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2022/03/09/246450-jupiter.jpg" : imageUrl} className="card-img-top" alt="..." />
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text">{description}...</p>
//             <p className="card-text"><small class="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
//             <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default NewsItem
