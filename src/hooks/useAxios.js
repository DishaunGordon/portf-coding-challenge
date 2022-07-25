import { useState, useEffect } from 'react';
import axios from 'axios'


function UseAxios(receivedUrl) {
    // States
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const source = axios.CancelToken.source();
    let isAllDataCollected = false;
    const dataCollection = [];
    let pageNumber = 1;

    // Function Calls inside the useEffect
    const fetchData = async(url) => {
        try {
            const response = await axios.get(`${url}&page=${pageNumber}`, {
                cancelToken: source.token
            });
            const APIdata = await response.data;
            if (APIdata.length === 0) {
                isAllDataCollected = !isAllDataCollected;
            }
            dataCollection.push(...APIdata);
            setError(null);
        } catch (error) {
            setError(error);
        }
    }
    const fetchDataHandler = async() => {
        setIsLoading(true)
        while (isAllDataCollected === false) {
            await fetchData(receivedUrl)
            pageNumber++;
        } 
        setData(dataCollection);
        setIsLoading(false);
    }
    const breakDown = () => {
        source.cancel();
    }

    // useEffect
    useEffect(() => {
        // while (error == null && isAllDataCollected === false && pageNumber < 10) { //pageNumber included to safe guard against infinite loops while debugging
        //     fetchData(receivedUrl);
        //     pageNumber++;
        // }

        fetchDataHandler();
        return breakDown;
    }, [])   

    return {data, isLoading, error}
}
    
export default UseAxios;