import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import ReactAux from '../../../hoc/ReactAux/ReactAux';

const sideDrawer = (props) => {
  let conditionalClass = [classes.SideDrawer, classes.Close];
  if (props.open){
    conditionalClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <ReactAux>
      <Backdrop show={props.open} clicked={props.closed}/>
        <div className={conditionalClass.join(' ')}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          
            <nav> 
              <NavigationItems />
            </nav>
        </div>
    </ReactAux>
  );
};

export default sideDrawer;
