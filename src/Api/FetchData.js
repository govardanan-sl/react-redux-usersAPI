export const fetchData = (url,requestOptions) =>{
    fetch(url,requestOptions)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
    })
    .catch(err=>{
        throw Error("Could Not Fetch Data "+err.message);
    })
}