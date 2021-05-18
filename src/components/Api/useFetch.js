import {useState} from 'react';
const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [requestOptions,setRequestOptions] = useState({});

    const startFetch = () => {
          let reqOps = requestOptions;
          fetch(url,reqOps)
            .then(response => {
                if(!response.ok){
                    throw Error("Could not Fetch data");
                }
                return response.json();
            })
            .then(result => {
                setData(result);
                setIsLoading(false);
                setIsError(null);
            })
            .catch((e) =>{
                if(e.name==='AbortError'){
                    console.log("Fetch Aborted");
                }else{
                    console.log(e.message);
                    setIsError(e.message);
                }
            });
    }

    return { data , isLoading, isError,startFetch,setRequestOptions};
}

export default useFetch;