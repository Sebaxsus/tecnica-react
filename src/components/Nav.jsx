import { NavLink } from "react-router-dom"
import '../styles/Nav.css'


export default function Nav() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li className=""><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/posts'}>Posts</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}