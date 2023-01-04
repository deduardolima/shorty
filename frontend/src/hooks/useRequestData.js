import { useEffect, useState } from "react";
import axios from "axios";


const useRequestData = (initialData, url) => {
    const [data, setData] = useState(initialData)
    const getData = () => {
        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((res) => {
                setData(res.data)

            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getData()
    })

    return [data, getData]
}

export default useRequestData;
