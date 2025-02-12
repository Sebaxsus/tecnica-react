import { useEffect, useState } from "react"
import { getPost } from "../../services/JsonPlace"
import { useNavigate } from "react-router-dom"
import userIcon from '../../assets/user.svg'

export default function Post() {
    const [publi, setPubli] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getPost().then(data => {setPubli(data);setLoading(false)})
    }, [])

    if (loading) {
        return (
            <>
                <p className="text-center text-4xl text-green-400/15">Cargando...</p>
            </>
        )
    }

    const handleClick = (id) => {
    
        navigate(`/posts/${id}`)
    }
    return (
        <>
            <article className="grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-2 mx-[10px] my-[15px] justify-items-center">
                {publi.map((val, ind) => {
                    return (
                        <>
                            <section key={ind} className="flex flex-col text-pretty gap-1 border border-white rounded-md items-center px-5 py-4 mx-auto w-max hover:scale-105 duration-500 transition overflow-hidden" onClick={() => handleClick(val.id)}>
                                <img src={userIcon} alt="Icono de usuario"  className="aspect-square w-[50px] text-white"/>
                                <h1 className="text-md text-center w-[25ch]">{val.title}</h1>
                                <p className="text-sm opacity-65 mt-10 w-[40ch]">{val.body}</p>
                            </section>
                        </>
                    )
                })}
            </article>
        </>
    )
}