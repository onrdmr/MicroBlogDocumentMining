import React, { Component } from 'react';

import './NavMenu.css';
import NavbarOrLoadPage from './NavbarOrLoadPage';
import MyNavbar from './MyNavbar';
export class NavMenu extends Component {
  

  render() {
    return (
      <header>
        {/* <NavbarOrLoadPage> */}
          <MyNavbar></MyNavbar>
    

        {/* </NavbarOrLoadPage> */}
        
      </header>
    );
  }
}
