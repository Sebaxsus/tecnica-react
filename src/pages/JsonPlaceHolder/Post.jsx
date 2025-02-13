import { useEffect, useState } from "react"
import { getPostById, getPostComments } from "../../services/JsonPlace"
import { useParams } from "react-router-dom"
import userIcon from '../../assets/user.svg'
import enterIcon from '../../assets/enter.svg'
import '../../styles/Post.css'

export default function Post() {
    const [publi, setPubli] = useState(null)
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingC, setLoadingC] = useState(true)
    const params = useParams()

    useEffect(() => {
        getPostById(params.id).then(data => { setPubli(data); setLoading(false) })
        getPostComments(params.id).then(data => {setComments(data); setLoadingC(false)})
    }, [params.id])

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

                </aside>
                <section className="flex flex-col text-pretty gap-y-10 items-center px-1 py-4">
                    <main className="flex flex-col border border-white rounded-md px-1 py-4 h-[200px] w-full items-center gap-y-5">
                        <h1 className="text-md text-center w-[50ch]">{publi.title}</h1>
                        <p className="text-sm opacity-65 w-[50ch] indent-5 text-pretty">{publi.body}</p>
                    </main>
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