import { Outlet, Link } from 'react-router-dom'
import '../styles/layout.css'

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link className="nav-el" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-el" to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="nav-el" to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;