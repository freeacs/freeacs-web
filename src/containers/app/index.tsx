import * as React from 'react'
import {Route, Link} from 'react-router-dom'
import Search from '../search'
import About from '../about'

const App = () => (
    <div>
        <header>
            <Link to="/search">Search</Link>
            <Link to="/about-us">About</Link>
        </header>

        <main>
            <Route path="/search" component={Search} />
            <Route path="/about-us" component={About} />
        </main>
    </div>
);

export default App