export default async function getmovies () {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/movies`)
    const result =  await res.json()
    return result ;
}