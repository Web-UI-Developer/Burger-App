import React from 'react';
import Aux from '../../../hoc/Aux'
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map (igKey => {
      return (
        <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
        </li>
      )
    })
return (
  <Aux>
      <h3>You Order</h3>
      <p>Yummy burger ingredients</p>
      <ul>
          {ingredientSummary}
      </ul>
      <p> Continue Checkout?</p>
    </Aux>
    )
};


export default orderSummary;