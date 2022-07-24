import { useState, useEffect } from 'react';
import axios from 'axios'


function UseAxios(receivedUrl) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAllDataCollected, setIsAllDataCollected] = useState(false);
    const [error, setError] = useState(null);

    const source = axios.CancelToken.source();
    const dataCollection = [];
    let pageNumber = 1;

    const fetchData = async(url) => {
        try {
            const response = await axios.get(`${url}&page=${pageNumber}`, {
                cancelToken: source.token
            });
            const APIdata = await response.data;
            if (APIdata.length === 0) {
                setIsAllDataCollected(true);
                // console.log("ENTERED")
            }
            // console.log(pageNumber);
            // console.log(APIdata.length);
            // console.log(isAllDataCollected);
            // console.log("API - " + APIdata);
            // console.log("collect before - " + dataCollection)
            dataCollection.push(...APIdata);
            // console.log("collect after - " + dataCollection)
            setError(null);
        } catch (error) {
            setError(error);
        } //finally {
        //     setIsLoading(false);
        // }
    }
    
    const fetchDataHandler = async() => {
        setIsLoading(true)
        let stopper = 0
        while (stopper < 8 && isAllDataCollected === false) {
            await fetchData(receivedUrl)
            pageNumber++;
            stopper++;
        } 
        console.log("stopper at - " + stopper);
        await setData(dataCollection);
        setIsLoading(false);
    }

    const breakDown = () => {
        source.cancel();
    }

    useEffect(() => {
        
        
        
        // while (error == null && isAllDataCollected === false && pageNumber < 10) { //pageNumber included to safe guard against infinite loops while debugging
        //     fetchData(receivedUrl);
        //     pageNumber++;
        // }

        fetchDataHandler();
        return breakDown;
    }, [])    
    console.log({data: data?.[0]?.id, isLoading, isAllDataCollected, error});
    return {data, isLoading, error}
}
    
export default UseAxios;

//TODO -- Update axios to use automatic pagination
//TODO -- Have started but will come back to it
//TODO -- See if we can trigger a reRender by using something in the dependencies.