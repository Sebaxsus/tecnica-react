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
            
        </>
        
    )
}