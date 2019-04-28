import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Switch,withRouter,Redirect } from 'react-router-dom';
import lazyLoading from './hoc/lazyLoading/lazyLoadingComp';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const checkoutLazyLoading = lazyLoading (()=> {
  return import('./containers/Checkout/Checkout');
}); 

const orderLazyloading = lazyLoading (() => {
  return import('./containers/Orders/Orders');
});

const authLazyLoading = lazyLoading (() => {
  return import('./containers/Auth/Auth')
})
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render () {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" component={authLazyLoading}/>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={checkoutLazyLoading} />
          <Route path="/orders" component={orderLazyloading} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={authLazyLoading}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch (actions.authCheckStatus())
  }
} 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
