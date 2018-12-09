import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice:4,
        purchasable: false, 
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount () {
        axios.get('https://burger-app-acd79.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data})
            })
            .catch(error => {
                this.setState({error:true})
            })
    }

    updatePurchaseState (ingredients) { 
        const sum = Object.keys(ingredients)
            .map(igKeys => {
                return ingredients[igKeys]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        this.setState ({loading : true});
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
                customer : {
                    name: 'sampreet',
                address : { 
                    street: 'blvd street',
                    zipcode: '00000',
                    country: 'USA'
                  }
                },
                email: 
                    'sam@test.com',
                deliveryMethod: 'fastest'
        }
        axios.post('/order.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing:false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing:false });
            });
    }

        
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        
        
        let burger = this.state.error ? <p> Ingredients are not loading !!!! </p> : <Spinner />;
        if (this.state.ingredients) {
            burger = ( 
                <ReactAux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
                </ReactAux>
                );
                orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <ReactAux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </ReactAux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);