import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((cat) => setCategories(cat));
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className='container mx-auto px-10 mb-8'>
            <nav className='border-b w-full inline-block border-blue-800 py-8'>
                <div className='flex items-center justify-between '>
                    <div className='md:hidden'>
                        <button className='text-2xl text-white cursor-pointer' onClick={toggleMenu}>
                            {menuVisible ? <MdOutlineCancel /> : <AiOutlineMenu />}
                        </button>
                    </div>

                    <Link to='/'>
                        <span className='cursor-pointer font-bold text-4xl text-white'>Blog</span>
                    </Link>

                    <div className='hidden md:flex'>
                        {categories.map((category) => (
                            <Link to={`/category/${category.slug}`} key={category.slug} className='ml-4 text-white font-semibold'>
                                {category.name}
                            </Link>
                        ))}
                        <Link to='/article' className='ml-4'>
                            <span className='text-2xl text-white font-semibold cursor-pointer hover:text-[#b49494] transition duration-300'>
                                Create a post
                            </span>
                        </Link>
                    </div>
                </div>

                {menuVisible && (
                    <div className='md:hidden mt-4'>
                        {categories.map((category) => (
                            <Link to={`/category/${category.slug}`} key={category.slug} className='block text-white font-semibold'>
                                {category.name}
                            </Link>
                        ))}
                        <Link to='/article'>
                            <span className='block text-2xl text-white font-semibold cursor-pointer hover:text-[#b49494] transition duration-300'>
                                Create a post
                            </span>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
