import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

// Custom Hook for AppWrite
const useAppWrite = (fn) => {
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(false)


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fn();
            setData(response)
        } catch (error) {
            console.log(error)
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }            
    }

    // Called once at the start
    useEffect(() => { 
        fetchData()
    }, [])

    
    // Called at refetch
    const refetch = () => fetchData();
    return {data, isLoading, refetch}
}
export default useAppWrite