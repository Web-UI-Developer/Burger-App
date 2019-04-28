import React, {Component} from 'react';

const asyncComp = (importComponent) => {
  return class extends Component {
    
    state = {
      component : null
    }
  
    componentDidMount() {
      importComponent()
        .then(comp => {
          this.setState({component : comp.default})
        });
      }
        render () {
          const Lazyload = this.state.component;
          return Lazyload ? <Lazyload {...this.props}/> : null
      } 
  } 
}

export default asyncComp;