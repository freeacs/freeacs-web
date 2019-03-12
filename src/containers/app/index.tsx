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
import {Link, Redirect, Route, Switch} from "react-router-dom";
import About from "../about";
import Search from "../search";

type State = {
    menuCollapsed: boolean
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            menuCollapsed: true
        };
    }

    toggleNavbar = () => {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed
        });
    };

    render() {
        return (
            <>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggleNavbar} />
                    <NavbarBrand href="/">FREEACS</NavbarBrand>
                    <Collapse isOpen={!this.state.menuCollapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/search">Search</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/about-us">About</NavLink>
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
            </>
        )
    }
}

export default App
