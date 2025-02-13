import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com"

export const getPost = async (title) => {
    try{
        const res = await axios.get(`${BASE_URL}/posts`)
        const data = res.data.filter((post) => {
            if (post.title.toLowerCase().includes(title)) return post
        })
        return data
    } catch (err) {
        console.error("Fallo el get Post: ", err)
        throw err
    }
}

export const getPostById = async (id) => {
    try{
        const res = await axios.get(`${BASE_URL}/posts/${id}`)
        return res.data
    } catch (err) {
        console.error("Fallo el get Post by Id: ", err)
        throw err
    }
}

export const getPostComments = async (id) => {
    try{
        const res = await axios.get(`${BASE_URL}/posts/${id}/comments`)
        return res.data
    }catch (err) {
        console.error("Fallo el get Post Comments: ", err)
        throw err
    }
}

export const getAlbums = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/albums`)
        return res.data
    } catch (err) {
        console.error("Fallo el get Albums: ", err)
        throw err
    }
}

export const postPost = async (data) => {
    try{
       const res = await axios.post(`${BASE_URL}/post`, data)
       return res.status
    } catch (err) {
        console.error("Fallo el Post post: ", err)
        throw err
    }
}

export default { getPost, getPostById, getAlbums, postPost }