import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SubCategory = () => {

    const [state, setState] = useState('')
    const [categroydata, setCategroy] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/category").then((res) => {
            console.log(res.data);
            setData(res.data)
        }).catch(() => {
            console.log('error')
        })
    }, [])



    const handleChange = e => {
        const { name, value } = e.target
        setState({ [name]: value })
    }

    const CategoryHandle = (e) => {
        setCategroy(e)
    }

    const Submit = (e) => {
        e.preventDefault()
        console.log(categroydata);
        if (state.subcategory && categroydata) {
            const subcategory = state.subcategory
            const Data = { subcategory, categroydata }
            axios.post("http://localhost:4000/subcategory", Data).then(() => {
                setState('')
            }).catch(() => console.log('error'))
        }
    }

    return (
        <div>
            {
                data &&
                <div className='flex flex-col'>
                    <h1 className='text-3xl my-4 font-semibold mx-auto'>SubCategory</h1>
                    <h1>Select category</h1>
                    <select  className='bg-slate-200 h-10 rounded my-3 outline-none' onChange={e => CategoryHandle(e.target.value)} >
                        <option selected>-selet-</option>
                        {
                            data.map((item, index) => (
                                <option key={index} value={item._id}>{item.category}</option>
                            ))
                        }

                    </select>
                    <h4>SubCategory</h4>
                    <input type="text" className='h-10 w-80 my-2 bg-slate-200 rounded-md' name='subcategory' onChange={handleChange} />
                    <button className='bg-sky-400 w-20 p-2 rounded my-3 mx-auto' onClick={Submit}>submit</button>
                </div>
            }

        </div>
    )
}

export default SubCategory