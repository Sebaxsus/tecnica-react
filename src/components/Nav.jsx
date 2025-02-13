import { NavLink } from "react-router-dom"
import '../styles/Nav.css'
import Lens from './icons/Lens.jsx'

// function handleScroll() {
    
//     if (window.scrollY > 20) {
//         document.getElementById('top').classList.replace('sticky', 'fixed')
//     } else {
//         document.getElementById('top').classList.replace('fixed', 'sticky')
//     }
// }

// window.onscroll = handleScroll

export default function Nav() {
    return (
        <>
            <header className="py-2 bg-[#6633ee14] sticky mx-5 mt-2 rounded-xl w-[-webkit-fill-available] backdrop-blur-md z-[1] transition duration-500 top-0" id="top">
                <nav className="flex justify-between">
                    <ul>
                        <li className=""><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/posts'}>Posts</NavLink></li>
                    </ul>
                    <label className="flex justify-between items-center border border-white rounded-4xl px-2 mr-2 max-sm:w-40 invisible" id="searchBox">
                        <input type="search" name="searchBar" id="searchBar" placeholder="Buscar..." className="w-[80%] focus-visible:outline-0" />
                        <button disabled="disabled" className="w-5"><Lens /></button>
                    </label>
                </nav>
            </header>
        </>
    )
}