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
  NavLink
} from 'reactstrap';
import { NavLink as RRNavLink, RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';

function Header(props: RouteComponentProps) {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const onToggleNavbar = useCallback(() => setMenuCollapsed(!menuCollapsed), [
    menuCollapsed
  ]);
  const onClickNavLink = useCallback(() => setMenuCollapsed(true), [
    menuCollapsed
  ]);
  const onClickHome = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    return props.history.push('/');
  }, []);
  return (
    <Navbar color="light" light expand="md">
      <NavbarToggler onClick={onToggleNavbar} />
      <NavbarBrand onClick={onClickHome} href="/">
        FREEACS
      </NavbarBrand>
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
          <NavItem>
            <NavLink
              onClick={onClickNavLink}
              activeClassName="is-active"
              tag={RRNavLink}
              to="/unittype"
            >
              UnitType
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={onClickNavLink}
              activeClassName="is-active"
              tag={RRNavLink}
              to="/profile"
            >
              Profile
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
