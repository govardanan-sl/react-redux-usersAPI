export const fetchData = (url,requestOptions,setIsError) =>{
    return fetch(url,requestOptions)
           .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw Error("Could not Fetch data");
            }
            })
            .catch(err=>{
                setIsError(err.message);
            })
}