import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import PokemonType from '../pages/Pokemon/PokemonType.jsx'
import PokemonAbilities from '../pages/Pokemon/PokemonAbilities.jsx'
import Post from '../pages/JsonPlaceHolder/Post.jsx'
import Posts from '../pages/JsonPlaceHolder/Posts.jsx'


const Rutas = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/type' element={<PokemonType />}/>
            <Route path='/ability' element={<PokemonAbilities />}/>
            <Route path='/posts' element={<Posts />}></Route>
            <Route path='/posts/:id' element={<Post/>} />
        </Routes>
    )
}

export default Rutas