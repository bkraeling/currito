import React, { Component, PropTypes } from 'react';
import { Ingredients } from '../api/ingredients.js';

// Task component - represents a single todo item
export default class Ingredient extends Component {

  toggleChecked() {
  // Set the checked property to the opposite of its current value
    Ingredients.update(this.props.ingredient._id, {
      $set: { checked: !this.props.ingredient.checked },
    });
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.ingredient.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        <input
          type="checkbox"
          readOnly
          checked={this.props.ingredient.checked}
          onClick={this.toggleChecked.bind(this)}
        />
      <span className="text">{this.props.ingredient.name} - {this.props.ingredient.calories} cal</span>
      </li>
    );
  }
}

Ingredient.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  ingredient: PropTypes.object.isRequired,
};
