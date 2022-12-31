import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [categroy, setCategroy] = useState([])
    const [categroyId, setCategroyId] = useState(null)
    const [subcategroyId, setSubCategroyId] = useState(null)
    const [subcategroy, setSubCategroy] = useState([])


    useEffect(() => {
        axios.get("http://localhost:4000/productlist").then((res) => {
            setProducts(res.data)
        }).catch((res => {
            console.log('error');
        }))
    }, [])


    useEffect(() => {
        axios.get("http://localhost:4000/category").then((res) => {
            setCategroy(res.data)
        }).catch(() => {
            console.log('error')
        })
    }, [])


    useEffect(() => {
        if (categroyId) {
            axios.get("http://localhost:4000/subcategory/" + categroyId).then((res) => {
                setSubCategroy(res.data)
                axios.get("http://localhost:4000/product/" + categroyId).then((res) => {
                    setProducts(res.data)
                })
            }).catch(() => {
                console.log('error')
            })
        }
    }, [categroyId])


    useEffect(() => {
        if (subcategroyId) {
            axios.get("http://localhost:4000/subproduct/" + subcategroyId).then((res) => {
                setProducts(res.data)

            }).catch(() => {
                console.log('error')
            })
        }
    }, [subcategroyId])



    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col'>
                <h1 className='text-3xl my-4 font-semibold mx-auto'>Electronics</h1>
                <h2 className='text-lg font-semibold text-blue-500'>cattegorys</h2>
                <div className='flex gap-4 py-3 m-3'>
                    {
                        categroy.map((item) => (
                            <div className='bg-gray-300 p-1 rounded text-sm font-semibold' onClick={e => setCategroyId(item._id)}>{item.category}</div>
                        ))
                    }
                </div>

                <h2 className='text-lg font-semibold text-blue-500 '>subcategorys</h2>
                <div className='flex gap-4 py-3 m-3'>
                    {
                        subcategroy?.map((item) => (
                            <div className='bg-gray-300 p-1 rounded text-sm font-semibold' onClick={e => setSubCategroyId(item._id)}>{item.subcategory}</div>
                        ))
                    }
                </div>
                <h3 className='text-lg font-semibold text-blue-500 '>products</h3>
                <div className='flex flex-col py-3'>
                    {
                        products.map((item) => (
                            <div className='bg-white shadow-xl border p-2 h-10 w-80 rounded text-base font-semibold'>{item.product}</div>
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList