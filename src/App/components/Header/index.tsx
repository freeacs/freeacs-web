import { useCallback, useEffect, useState } from 'react';
import {
  Button,
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
import { useGlobalState, dispatch } from '../../state';
import { ContextActions } from '../../shared/context/state';
import { loadProfiles, loadUnitTypes } from '../../shared/context/thunks';

function Header(props: RouteComponentProps) {
  const [
    { selectedUnitType, unitTypes, selectedProfile, profiles, selectedUnit }
  ] = useGlobalState('context');

  const [menuCollapsed, setMenuCollapsed] = useState(true);

  useEffect(() => {
    loadUnitTypes(dispatch);
  }, []);

  useEffect(() => {
    if (!selectedUnitType) {
      return;
    }
    loadProfiles(selectedUnitType.id, dispatch);
  }, [selectedUnitType]);

  const onToggleNavbar = useCallback(() => setMenuCollapsed(!menuCollapsed), [
    menuCollapsed
  ]);

  const onClickNavLink = useCallback(() => setMenuCollapsed(true), [
    menuCollapsed
  ]);

  const onClickHome = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    return props.history.push('/search');
  }, []);

  return (
    <Navbar color="light" light expand="md">
      <NavbarToggler onClick={onToggleNavbar} />
      <NavbarBrand onClick={onClickHome} href="/search">
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
          <UncontrolledDropdown
            nav
            inNavbar
            active={props.location.pathname.startsWith('/unittype')}
          >
            <DropdownToggle nav caret>
              UnitType {selectedUnitType && '(' + selectedUnitType.name + ')'}
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
                    Create new
                  </NavLink>
                </NavItem>
              </DropdownItem>
              {unitTypes.map(unitType => {
                return (
                  <DropdownItem key={unitType.id}>
                    <NavItem>
                      <NavLink
                        active={
                          selectedUnitType &&
                          selectedUnitType.id === unitType.id
                        }
                        onClick={() =>
                          dispatch(ContextActions.setSelectedUnitType(unitType))
                        }
                      >
                        {unitType.name}
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
          {selectedUnitType && (
            <>
              <UncontrolledDropdown
                nav
                inNavbar
                active={props.location.pathname.startsWith('/profile')}
              >
                <DropdownToggle nav caret>
                  Profile {selectedProfile && '(' + selectedProfile.name + ')'}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        onClick={onClickNavLink}
                        activeClassName={
                          props.location.pathname === '/profile'
                            ? 'is-active'
                            : ''
                        }
                        active={props.location.pathname === '/profile'}
                        tag={RRNavLink}
                        to="/profile"
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
                          props.location.pathname === '/profile/create'
                            ? 'is-active'
                            : ''
                        }
                        active={props.location.pathname === '/profile/create'}
                        tag={RRNavLink}
                        to="/profile/create"
                      >
                        Create new
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  {profiles.map(profile => {
                    return (
                      <DropdownItem key={profile.id}>
                        <NavItem>
                          <NavLink
                            active={
                              selectedProfile &&
                              selectedProfile.id === profile.id
                            }
                            onClick={() =>
                              dispatch(
                                ContextActions.setSelectedProfile(profile)
                              )
                            }
                          >
                            {profile.name}
                          </NavLink>
                        </NavItem>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              {selectedProfile && (
                <UncontrolledDropdown
                  nav
                  inNavbar
                  active={props.location.pathname.startsWith('/unit')}
                >
                  <DropdownToggle nav caret>
                    Unit {selectedUnit && '(' + selectedUnit.unitId + ')'}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink
                          onClick={onClickNavLink}
                          activeClassName={
                            props.location.pathname === '/unit/create'
                              ? 'is-active'
                              : ''
                          }
                          active={props.location.pathname === '/unit/create'}
                          tag={RRNavLink}
                          to="/unit/create"
                        >
                          Create
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
