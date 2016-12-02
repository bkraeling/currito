import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Ingredients } from '../api/ingredients.js';
import Ingredient from './Ingredient.jsx';

// App component - represents the whole app

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: "small"
    };
  }

  renderTotal() {
    var total = 0.0;
    Ingredients.find({ size: this.state.size, checked: true }).fetch().forEach((checkedIngredient) => {
      total = total + checkedIngredient.calories;
    });
    return (
      <div>
        Total number of calories so far: {total}
      </div>
    )
  }

  renderIngredients() {
    var ings = Ingredients.find({ size: this.state.size }, { sort: { createdAt: -1 } }).fetch();
    return ings.map((ing) => (
      <Ingredient key={ing._id} ingredient={ing} />
    ));
  }

  onSizeChanged(e) {
    Ingredients.find({ checked: true }).fetch().forEach((checkedIngredient) => {
      Ingredients.update({ _id: checkedIngredient._id }, {$set: {checked: false}});
    });
    this.setState({
      size: e.target.name
    });
  }

  render() {
    return (
      <div className="container">
        <header>
            {this.renderTotal()}
            <input type="radio" name="small" onChange={this.onSizeChanged.bind(this)} checked={this.state.size === "small"} />Small Burrito
            <input type="radio" name="regular" onChange={this.onSizeChanged.bind(this)} checked={this.state.size === "regular"} />Regular Burrito
            <input type="radio" name="bowl" onChange={this.onSizeChanged.bind(this)} checked={this.state.size === "bowl"} />Burrito Bowl
        </header>

        <ul>
          {this.renderIngredients()}
        </ul>
      </div>
    );
  }

}

App.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
