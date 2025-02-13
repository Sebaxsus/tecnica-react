import { useEffect, useState } from "react"
import { getPost, postPost } from "../../services/JsonPlace"
import Modal from "../../components/Modal.jsx"
import { useNavigate } from "react-router-dom"
import userIcon from '../../assets/user.svg'
import Arrow from '../../components/icons/Arrow.jsx'

export default function Post() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formTitle, setFormTitle] = useState('')
    const [formBody, setFormBody] = useState('')
    const [publi, setPubli] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [searchText, setSearchText] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getPost('').then(data => {setPubli(data);setLoading(false)})
        document.getElementById('searchBox').classList.replace('invisible', 'visible')
    }, [])

    if (loading) {
        return (
            <>
                <p className="text-center text-4xl text-green-400 self-center">Cargando...</p>
            </>
        )
    }

    const validateFormTitle = () => {
        const title = document.getElementById('modalTitle')
        if (formTitle.length === 0) {
            title.placeholder = 'Debe Llenar este Campo!'
            title.className = "text-red-300 font-bold scale:105 border rounded-md border-red-400"
        } else {
            title.className = "focus-visible:outline-0 border-b border-amber-500 w-full"
        }
    }

    const handelAddClick = () => {
        console.log(isModalOpen)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {
            title: formTitle,
            body: formBody,
            userId: 1
        }
            console.log(newPost)
        try{
            const res = await postPost(JSON.stringify(newPost))
            if (res.status === 201) {
                const dataStorage = window.localStorage.getItem('postPost')
                if (dataStorage) {
                    const data = JSON.parse(dataStorage)
                    let newData = []
                    if (data.length > 1) {
                        newData = [newPost, ...data]
                    } else {
                        newData = [newPost, data]
                    }
                    window.localStorage.setItem('postPost', JSON.stringify(newData))
                    setPubli([...publi, newPost])
                } else {
                    setPubli([...publi, newPost])
                    const data = JSON.stringify(newPost)
                    window.localStorage.setItem('postPost', [data])
                    window.alert('Se creo el Post')
                }
            } else {
                console.error("Error al Crear un Post, Code: ", res.status)
            }
        } catch (err) {
            console.error("Error al crear el Post: ", err)
        }

    }

    function filtrar() {
        const value = document.getElementById('searchBar').value
        // setSearchText(value)
        // console.log(value, ' State: ', searchText)
        setLoading(false)
        getPost(value).then(data => {setPubli(data);setLoading(false)})        
    }

    const handlePostClick = (id) => {
        navigate(`/posts/${id}`)
    }

    document.getElementById('searchBar').onkeyup = filtrar

    return (
        <>
            <article className=" grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-2 mx-[10px] my-[15px] justify-items-center max-sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                <a id="Boton Agregar" onClick={() => {setIsModalOpen(true)}} className="fixed top-20 right-1 border rounded-full hover:bg-gray-400/50 px-2 py-2 backdrop-blur-lg">
                    ➕
                </a>
                <Modal isOpen={isModalOpen} onClose={() =>  setIsModalOpen(false)}>
                    <h2 className="font-bold underline underline-offset-2 decoration-[#2f3acc]">Añadir un Post!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full justify-center backdrop-blur-sm">
                        <label className="flex gap-x-4">
                            <h2>Titulo</h2>
                            <input 
                                type="text"
                                placeholder="Nuevo Titulo"
                                required
                                id="modalTitle"
                                value={formTitle}
                                onChange={(e) => {setFormTitle(e.target.value);validateFormTitle()}}
                                className="focus-visible:outline-0 border-b border-amber-500 w-full"
                             />
                        </label>
                        <br />
                        <label className="flex flex-col gap-y-4">
                            <h2>Contenido: </h2>
                            <textarea 
                                placeholder="Nuevo Contenido"
                                required
                                id="modalBody"
                                value={formBody}
                                onChange={(e) => {setFormBody(e.target.value)}}
                                className="focus-visible:outline-0 h-full border border-gray-300/90 rounded-2xl p-2"
                            />
                        </label>
                        <br />
                        <button type="submit">Crear Post</button>
                    </form>
                </Modal>
                {publi.map((post, ind) => {
                    return (
                        <>
                            <section key={ind} className="flex flex-col text-pretty gap-5 border border-white rounded-md items-center px-5 py-4 mx-auto w-max hover:scale-105 duration-500 transition overflow-hidden">
                                <div className="flex gap-2">
                                    <img src={userIcon} alt="Icono de usuario"  className="aspect-square w-[50px]"/>
                                    <h1 className="text-md text-center font-bold w-[25ch] md:w-[20ch] max-sm:w-[20ch] max-sm:text-sm">{post.title}</h1>
                                </div>
                                <p className="text-sm font-normal text-pretty text-start indent-5 w-[40ch] md:w-[35ch] max-sm:w-[30ch] max-sm:text-xs">{post.body}</p>
                                <a onClick={() => handlePostClick(post.id)} className="underline-offset-4 hover:underline decoration-1 text-[#23dbad] flex justify-center items-center gap-1 md:text-base hover:text-[#23dbad]/50 cursor-pointer">Ver Comentarios <Arrow class="w-6 rotate-180"/></a>
                            </section>
                        </>
                    )
                })}
            </article>
        </>
    )
}