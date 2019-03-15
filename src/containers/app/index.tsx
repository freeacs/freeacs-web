import * as React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../about";
import Search from "../search";
import './index.css';
import {useState} from "react";

function App() {
    const [menuCollapsed, setMenuCollapsed] = useState(true);
    return (
        <div className="container-fluid">
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={() => setMenuCollapsed(!menuCollapsed)} />
                <NavbarBrand href="/">FREEACS</NavbarBrand>
                <Collapse isOpen={!menuCollapsed} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink activeClassName='is-active' tag={RRNavLink} to="/search">Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink activeClassName='is-active' tag={RRNavLink} to="/about-us">About</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>

            <div className="container-fluid">
                <Switch>
                    <Route path="/search" component={Search} />
                    <Route path="/about-us" component={About} />
                    <Redirect from="/" to="/search"/>
                </Switch>
            </div>
        </div>
    )
}

export default App
