import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {

    const [categroy, setCategroy] = useState(null)
    const [subCategroyId, setSubCategroyId] = useState(null)
    const [data, setData] = useState([])
    const [state, setState] = useState([])
    const [subCategory, setSubCategory] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/category").then((res) => {
            setData(res.data)
        }).catch(() => {
            console.log('error')
        })
    }, [])

    const CategoryHandle = (e) => {
        setCategroy(e)
    }

    const SubCategoryHandle = (e) => {
        setSubCategroyId(e)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setState({ [name]: value })
    }

    useEffect(() => {
        if (categroy) {
            console.log(categroy);
            axios.get("http://localhost:4000/subcategory/" + categroy).then((res) => {
                setSubCategory(res.data)
            }).catch(() => {
                console.log('error')
            })
        }
    }, [categroy])


    const Submit = () => {

        if (state.product && categroy && subCategroyId) {
            const product = state.product
            const Data = { product, categroy, subCategroyId }
            axios.post("http://localhost:4000/addproduct", Data).then(() => {
                setState('')
            }).catch(() => console.log('error'))
        }
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col'>
                <h1 className='text-3xl my-4 font-semibold mx-auto'>Add Product</h1>
                <h3 className='text-base'>Select category</h3>

                <select className='bg-slate-200 h-10 w-80 rounded my-3 outline-none' onChange={e => CategoryHandle(e.target.value)} >
                    <option selected>-selet-</option>
                    {
                        data.map((item, index) => (
                            <option key={index} value={item._id}>{item.category}</option>
                        ))
                    }

                </select>

                <h3 className='text-base'>Select subcategory</h3>
                <div>
                    <select className='bg-slate-200 h-10 w-80 rounded my-3 outline-none'
                        onChange={e => SubCategoryHandle(e.target.value)}>
                        <option selected>-selet-</option>
                        {
                            subCategory?.map((item, index) => (
                                <option key={index} value={item._id}>{item.subcategory}</option>
                            ))
                        }
                    </select>

                </div>

                <div className='flex flex-col'>
                    <h1 className='text-base'>Product name</h1>
                    <input type="text" className='h-10 w-80 my-2 bg-slate-200 rounded-md outline-none' name='product' onChange={handleChange} />
                    <button className='bg-sky-400 w-20 p-2 rounded my-3 mx-auto' onClick={Submit}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default Products


