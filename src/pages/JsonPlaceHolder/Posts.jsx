import { useEffect, useState } from "react"
import { getPost } from "../../services/JsonPlace"
import { useNavigate } from "react-router-dom"
import userIcon from '../../assets/user.svg'
import Arrow from '../../components/icons/Arrow.jsx'

export default function Post() {
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

    function filtrar() {
        const value = document.getElementById('searchBar').value
        // setSearchText(value)
        // console.log(value, ' State: ', searchText)
        setLoading(false)
        getPost(value).then(data => {setPubli(data);setLoading(false)})        
    }

    const handleClick = (id) => {
        navigate(`/posts/${id}`)
    }

    document.getElementById('searchBar').onkeyup = filtrar

    return (
        <>
            <article className="grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-2 mx-[10px] my-[15px] justify-items-center max-sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                {publi.map((post, ind) => {
                    return (
                        <>
                            <section key={ind} className="flex flex-col text-pretty gap-5 border border-white rounded-md items-center px-5 py-4 mx-auto w-max hover:scale-105 duration-500 transition overflow-hidden">
                                <div className="flex gap-2">
                                    <img src={userIcon} alt="Icono de usuario"  className="aspect-square w-[50px]"/>
                                    <h1 className="text-md text-center font-bold w-[25ch] md:w-[20ch] max-sm:w-[20ch] max-sm:text-sm">{post.title}</h1>
                                </div>
                                <p className="text-sm font-normal text-pretty text-start indent-5 w-[40ch] md:w-[35ch] max-sm:w-[30ch] max-sm:text-xs">{post.body}</p>
                                <a onClick={() => handleClick(post.id)} className="underline-offset-4 hover:underline decoration-1 text-[#23dbad] flex justify-center items-center gap-1 md:text-base hover:text-[#23dbad]/50 cursor-pointer">Ver Comentarios <Arrow class="w-6 rotate-180"/></a>
                            </section>
                        </>
                    )
                })}
            </article>
        </>
    )
}