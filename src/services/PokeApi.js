import axios from "axios";


const BASE_URL = "https://pokeapi.co/api/v2/"

export const getAbility = async (abilityName) => {
    // return axios.get(`${BASE_URL}/ability/${abilityName}`)
    try {
        const res = await axios.get(`${BASE_URL}/ability/${abilityName}`)
        return res.data
    } catch (err) {
        console.error("Error al obtener la abilidad: ", err)
        throw err
    }
}

export const getType = async (typeName) => {
    try {
        const res = await axios.get(`${BASE_URL}/type/${typeName}`)
        return res.data
    } catch (err) {
        console.error("Error al obtener el Typo: ", err)
        throw err
    }
}

export const getImage = async (name) => {
    try {
        const res = await axios.get(`${BASE_URL}/pokemon/${name}`)
        return res.data
    } catch (err) {
        console.error("Error al obtener la Imagen>: ", err)
        throw err
    }
    
}
