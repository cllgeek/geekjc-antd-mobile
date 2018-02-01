import React from "react";
import { WhiteSpace, Carousel } from "antd-mobile";

import './Index.less'

class CarouselComponet extends React.Component {
  constructor(props){
		super(props)
		this.state={
      imgHeight: 176,
      data: ['1', '2', '3'],
		}
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <div>
        <WhiteSpace size='sm' />
        <Carousel
          className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: "block",
                position: "relative",
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: "2px 1px 1px rgba(0, 0, 0, 0.2)"
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default CarouselComponet
