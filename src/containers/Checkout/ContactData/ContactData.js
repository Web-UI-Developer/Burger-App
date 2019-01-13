import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address : {
      street : '',
      postalCode : ''
    },
    loading : false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState ({loading : true});
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        axios.post('/orders.json', orders)
            .then(response => {
                this.setState({ loading: false});
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false});
            });
  }
  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="Name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street Address" />
        <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
    </form>
    );
    if (this.state.loading){
      form=<Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4> Enter Contact Details </h4>
        {form}
      </div>
    )
  }
}


export default ContactData;