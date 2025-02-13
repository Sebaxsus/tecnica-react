import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        document.getElementById('searchBox').classList.replace('visible', 'invisible')
    }, [])

    return (
        <h1>Home</h1>
    )
}