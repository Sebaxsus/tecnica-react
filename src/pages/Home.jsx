import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        document.getElementById('searchBox').classList.replace('visible', 'invisible')
        document.getElementById('searchBox').value = ""
    }, [])

    const updatesData = JSON.parse(window.localStorage.getItem('postPut'))

    return (
        <>
            <h1>Home</h1>
            {updatesData.map((val, ind) => {
                return (
                    <>
                        <div className="flex flex-col gap-y-10 border px-2 py-4 border-amber-50 rounded-2xl">
                            <h1>{val.title}</h1>
                            <p>{val.body}</p>
                        </div>
                    </>
                    
                )
            })}
        </>
        
    )
}