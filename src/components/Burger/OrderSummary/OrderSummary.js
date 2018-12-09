import React, { Component }from 'react';
import ReactAux from '../../../hoc/ReactAux/ReactAux'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map (igKey => {
      return (
        <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
        </li>
      )
    })
    return (
      <ReactAux>
          <h3>You Order</h3>
          <p>Yummy burger ingredients</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p> Continue Checkout?</p>
          <p><strong> Total Price: {this.props.price.toFixed(2)}</strong></p>
          <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
          <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
    </ReactAux>
    );
  };
} 

export default OrderSummary;