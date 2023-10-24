
import { React, useEffect, useState, useRef } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { getCategories } from '../services'

const CreateAuthor = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    
    const bioElm = useRef();
    const nameElm = useRef();
    const emailElm = useRef();
    const profilePicElm = useRef();



    const { value: name } = nameElm.current;
    const { value: email } = emailElm.current;
    const { value: bio } = bioElm.current;
    const { value: profilePic } = profilePicElm.current;




    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

  return (
    <div>
        <h1 className='text-xl mb-8 font-semibold border-b pb-4'>
                Author Information
            </h1>
            <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
                <input
                    ref={nameElm}
                    className='bg-gray-200 p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
                    placeholder='name*'
                    name='name'
                />
                <input
                    ref={emailElm}
                    className='bg-gray-200 p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
                    placeholder='Email*'
                    name='email'
                />
            </div>

            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    ref={bioElm}
                    className='p-4 bg-gray-200 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
                    placeholder='Bio'
                    name='bio'
                />
            </div>

            <div className='grid grid-cols-1 gap-4 mb-4 '>

                <label className='block text-gray-700 text-sm font-bold'>Choose an Profile Picture :</label>
                <div className='relative  rounded-lg'>
                    <input
                        ref={profilePicElm}
                        type="file"
                        name="profilePic"
                        id="profilePic"
                        className='absolute opacity-0 top-0 left-0 w-1/2 h-full cursor-pointer'
                        onChange={handleImageChange} // Call the function when the file input changes
                    />
                    <label
                        htmlFor="profilePic"
                        className='block w-1/2 h-full p-4 text-center bg-gray-200 hover:bg-gray-500 cursor-pointer rounded-lg'
                    >
                        Select Image
                    </label>
                </div>
            </div>

            {/* Display the selected image */}
            {selectedImage && (
                <div>
                    <h2>Selected Picture:</h2>
                    <img src={selectedImage} alt="Selected" className="max-w-xs mt-2 pb-4 " />
                </div>
            )}
    </div>
  )
}

export default CreateAuthor