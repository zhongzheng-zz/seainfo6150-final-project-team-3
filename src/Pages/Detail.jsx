import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";
import styles from "./Detail.module.css";
import items from "../data/items.json";
        // <items = {Object.values(items)}>

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: getItemById(this.props.id)
    };
  }

  render() {
    if (this.state.detail === null) {
      window.location.href = '/error';
      return;
    }
    return (
      <article className = {styles.container}>
        <div className = {styles.topleft}>
        <h1 >{this.state.detail.title}</h1>
        <h2>ratings: 4.6</h2>
        </div>

        <div className = {styles.low}>
        <p className ={styles.sectionTitle}> Ingredients: </p>
        {items[0].ingredients.map((val,index) =>{
          return <li key = {index}> {val} </li>
        })}
        <p className ={styles.sectionTitle}>Directions: </p>
        {items[0].directions.map((val,index) =>{
          return <ol>{index+1} : {val} </ol>
        })}
        </div>
      </article>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};