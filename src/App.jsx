import './App.css'
import Rutas from './routes/Rutas.jsx'
import Nav from './components/Nav.jsx'


// const data = await getAbility("overgrow").then((res) => res.data).catch((err) => console.error("Fallo",err))
function App() {


  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000a_40%,#63e_100%)]">
      </div>
      <Nav></Nav>
      <main className=''>
        <Rutas />
      </main>
    </>
  )
}

export default App
