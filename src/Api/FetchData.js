export const fetchData = (url,requestOptions,setIsError) =>{
    return fetch(url,requestOptions)
           .then(response => {
            if(response.ok){
                if(response.status===204){
                    return "No Content";
                }else{
                    return response.json();
                }
            }
            else{
                throw Error("Could not Fetch data");
            }
            })
            .catch(err=>{
                console.log(err);
                setIsError(err.message);
            })
}