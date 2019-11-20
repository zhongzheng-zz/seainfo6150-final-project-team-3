import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./Search.module.css";
import {search, getCategoryById} from "../Proxy/Data";


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true,
    };
  }

  componentDidMount() {
    let searchReault = search(this.props.keyword);
    let renderData = searchReault.reduce((prev,v)=>{
      let tmpAry = prev[v.categoryId];
      if (!tmpAry) {
        tmpAry = prev[v.categoryId] = [];
      }
      tmpAry.push(v);
      return prev;
    }, {});
    this.setState({loading: false, data: renderData});
  }

  handleClick = (id) => {
    window.location.href = `/detail/${id}`;
  }

  renderSearchResults = () => {
    let keys = Object.keys(this.state.data);
    let result = [];
    let index = 0;
    if (keys.length === 0) {
      result.push(<div key={index++} className={styles.noresult}>Sorry, no results for "{this.props.keyword}".</div>);
      result.push(<div tabIndex="0" key={index++} className={`${styles.back} clickable`} onClick={(e)=>{e.preventDefault();window.history.back()}}>Back</div>);
    } else {
      keys.forEach((v) => {
        result.push(<h2 className={styles.category} key={index++}>{getCategoryById(v).name}</h2>);
        let items = this.state.data[v];
        items.forEach((v) => {
          result.push(<div tabIndex="0" onClick={(e)=>{this.handleClick(v.id)}} className={styles.itemContainer} key={index++}>
              <img className={styles.image} src={v.imageURL} alt={v.shortName}></img>
              <div className={styles.text}>
                  <div>{v.title}</div>
                  {v.videoURL !== "" &&
                      <img className={styles.playSign} src="/images/video-icon.png" alt="video" key={index++}/>
                  }
              </div>
          </div>);
        });
      });
    }
    return result;
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <img src="/images/spinner.gif" alt="spinner"/>
        </div>
      );
    }
    return (
      <div className={styles.search}>
        <section className={styles.container}>
          {this.renderSearchResults()}
        </section>
      </div>
    )
  }
}

Search.propTypes = {
  keyword: PropTypes.string.isRequired
};
