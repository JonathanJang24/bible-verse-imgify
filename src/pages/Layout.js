import { Outlet, Link } from 'react-router-dom'
import '../styles/layout.css'

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        {/* Due to routing errors when deploying the app on github pages, must specify the route paths as project-name/ */}
                        <Link className="nav-el" to="/bible-verse-imgify">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-el" to="/bible-verse-imgify/about">About</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;