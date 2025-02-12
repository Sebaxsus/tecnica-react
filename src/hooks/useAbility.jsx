import { useEffect, useState } from "react"
import { getAbility } from "../services/PokeApi"

function useAbility({name}) {
    const [abilityInfo, setAbilityInfo] = useState(name)
    useEffect(() => {
        const fetchData = async () => {
        try {
            const abilityData = await getAbility(abilityInfo)
            setAbilityInfo(abilityData)
        } catch (err) {
            console.error("Error al obtener datos: ", err)
        }
        }
        fetchData()
    },[])

    return (abilityInfo)
}

export default useAbility
