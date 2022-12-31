import { useState } from 'react'
import axios from 'axios'
import SubCategory from '../Components/SubCategory'

const Category = () => {

    const [state, setState] = useState('')


    const handleChange = e => {
        const { name, value } = e.target
        setState({ [name]: value })
    }

    const Submit = (e) => {
        if (state.category) {
            axios.post("http://localhost:4000/", state).then(() => {
                setState('')
            }).catch(() => console.log('error'))
        }
    }


    return (
        <div className='flex justify-evenly items-center h-screen'>
            <div className='flex flex-col'>
            <h1 className='text-3xl my-4 font-semibold mx-auto'>Category</h1>
            <h1>Enter categoryname</h1>
            <input type="text" className='h-10 w-80 my-2 bg-slate-200 rounded-md'
            value={state.category} name='category' onChange={handleChange} />
            <button className='bg-sky-400 w-20 p-2 rounded my-3 mx-auto' onClick={Submit}>submit</button>
            </div>
            <SubCategory />
            
        </div>
    )
}

export default Category