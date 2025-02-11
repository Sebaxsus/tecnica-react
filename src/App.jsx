import { Route, Router } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import PokemonType from './pages/PokemonType.jsx'
import PokemonAbilities from './pages/PokemonAbilities.jsx'


function App() {

  return (
    <>
      <Router>
        <Route path='/' element={<Home />} />
        <Route path='/type' element={<PokemonType />}/>
        <Route path='/abilitie' element={<PokemonAbilities />}/>
      </Router>
    </>
  )
}

export default App
