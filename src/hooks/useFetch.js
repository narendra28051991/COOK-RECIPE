import { useEffect, useState } from "react";

export const useFetch = (url, method = 'GET') => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [options, setOptions] = useState(null)

    const postData = (postData) => setOptions({
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })

    useEffect(() => {
        const abortController = new AbortController()
        setIsPending(true);
        const fetchData = async(fetchOptions) => {
            try {
                const response = await fetch(url, { ...fetchOptions, signal: abortController.signal })
                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                const data = await response.json()
                setData(data)
                setIsPending(false)
                setError(null)
            }
            catch(err) {
                if(err.name === 'AbortError') {
                    setError('The fetch was aborted')
                } else {
                    setIsPending(false)
                    setError('Could not fetch the data for the resource')
                }
            }
        }
        if (method === 'GET') {
            fetchData()
        }
        if (method === 'POST' && options) {
            fetchData(options)
        }

        return () => {
            abortController.abort()
        }

    }, [url, options, method])

    return { data, isPending, error, postData }
}