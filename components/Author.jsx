import React from 'react'

const Author = ({author}) => {
    if (!author) {
        // Handle the case when post is null or undefined
        return null;
    }
  
    return (
        <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-60'>
            
            <div className='flex justify-center absolute left-0 right-2 -top-14'>

            <img
             src={author.photo.url}
             alt={author.name}
             height="150px"
             width="150px"
             className='align-middle rounded-full'
            
             />
            </div>
             <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
             <p className='text-white text-lg'>{author.bio}</p>
        </div>
    )
}

export default Author