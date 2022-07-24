import { useState, useEffect } from 'react';
import axios from 'axios'


function UseAxios(receivedUrl) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAllDataCollected, setIsAllDataCollected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        let pageNumber = 1;
        
        const fetchData = async(url) => {
            setIsLoading(true)

            try {
                const response = await axios.get(`${url}&page=${pageNumber}`, {
                    cancelToken: source.token
                });
                const APIdata = await response.data;
                if (APIdata.length === 0) {
                    setIsAllDataCollected(true);
                    console.log("ENTERED")
                    setIsAllDataCollected(true);
                }
                console.log(pageNumber);
                console.log(APIdata);
                console.log(APIdata.length);
                console.log(isAllDataCollected);
                setData((prevData) => [...prevData, ...APIdata]);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }

            const breakDown = () => {
                source.cancel();
            }

            return breakDown;
        }
        // while (error == null && isAllDataCollected === false && pageNumber < 10) { //pageNumber included to safe guard against infinite loops while debugging
        //     fetchData(receivedUrl);
        //     pageNumber++;
        // }
        const fetchDataHandler = async() => {
            let stopper = 0
            while (stopper < 8 && isAllDataCollected === false) {
                await fetchData(receivedUrl)
                pageNumber++;
                stopper++;
            } 
            console.log("stopper at - " + stopper);
        }

        fetchDataHandler();
    }, [])    
    return {data, isLoading, error}
}
    
export default UseAxios;

//TODO -- Update axios to use automatic pagination
//TODO -- Have started but will come back to it
//TODO -- See if we can trigger a reRender by using something in the dependencies.