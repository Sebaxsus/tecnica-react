import { useEffect, useState } from "react"
import { data, useParams } from "react-router-dom"

import { getPostById, getPostComments, putPost } from "../../services/JsonPlace"
import Modal from "../../components/Modal"

import userIcon from '../../assets/user.svg'
import enterIcon from '../../assets/enter.svg'
import editIcon from '../../assets/edit.svg'
import '../../styles/Post.css'

export default function Post() {
    const [publi, setPubli] = useState(null)
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingC, setLoadingC] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [recentUpdates, setRecentUpdates] = useState(null)
    const [formTitle, setFormTitle] = useState('')
    const [formBody, setFormBody] = useState('')
    const params = useParams()

    useEffect(() => {
        getPostById(params.id).then(data => { setPubli(data); setLoading(false) })
        getPostComments(params.id).then(data => {setComments(data); setLoadingC(false)})
        document.getElementById('searchBox').value = ""
    }, [params.id])

    const handleClick = () => {
        setFormTitle(publi.title)
        setFormBody(publi.body)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const title = document.getElementById('modalTitle').value
        // const body = document.getElementById('modalBody').value

        const actPost = {
            id: publi.id,
            title: formTitle,
            body: formBody,
            userId: publi.userId
        }

        try{
            const res = await putPost({data: JSON.stringify(actPost),id: params.id})
            if (res.status === 200) {
                // console.log("Se guardo correctamente: ", res.data)
                const dataStorage = window.localStorage.getItem('postPut')
                // console.log('Datastore ', dataStorage , actPost)
                if (dataStorage) {
                    const data = JSON.parse(dataStorage)
                    // console.log(data.length)
                    let newData = []
                    if (data.length > 1) {
                        newData = [actPost, ...data]
                    } else {
                        newData = [actPost, data]
                    }
                    // console.log(data, actPost , [data, actPost])
                    
                    // const data = JSON.parse(dataStorage)
                    // dataStorage = [data, newData]
                    // console.log('Before save; ', newData)
                    window.localStorage.setItem('postPut', JSON.stringify(newData))
                } else {
                    // console.log('Entor a save solo')
                    const data = JSON.stringify(actPost)
                    window.localStorage.setItem('postPut', [data])
                }
                
                // console.log('Se guardo en LocalStorage: ', window.localStorage.getItem('postPut'), JSON.parse(window.localStorage.getItem('postPut')))
            } else {
                console.error('Error de Peticion, Codigo: ', res.status)
            }
        } catch (err) {
            console.error("Error al actualizar el post:", err);
        }
    }

    if (loading) {
        return (
            <>
                <p>Cargando...</p>
            </>
        )
    }

    function RenderComments() {
        if (loadingC) {
            return (
                <>
                    <p>Cargando...</p>
                </>
            )
        } else {
            return (
                comments.map((comment, index) => {
                    return(
                        <>
                            <main className="flex flex-row gap-1 border-b">
                                <section className="flex">
                                    <img src={userIcon} alt="Icono de usuario"  className="aspect-square h-10"/>
                                    <p className="text-start text-pretty px-2 text-sm w-[25ch]">{comment.email}</p>
                                </section>
                                <section className="flex flex-col">
                                    <h3 className="text-center text-lg font-bold">{comment.name}</h3>
                                    <p className="text-sm w-[50ch] text-gray-300/80">{comment.body}</p>
                                </section>
                            </main>
                            
                        </>
                    )
                })
            ) 
        }

    }

    return (
        <>
            <article className="grid grid-cols-1 gap-2 mx-[10px] my-[15px] justify-items-center over">
                <aside>
                    {}
                </aside>
                <section className="flex flex-col text-pretty gap-y-10 items-center px-1 py-4">
                    <main className="flex flex-col border border-white rounded-md px-1 py-4 h-[200px] w-full items-center gap-y-5">
                        <h1 className="text-md text-center w-[50ch]">{publi.title}</h1>
                        <p className="text-sm opacity-65 w-[50ch] indent-5 text-pretty">{publi.body}</p>
                        <a className="flex items-center gap-x-5" onClick={() => {setIsModalOpen(true);handleClick()}}>
                            Editar
                            <img src={editIcon} alt="icono de Editar" className="aspect-square h-5"/>
                        </a>
                        
                    </main>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <h2 className="font-bold underline underline-offset-2 decoration-[#2f3acc]">Editar Post</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col w-full h-full justify-center backdrop-blur-sm">
                            <label className="flex gap-2">
                                <h2>Titulo: </h2>
                                <input
                                    type="text"
                                    placeholder="Nuevo título"
                                    required
                                    id="modalTitle"
                                    value={formTitle}
                                    onChange={(e) => {setFormTitle(e.target.value)}}
                                    className=" focus-visible:outline-0 border-b  w-full"
                                />
                            </label>
                            <br />
                            <label className="flex flex-col gap-y-4 h-[-webkit-fill-available]">
                                <h2>Contenido: </h2>
                                <textarea
                                    placeholder="Nuevo contenido"
                                    required
                                    id="modalBody"
                                    value={formBody}
                                    onChange={(e) => {setFormBody(e.target.value)}}
                                    className="h-full border border-gray-300/90 rounded-2xl p-2"
                                />
                            </label>
                            <br />
                            <button type="submit" onClick={() => {setIsModalOpen(false)}}>Actualizar</button>
                        </form>
                    </Modal>
                    <div className="flex flex-col gap-y-5 h-[300px] w-auto overflow-y-scroll px-2" id="commetsContainer">
                        <div id="commentBox" className="flex gap-x-2 sticky top-0 backdrop-blur-md rounded-sm">
                            <img src={userIcon} alt="Icono de Entrar" className="aspect-square h-10"/>
                            <label className="flex border border-gray-200 rounded-2xl w-[80%]">
                                <input type="text" placeholder="Comenta!" className="w-[90%] focus-visible:outline-0"/>
                                <img src={enterIcon} alt="Icono de Entrar" className="aspect-square h-10"/>
                            </label>
                        </div>
                        <RenderComments />
                    </div>
                </section>
            </article>
        </>
    )
}