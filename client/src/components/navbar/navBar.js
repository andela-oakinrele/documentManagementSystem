import React, { Component } from 'react';
import { Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';
import { browserHistory } from 'react-router';
import '../../main.scss';
import { logout } from '../../helpers/auth';

class navBar extends Component {
  signout() {
    logout(() => {
      browserHistory.push('/');
    });
  }

  render() {
    return (
      <Navbar brand="DMS" className="dms" right>
        <NavItem> <Input s={6} label="Search" validate><Icon>search</Icon></Input> </NavItem>
        <Dropdown
          trigger={
            <NavItem href="#!">
              <Icon>more_vert</Icon>
            </NavItem>
            }
        >
          <NavItem>Profile</NavItem>
          <NavItem onClick={this.signout}>Sign out</NavItem>
        </Dropdown>
      </Navbar>
    );
  }
}
export default navBar;