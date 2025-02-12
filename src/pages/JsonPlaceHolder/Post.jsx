import { useEffect, useState } from "react"
import { getPostById } from "../../services/JsonPlace"
import { useParams } from "react-router-dom"

export default function Post() {
    const [publi, setPubli] = useState(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        getPostById(params.id).then(data => { setPubli(data); setLoading(false) })
    }, [params.id])

    if (loading) {
        return (
            <>
                <p>Cargando...</p>
            </>
        )
    }

    return (
        <>
            <article className="grid grid-cols-1 gap-2 mx-[10px] my-[15px] justify-items-center">
                <>
                    <section className="flex flex-col text-pretty gap-1 border border-white rounded-md items-center px-1 py-4 w-[50ch]">
                        <aside>
                            <h1 className="text-md">{publi.title}</h1>
                            <p className="text-sm opacity-65">{publi.body}</p>
                        </aside>
                    </section>
                </>
            </article>
        </>
    )
}