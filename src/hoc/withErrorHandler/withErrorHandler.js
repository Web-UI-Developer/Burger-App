import React, {Component} from 'react';
import Model from '../../components/UI/Modal/Modal';
import ReactAux from '../ReactAux/ReactAux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount(){
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null})
        return req;
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }
    errorconfirmedHandler = () => {
      this.setState({error:null})
    }
    render () {
      return (
        <ReactAux>
          <Model show={this.state.error}
          modalClosed={this.errorconfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </ReactAux>
        
      );
    }   
 }
}

export default withErrorHandler;