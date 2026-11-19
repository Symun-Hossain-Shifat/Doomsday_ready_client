export default async function Postmovies (data) {
const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/movies` , {
    method : 'POST' ,
    headers : {
        'content-type' : 'application/json'
    },
    body: JSON.stringify(data)
})
const result = await res.json();
return result;
}