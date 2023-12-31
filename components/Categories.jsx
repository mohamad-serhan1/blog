import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../services'

const Categories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
            .then((cat) => setCategories(cat))
    }, [])
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12 '>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Categories
            </h3>
            {categories.map((category)=>(
                <Link key={category.slug} to={`/category/${category.slug}`}>
                    <span className='cursor-pointer block pb-3 mb-3'>
                        {category.name}
                    </span>
                </Link>
            ))}

        </div>
    )
}

export default Categories