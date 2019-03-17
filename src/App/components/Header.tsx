import { useCallback, useState } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import * as React from 'react';

export function Header() {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const onToggleNavbar = useCallback(() => setMenuCollapsed(!menuCollapsed), [
    menuCollapsed
  ]);
  const onClickNavLink = useCallback(() => setMenuCollapsed(true), [
    menuCollapsed
  ]);
  return (
    <Navbar color="light" light expand="md">
      <NavbarToggler onClick={onToggleNavbar} />
      <NavbarBrand href="/">FREEACS</NavbarBrand>
      <Collapse isOpen={!menuCollapsed} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
              onClick={onClickNavLink}
              activeClassName="is-active"
              tag={RRNavLink}
              to="/search"
            >
              Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={onClickNavLink}
              activeClassName="is-active"
              tag={RRNavLink}
              to="/about-us"
            >
              About
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
