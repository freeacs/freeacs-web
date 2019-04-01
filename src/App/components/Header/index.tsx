import { useCallback, useEffect, useState } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
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
import ApiCall from '../../shared/http/ApiCall';

function Header(props: RouteComponentProps) {
  const [
    { selectedUnitType, unitTypes, selectedProfile, profiles }
  ] = useGlobalState('context');

  const [menuCollapsed, setMenuCollapsed] = useState(true);

  useEffect(() => {
    dispatch(ContextActions.setError(undefined));
    ApiCall('GET', '/rest/unittype').then(
      result => dispatch(ContextActions.setUnitTypes(result)),
      () => dispatch(ContextActions.setError('Failed to load unit types'))
    );
  }, []);

  useEffect(() => {
    dispatch(ContextActions.setError(undefined));
    if (!selectedUnitType) {
      return;
    }
    ApiCall('GET', '/rest/profile/byUnitTypeId/' + selectedUnitType.id).then(
      result => dispatch(ContextActions.setProfiles(result)),
      () => dispatch(ContextActions.setError('Failed to load profiles'))
    );
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
              UnitType {selectedUnitType && '(' + selectedUnitType.name + ')'}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Input
                  type="select"
                  value={selectedUnitType && selectedUnitType.id.toString()}
                  onChange={e => {
                    const unitTypeToSelect = unitTypes.find(
                      ut => ut.id === Number.parseInt(e.target.value, 10)
                    );
                    if (unitTypeToSelect) {
                      return dispatch(
                        ContextActions.setSelectedUnitType(unitTypeToSelect)
                      );
                    }
                  }}
                >
                  <option>Select unittype</option>
                  {unitTypes.map(unitType => {
                    return (
                      <option key={unitType.id} value={unitType.id}>
                        {unitType.name}
                      </option>
                    );
                  })}
                </Input>
              </DropdownItem>
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
          {selectedUnitType && (
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
                  <Input
                    type="select"
                    value={selectedProfile && selectedProfile.id.toString()}
                    onChange={e => {
                      const profileToSelect = profiles.find(
                        ut => ut.id === Number.parseInt(e.target.value, 10)
                      );
                      if (profileToSelect) {
                        return dispatch(
                          ContextActions.setSelectedProfile(profileToSelect)
                        );
                      }
                    }}
                  >
                    <option>Select profile</option>
                    {profiles.map(profile => {
                      return (
                        <option key={profile.id} value={profile.id}>
                          {profile.name}
                        </option>
                      );
                    })}
                  </Input>
                </DropdownItem>
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
                      Create new profile
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
