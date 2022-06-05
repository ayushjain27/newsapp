// import React, { Component } from 'react'
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem.js';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  // const handlePrevClick = async () => {
  //   console.log("Previous");
  //   setPage(page - 1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   console.log("Next");
  //   setPage(page + 1)
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  console.log("render");
  return (
    <>
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading && this.state.articles.map((element) => { */}
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News

// export class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
//   }
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   }

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
//   // articles = [
//   //   {
//   //     "source": {
//   //       "id": "news24",
//   //       "name": "News24"
//   //     },
//   //     "author": "Sibusiso Mjikeliso",
//   //     "title": "Ex-Proteas opener Hudson recalls Warne sledging battles: 'The nicest guy off the field'",
//   //     "description": "Andrew Hudson paid tribute to the \"huge competitor\", Shane Warne, who died of natural causes in Thailand last Friday, aged 52. Hudson has a unique history with late great Aussie cricketer, who infamously sledged him in Johannesburg in 1994.",
//   //     "url": "https://www.news24.com/sport/Cricket/Proteas/ex-proteas-opener-hudson-recalls-warne-sledging-battles-the-nicest-guy-off-the-field-20220307",
//   //     "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/3269/8a204c7ab4984938959e30730514b730.jpg",
//   //     "publishedAt": "2022-03-07T17:44:54+00:00",
//   //     "content": "<ul><li>Andrew Hudson has a unique history with late great Aussie cricketer Shane Warne, who infamously sledged him in Johannesburg in 1994.</li><li>Warne delivered one of his most vicious \"send-offs… [+3768 chars]"
//   //   },
//   //   {
//   //     "source": {
//   //       "id": "google-news-au",
//   //       "name": "Google News (Australia)"
//   //     },
//   //     "author": "Guardian staff reporter",
//   //     "title": "Shane Warne death: friend describes final meal of Vegemite toast at Thailand resort",
//   //     "description": "‘Geez, you can’t beat Vegemite … always great wherever you are’. Australian cricket great died from heart attack in Koh Samui",
//   //     "url": "https://amp.theguardian.com/sport/2022/mar/07/shane-warne-death-friend-describes-final-meal-of-vegemite-toast-at-thailand-resort",
//   //     "urlToImage": "https://i.guim.co.uk/img/media/7ae1d83201f7403abdf53aab4686a36628ed2634/0_126_6048_3630/master/6048.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=b636bc3f7af4a747540acf88d1e8d7fc",
//   //     "publishedAt": "2022-03-07T10:24:00+00:00",
//   //     "content": "Shane Warnes last meal was a plate of Vegemite and toast shared with a friend at the Thailand resort where he died hours later. The poignant detail was revealed by The Sporting News CEO Tom Hall, who… [+2683 chars]"
//   //   },
//   //   {
//   //     "source": {
//   //       "id": "bbc-news",
//   //       "name": "BBC News"
//   //     },
//   //     "author": "BBC News",
//   //     "title": "Shane Warne: Australian cricket legend died from natural causes - police",
//   //     "description": "Thai police say there's no sign of foul play in the cricketer's death while on holiday on Koh Samui.",
//   //     "url": "http://www.bbc.co.uk/news/world-asia-60645939",
//   //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/108B7/production/_123576776_mediaitem123576775.jpg",
//   //     "publishedAt": "2022-03-07T09:37:20.6555823Z",
//   //     "content": "Image caption, Warne had been on holiday on Koh Samui when he died of a suspected heart attack\r\nAustralian cricket legend Shane Warne's death in Thailand was from natural causes, police have confirme… [+449 chars]"
//   //   },
//   //   {
//   //     "source": {
//   //       "id": "abc-news-au",
//   //       "name": "ABC News (AU)"
//   //     },
//   //     "author": "ABC News",
//   //     "title": "Shane Warne's family releases heartfelt tributes to 'the best father and mate'",
//   //     "description": "The parents of cricket great Shane Warne say his sudden death in Thailand is a \"never-ending nightmare\" and \"a tragedy we will never come to terms with\".",
//   //     "url": "http://www.abc.net.au/news/2022-03-07/shane-warne-family-releases-heartfelt-tributes/100889868",
//   //     "urlToImage": "https://live-production.wcms.abc-cdn.net.au/51985721f2227fb6c95ede1521f02f83?impolicy=wcms_crop_resize&cropH=840&cropW=1492&xPos=8&yPos=42&width=862&height=485",
//   //     "publishedAt": "2022-03-07T07:46:47Z",
//   //     "content": "The parents of cricket great Shane Warne say his sudden death in Thailand is a \"never-ending nightmare\" and \"a tragedy we will never come to terms with\". \r\nKeith and Brigitte Warne, along with other … [+929 chars]"
//   //   },
//   //   {
//   //     "source": {
//   //       "id": "espn-cric-info",
//   //       "name": "ESPN Cric Info"
//   //     },
//   //     "author": null,
//   //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//   //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//   //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//   //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//   //     "publishedAt": "2020-04-27T11:41:47Z",
//   //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
//   //   },
//   //   {
//   //     "source": {
//   //       "id": "espn-cric-info",
//   //       "name": "ESPN Cric Info"
//   //     },
//   //     "author": null,
//   //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//   //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//   //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//   //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//   //     "publishedAt": "2020-03-30T15:26:05Z",
//   //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
//   //   }
//   // ]

//   constructor(props) {
//     super(props);
//     console.log("Hello I am a constructor from News component");
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0
//     }
//     document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
//   }

//   async updateNews() {
//     this.props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     this.props.setProgress(30);
//     let parsedData = await data.json();
//     this.props.setProgress(70);
//     console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     })
//     this.props.setProgress(100);
//   }

//   async componentDidMount() {
//     console.log("cdm");
//     this.updateNews();
//     // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=95530925327a412c9937fb515e752b90&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     // this.setState({ loading: true });
//     // let data = await fetch(url);
//     // let parsedData = await data.json();
//     // console.log(parsedData);
//     // this.setState({
//     //   articles: parsedData.articles,
//     //   totalResults: parsedData.totalResults,
//     //   loading: false
//     // })
//   }

//   handlePrevClick = async () => {
//     console.log("Previous");

//     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=95530925327a412c9937fb515e752b90&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//     // this.setState({loading: true});
//     // let data = await fetch(url);
//     // let parsedData = await data.json();
//     // console.log(parsedData);

//     // this.setState({
//     //   page: this.state.page - 1,
//     //   articles: parsedData.articles,
//     //   loading: false
//     // })

//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
//   }

//   handleNextClick = async () => {
//     console.log("Next");
//     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=95530925327a412c9937fb515e752b90&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//     //   this.setState({loading: true});
//     //   let data = await fetch(url);
//     //   let parsedData = await data.json();
//     //   // console.log(parsedData);

//     //   this.setState({
//     //     page: this.state.page + 1,
//     //     articles: parsedData.articles,
//     //     loading: false
//     //   })
//     // }

//     this.setState({ page: this.state.page + 1 })
//     this.updateNews();
//   }

//   fetchMoreData = async () => {
//     this.setState({ page: this.state.page + 1 })
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     // this.setState({ loading: true });
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//       loading: false,
//     })

//   };

//   render() {
//     console.log("render");
//     return (
//       <div className="container my-3">
//         <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
//         {this.state.loading && <Spinner />}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row">
//               {/* {!this.state.loading && this.state.articles.map((element) => { */}
//               {this.state.articles.map((element) => {
//                 return <div className="col-md-4" key={element.url}>
//                   <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                 </div>
//               })}
//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">
//           <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
//           <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//         </div> */}
//       </div>
//     )
//   }
// }

// export default News