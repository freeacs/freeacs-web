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
          <UncontrolledDropdown
            nav
            inNavbar
            active={props.location.pathname.startsWith('/unittype')}
          >
            <DropdownToggle nav caret>
              UnitType
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavItem>
                  <NavLink
                    onClick={onClickNavLink}
                    activeClassName={
                      props.location.pathname === '/unittype' ? 'is-active' : ''
                    }
                    active={props.location.pathname === '/unittype'}
                    tag={RRNavLink}
                    to="/unittype"
                  >
                    Overview
                  </NavLink>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                <NavItem>
                  <NavLink
                    onClick={onClickNavLink}
                    activeClassName={
                      props.location.pathname === '/unittype/create'
                        ? 'is-active'
                        : ''
                    }
                    active={props.location.pathname === '/unittype/create'}
                    tag={RRNavLink}
                    to="/unittype/create"
                  >
                    Create new unittype
                  </NavLink>
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown
            nav
            inNavbar
            active={props.location.pathname.startsWith('/profile')}
          >
            <DropdownToggle nav caret>
              Profile
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavItem>
                  <NavLink
                    onClick={onClickNavLink}
                    activeClassName={
                      props.location.pathname === '/profile' ? 'is-active' : ''
                    }
                    active={props.location.pathname === '/profile'}
                    tag={RRNavLink}
                    to="/profile"
                  >
                    Profiles
                  </NavLink>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                <NavItem>
                  <NavLink
                    onClick={onClickNavLink}
                    activeClassName={
                      props.location.pathname === '/profile/create'
                        ? 'is-active'
                        : ''
                    }
                    active={props.location.pathname === '/profile/create'}
                    tag={RRNavLink}
                    to="/profile/create"
                  >
                    Create new profile
                  </NavLink>
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
